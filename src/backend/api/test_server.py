import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient

# Adjust path so server.py can import router.py
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.server import app

client = TestClient(app)

@patch('subprocess.run')
def test_shell_endpoint(mock_run):
    mock_result = MagicMock()
    mock_result.stdout = "Hello "
    mock_result.stderr = "World"
    mock_run.return_value = mock_result

    response = client.post("/shell", json={"command": "echo Hello && echo World >&2"})

    assert response.status_code == 200
    assert response.json() == {"output": "Hello World"}
    mock_run.assert_called_once()
    args, kwargs = mock_run.call_args
    assert args[0] == "echo Hello && echo World >&2"
    assert kwargs.get("shell") is True
    assert kwargs.get("capture_output") is True
    assert kwargs.get("text") is True
