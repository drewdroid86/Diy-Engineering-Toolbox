import json
import pytest
from unittest import mock
import urllib.request
from src.backend import router

def test_call_gemini_missing_key():
    with mock.patch('src.backend.router.GEMINI_KEY', ''):
        with pytest.raises(ValueError, match="GEMINI_API_KEY not set"):
            router.call_gemini([{"role": "user", "content": "Hello"}])

@mock.patch('src.backend.router.urllib.request.urlopen')
def test_call_gemini_success(mock_urlopen):
    # Setup mock response
    mock_response = mock.MagicMock()
    mock_response.read.return_value = json.dumps({
        "candidates": [
            {
                "content": {
                    "parts": [{"text": "Hello, how can I help?"}]
                }
            }
        ]
    }).encode('utf-8')
    # When used as a context manager (with urlopen(...) as r:)
    mock_response.__enter__.return_value = mock_response
    mock_urlopen.return_value = mock_response

    messages = [{"role": "user", "content": "Hello"}]

    with mock.patch('src.backend.router.GEMINI_KEY', 'fake_key'):
        result = router.call_gemini(messages)

    assert result == "Hello, how can I help?"

    # Verify the mock was called correctly
    mock_urlopen.assert_called_once()
    req = mock_urlopen.call_args[0][0]

    # req is a urllib.request.Request object
    assert req.full_url == f"{router.GEMINI_URL}?key=fake_key"
    assert req.headers.get('Content-type') == 'application/json'

    # Check payload
    payload = json.loads(req.data.decode('utf-8'))
    assert payload["contents"] == [{"role": "user", "parts": [{"text": "Hello"}]}]
    assert payload["generationConfig"]["maxOutputTokens"] == 512

@mock.patch('src.backend.router.urllib.request.urlopen')
def test_call_gemini_custom_max_tokens(mock_urlopen):
    # Setup mock response
    mock_response = mock.MagicMock()
    mock_response.read.return_value = json.dumps({
        "candidates": [
            {
                "content": {
                    "parts": [{"text": "Hello, how can I help?"}]
                }
            }
        ]
    }).encode('utf-8')
    mock_response.__enter__.return_value = mock_response
    mock_urlopen.return_value = mock_response

    messages = [{"role": "user", "content": "Hello"}]

    with mock.patch('src.backend.router.GEMINI_KEY', 'fake_key'):
        router.call_gemini(messages, max_tokens=1024)

    req = mock_urlopen.call_args[0][0]
    payload = json.loads(req.data.decode('utf-8'))
    assert payload["generationConfig"]["maxOutputTokens"] == 1024
