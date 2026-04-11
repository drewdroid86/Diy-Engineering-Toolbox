import os, sys, subprocess, operator, urllib.request, urllib.parse
sys.path.insert(0, os.path.expanduser("~/crucible"))

from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, SystemMessage
from typing import TypedDict, Annotated

SYSTEM = """You are Forge, the Crucible AI agent running on a Pixel 9 Pro (aarch64 Ubuntu proot).

Environment:
- Project: ~/crucible
- Models: /storage/emulated/0/models  
- Venv: ~/crucible-env
- Local API: http://127.0.0.1:8080
- Tools: bash, read_file, write_file, fetch_url, web_search

For Gemini API questions, fetch live docs from https://ai.google.dev/gemini-api/docs
Always use bash for filesystem tasks. Be concise and precise."""

@tool
def bash(command: str) -> str:
    """Run a bash command and return output."""
    result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=30)
    return (result.stdout + result.stderr).strip()

@tool
def read_file(path: str) -> str:
    """Read a file and return its contents."""
    try:
        with open(os.path.expanduser(path)) as f:
            return f.read()
    except Exception as e:
        return f"Error: {e}"

@tool
def write_file(path: str, content: str) -> str:
    """Write content to a file."""
    try:
        with open(os.path.expanduser(path), "w") as f:
            f.write(content)
        return f"Written to {path}"
    except Exception as e:
        return f"Error: {e}"

@tool
def fetch_url(url: str) -> str:
    """Fetch the content of a URL. Use for Gemini API docs or any web page."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            content = r.read().decode("utf-8", errors="ignore")
            # Strip HTML tags roughly
            import re
            content = re.sub(r'<[^>]+>', ' ', content)
            content = re.sub(r'\s+', ' ', content).strip()
            return content[:4000]
    except Exception as e:
        return f"Error fetching {url}: {e}"

@tool
def web_search(query: str) -> str:
    """Search the web using DuckDuckGo and return results."""
    try:
        q = urllib.parse.quote(query)
        url = f"https://api.duckduckgo.com/?q={q}&format=json&no_html=1&skip_disambig=1"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            import json
            data = json.loads(r.read())
            results = []
            if data.get("AbstractText"):
                results.append(data["AbstractText"])
            for item in data.get("RelatedTopics", [])[:3]:
                if isinstance(item, dict) and item.get("Text"):
                    results.append(item["Text"])
            return "\n".join(results) if results else "No results found."
    except Exception as e:
        return f"Search error: {e}"

TOOLS = [bash, read_file, write_file, fetch_url, web_search]

MODELS = {
    "flash":  "gemini-2.5-flash",
    "pro":    "gemini-2.5-pro",
    "flash3": "gemini-3.1-flash-lite-preview",
    "pro3":   "gemini-3.1-pro-preview",
}

class State(TypedDict):
    messages: Annotated[list, operator.add]

def make_agent(model_key="flash"):
    model = MODELS.get(model_key, MODELS["flash"])
    llm = ChatGoogleGenerativeAI(
        model=model,
        google_api_key=os.environ["GEMINI_API_KEY"]
    ).bind_tools(TOOLS)

    def agent_node(state: State):
        return {"messages": [llm.invoke(state["messages"])]}

    def should_continue(state: State):
        last = state["messages"][-1]
        return "tools" if getattr(last, "tool_calls", None) else END

    graph = StateGraph(State)
    graph.add_node("agent", agent_node)
    graph.add_node("tools", ToolNode(TOOLS))
    graph.set_entry_point("agent")
    graph.add_conditional_edges("agent", should_continue)
    graph.add_edge("tools", "agent")
    return graph.compile(), model

if __name__ == "__main__":
    R='\033[0;31m'; G='\033[0;32m'; Y='\033[1;33m'
    O='\033[0;33m'; C='\033[0;36m'; D='\033[2;37m'; NC='\033[0m'

    model_key = sys.argv[1] if len(sys.argv) > 1 else "flash"
    app, model_name = make_agent(model_key)

    print(f"{O}⚒  Forge Agent {D}[{model_name}]{NC}")
    print(f"{D}  tools: bash, read_file, write_file, fetch_url, web_search{NC}")
    print(f"{D}  models: flash, pro, flash3, pro3{NC}")
    print(f"{D}────────────────────────────────────────{NC}")

    history = [SystemMessage(content=SYSTEM)]

    while True:
        try: user = input(f"{Y}you > {NC}").strip()
        except (EOFError, KeyboardInterrupt):
            print(f"\n{D}Session ended.{NC}"); break
        if user.lower() == "exit": break
        if not user: continue
        history.append(HumanMessage(content=user))
        result = app.invoke({"messages": history})
        last = result["messages"][-1]
        msg = last.content
        reply = msg if isinstance(msg, str) else " ".join(p.get("text","") for p in msg if isinstance(p, dict))
        history.append(last)
        print(f"{G}forge > {NC}{reply}\n")
