import os
from langchain_google_genai import ChatGoogleGenerativeAI
from google import genai
from google.genai import types

def check_imports():
    print("Successfully imported langchain_google_genai and google.genai")
    try:
        client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        print("Successfully created genai client")
    except Exception as e:
        print(f"Failed to create client: {e}")

if __name__ == "__main__":
    check_imports()
