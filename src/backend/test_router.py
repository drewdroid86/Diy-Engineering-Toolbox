from unittest.mock import patch
from src.backend.router import route

@patch("src.backend.router.call_local")
def test_route_local_success(mock_call_local):
    mock_call_local.return_value = "local response"
    result = route("hello", brain="local")
    assert result == {"reply": "local response", "brain": "local", "ok": True}
    mock_call_local.assert_called_once_with("hello", 512)

@patch("src.backend.router.call_local")
def test_route_local_failure(mock_call_local):
    mock_call_local.side_effect = Exception("local error")
    result = route("hello", brain="local")
    assert result == {"reply": "", "brain": "local", "ok": False, "error": "local error"}
    mock_call_local.assert_called_once_with("hello", 512)

@patch("src.backend.router.call_gemini")
def test_route_gemini_success(mock_call_gemini):
    mock_call_gemini.return_value = "gemini response"
    result = route("hello", brain="gemini")
    assert result == {"reply": "gemini response", "brain": "gemini", "ok": True}
    mock_call_gemini.assert_called_once_with("hello", 512)

@patch("src.backend.router.call_gemini")
def test_route_gemini_failure(mock_call_gemini):
    mock_call_gemini.side_effect = Exception("gemini error")
    result = route("hello", brain="gemini")
    assert result == {"reply": "", "brain": "gemini", "ok": False, "error": "gemini error"}
    mock_call_gemini.assert_called_once_with("hello", 512)

@patch("src.backend.router.call_gemini")
def test_route_auto_gemini_success(mock_call_gemini):
    mock_call_gemini.return_value = "gemini response"
    result = route("hello", brain="auto")
    assert result == {"reply": "gemini response", "brain": "gemini", "ok": True}
    mock_call_gemini.assert_called_once_with("hello", 512)

@patch("src.backend.router.call_local")
@patch("src.backend.router.call_gemini")
def test_route_auto_fallback_local_success(mock_call_gemini, mock_call_local):
    mock_call_gemini.side_effect = Exception("gemini error")
    mock_call_local.return_value = "local response"
    result = route("hello", brain="auto")
    assert result == {"reply": "local response", "brain": "local", "ok": True, "fallback": True}
    mock_call_gemini.assert_called_once_with("hello", 512)
    mock_call_local.assert_called_once_with("hello", 512)

@patch("src.backend.router.call_local")
@patch("src.backend.router.call_gemini")
def test_route_auto_fallback_failure(mock_call_gemini, mock_call_local):
    mock_call_gemini.side_effect = Exception("gemini error")
    mock_call_local.side_effect = Exception("local error")
    result = route("hello", brain="auto")
    assert result == {"reply": "", "brain": "none", "ok": False, "error": "local error"}
    mock_call_gemini.assert_called_once_with("hello", 512)
    mock_call_local.assert_called_once_with("hello", 512)
