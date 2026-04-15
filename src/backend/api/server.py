import os, sys, subprocess
sys.path.insert(0, os.path.expanduser("~/crucible"))

from fastapi import FastAPI
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from router import route
import json
import shlex

app = FastAPI(title="Crucible API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ChatRequest(BaseModel):
    message: str
    brain: str = "auto"
    history: list = []

class ShellRequest(BaseModel):
    command: str

@app.get("/")
def root():
    return HTMLResponse(open(os.path.expanduser("~/crucible/web/index.html")).read())

@app.get("/status")
def status():
    import urllib.request
    local_ok = False
    try:
        urllib.request.urlopen("http://127.0.0.1:8080/health", timeout=2)
        local_ok = True
    except: pass
    models = []
    try:
        import subprocess
        cmd = ["find", "/storage/emulated/0/models", "-name", "*.gguf"]
        out = subprocess.check_output(cmd, stderr=subprocess.DEVNULL).decode()
        models = [os.path.basename(l) for l in out.strip().split('\n') if l]
    except: pass
    return {"local_server": local_ok, "models": models, "venv": True}

@app.post("/chat")
def chat(req: ChatRequest):
    history = req.history + [{"role": "user", "content": req.message}]
    result = route(history, brain=req.brain)
    return {"reply": result["reply"], "brain": result["brain"], "ok": result["ok"]}

@app.post("/shell")
def shell(req: ShellRequest):
    args = shlex.split(req.command)
    result = subprocess.run(args, shell=False, capture_output=True, text=True, timeout=30)
    return {"output": result.stdout + result.stderr}

