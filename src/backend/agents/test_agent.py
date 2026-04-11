from langgraph.graph import StateGraph, END
from typing import TypedDict

class State(TypedDict):
    message: str
    response: str

def process(state: State) -> State:
    return {"response": f"Crucible received: {state['message']}"}

graph = StateGraph(State)
graph.add_node("process", process)
graph.set_entry_point("process")
graph.add_edge("process", END)
app = graph.compile()

result = app.invoke({"message": "hello from Crucible"})
print(result["response"])
