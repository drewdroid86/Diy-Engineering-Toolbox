import os
import json
import httpx
from typing import List, Dict, Any, Optional

LOCAL_URL = "http://127.0.0.1:8080/v1/chat/completions"
GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"
GEMINI_MODEL = "gemini-2.5-flash"

class ModelRouter:
    def __init__(self):
        self.gemini_key = os.environ.get('GEMINI_API_KEY', '')
        self.client = httpx.Client(timeout=120.0)

    def call_local(self, messages: List[Dict[str, str]], max_tokens: int = 512) -> str:
        payload = {
            "model": "crucible",
            "messages": messages,
            "max_tokens": max_tokens
        }
        response = self.client.post(LOCAL_URL, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

    def call_gemini(self, messages: List[Dict[str, str]], max_tokens: int = 512) -> str:
        if not self.gemini_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        
        contents = [
            {
                "role": "user" if m["role"] == "user" else "model",
                "parts": [{"text": m["content"]}]
            } for m in messages
        ]
        
        payload = {
            "contents": contents,
            "generationConfig": {
                "maxOutputTokens": max_tokens
            }
        }
        
        url = f"{GEMINI_BASE_URL}/{GEMINI_MODEL}:generateContent?key={self.gemini_key}"
        response = self.client.post(url, json=payload)
        response.raise_for_status()
        
        return response.json()["candidates"][0]["content"]["parts"][0]["text"]

    def route(self, messages: List[Dict[str, str]], brain: str = "auto", max_tokens: int = 512) -> Dict[str, Any]:
        if brain == "local":
            try:
                return {"reply": self.call_local(messages, max_tokens), "brain": "local", "ok": True}
            except Exception as e:
                return {"reply": "", "brain": "local", "ok": False, "error": str(e)}
        
        if brain == "gemini":
            try:
                return {"reply": self.call_gemini(messages, max_tokens), "brain": "gemini", "ok": True}
            except Exception as e:
                return {"reply": "", "brain": "gemini", "ok": False, "error": str(e)}
        
        # Auto routing: Try Gemini first, fallback to local
        try:
            return {"reply": self.call_gemini(messages, max_tokens), "brain": "gemini", "ok": True}
        except Exception as gemini_err:
            try:
                return {
                    "reply": self.call_local(messages, max_tokens),
                    "brain": "local",
                    "ok": True,
                    "fallback": True,
                    "gemini_error": str(gemini_err)
                }
            except Exception as local_err:
                return {
                    "reply": "",
                    "brain": "none",
                    "ok": False,
                    "error": f"Gemini error: {gemini_err}. Local error: {local_err}"
                }

def main():
    import sys
    router = ModelRouter()
    brain = sys.argv[1] if len(sys.argv) > 1 else "auto"
    messages = [{"role": "user", "content": "Say hello and what you are in one sentence."}]
    
    result = router.route(messages, brain=brain)
    
    status = "OK" if result["ok"] else "ERROR"
    fallback = " (FALLBACK)" if result.get("fallback") else ""
    
    print(f"[{result['brain'].upper()}][{status}]{fallback} {result['reply']}")
    if not result["ok"]:
        print(f"Error: {result.get('error')}")

if __name__ == "__main__":
    main()
