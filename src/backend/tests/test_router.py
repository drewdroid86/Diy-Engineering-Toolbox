import pytest
import json
import urllib.error
from unittest.mock import patch, MagicMock
from src.backend.router import call_local

def test_call_local_success():
    messages = [{"role": "user", "content": "hello"}]
    expected_response = {
        "choices": [
            {"message": {"content": "world"}}
        ]
    }

    mock_response = MagicMock()
    mock_response.read.return_value = json.dumps(expected_response).encode('utf-8')
    mock_response.__enter__.return_value = mock_response

    with patch('urllib.request.urlopen', return_value=mock_response) as mock_urlopen:
        result = call_local(messages)

        assert result == "world"
        mock_urlopen.assert_called_once()

        # Verify request parameters
        req_obj = mock_urlopen.call_args[0][0]
        assert req_obj.full_url == "http://127.0.0.1:8080/v1/chat/completions"
        assert req_obj.headers["Content-type"] == "application/json"

        # Verify payload
        payload = json.loads(req_obj.data.decode('utf-8'))
        assert payload["model"] == "crucible"
        assert payload["messages"] == messages
        assert payload["max_tokens"] == 512

def test_call_local_timeout():
    messages = [{"role": "user", "content": "hello"}]

    with patch('urllib.request.urlopen', side_effect=urllib.error.URLError("timeout")):
        with pytest.raises(urllib.error.URLError) as exc_info:
            call_local(messages)
        assert "timeout" in str(exc_info.value)
