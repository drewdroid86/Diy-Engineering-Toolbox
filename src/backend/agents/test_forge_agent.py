import pytest
from unittest.mock import patch
import urllib.error

from src.backend.agents.forge_agent import fetch_url

def test_fetch_url_success():
    with patch('urllib.request.urlopen') as mock_urlopen:
        mock_response = mock_urlopen.return_value.__enter__.return_value
        mock_response.read.return_value = b"<html><body>Hello World</body></html>"

        result = fetch_url.invoke({'url': 'https://example.com'})
        assert result == "Hello World"

def test_fetch_url_urlerror():
    with patch('urllib.request.urlopen') as mock_urlopen:
        mock_urlopen.side_effect = urllib.error.URLError('mock url error')

        result = fetch_url.invoke({'url': 'https://error.com'})
        assert 'Error fetching https://error.com' in result
        assert 'mock url error' in result

def test_fetch_url_timeout():
    with patch('urllib.request.urlopen') as mock_urlopen:
        mock_urlopen.side_effect = TimeoutError('mock timeout error')

        result = fetch_url.invoke({'url': 'https://timeout.com'})
        assert 'Error fetching https://timeout.com' in result
        assert 'mock timeout error' in result
