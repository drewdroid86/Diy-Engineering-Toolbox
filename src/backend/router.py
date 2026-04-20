import os, json, urllib.request
from typing import Literal

LOCAL_URL = "http://127.0.0.1:8080/v1/chat/completions"
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
GEMINI_KEY = os.environ.get('GEMINI_API_KEY', '')

def call_local(messages, max_tokens=512):
    payload = json.dumps({"model":"crucible","messages":messages,"max_tokens":max_tokens}).encode()
    req = urllib.request.Request(LOCAL_URL, data=payload, headers={"Content-Type":"application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())["choices"][0]["message"]["content"]

def call_gemini(messages, max_tokens=512):
    if not GEMINI_KEY: raise ValueError("GEMINI_API_KEY not set")
    contents = [{"role":"user" if m["role"]=="user" else "model","parts":[{"text":m["content"]}]} for m in messages]
    payload = json.dumps({"contents":contents,"generationConfig":{"maxOutputTokens":max_tokens}}).encode()
    req = urllib.request.Request(f"{GEMINI_URL}?key={GEMINI_KEY}", data=payload, headers={"Content-Type":"application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())["candidates"][0]["content"]["parts"][0]["text"]

def route(messages, brain="auto", max_tokens=512):
    if brain == "local":
        try: return {"reply":call_local(messages,max_tokens),"brain":"local","ok":True}
        except Exception as e: return {"reply":"","brain":"local","ok":False,"error":str(e)}
    if brain == "gemini":
        try: return {"reply":call_gemini(messages,max_tokens),"brain":"gemini","ok":True}
        except Exception as e: return {"reply":"","brain":"gemini","ok":False,"error":str(e)}
    try: return {"reply":call_gemini(messages,max_tokens),"brain":"gemini","ok":True}
    except:
        try: return {"reply":call_local(messages,max_tokens),"brain":"local","ok":True,"fallback":True}
        except Exception as e: return {"reply":"","brain":"none","ok":False,"error":str(e)}

if __name__ == "__main__":
    import sys
    brain = sys.argv[1] if len(sys.argv) > 1 else "auto"
    messages = [{"role":"user","content":"Say hello and what you are in one sentence."}]
    result = route(messages, brain=brain)
    print(f"[{result['brain']}] {result['reply']}")
    if not result["ok"]: print(f"Error: {result.get('error')}")
