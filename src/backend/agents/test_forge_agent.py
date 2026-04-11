import unittest
from unittest.mock import patch, MagicMock

# We assume this script runs using python -m pytest or similar, where PYTHONPATH handles the src.
from src.backend.agents.forge_agent import bash

class TestForgeAgent(unittest.TestCase):
    @patch('src.backend.agents.forge_agent.subprocess.run')
    def test_bash_success(self, mock_run):
        # Setup mock
        mock_process = MagicMock()
        mock_process.stdout = "hello\n"
        mock_process.stderr = ""
        mock_run.return_value = mock_process

        # Execute
        result = bash.invoke({"command": "echo hello"})

        # Assert
        mock_run.assert_called_once_with(
            "echo hello",
            shell=True,
            capture_output=True,
            text=True,
            timeout=30
        )
        self.assertEqual(result, "hello")

    @patch('src.backend.agents.forge_agent.subprocess.run')
    def test_bash_with_stderr(self, mock_run):
        # Setup mock
        mock_process = MagicMock()
        mock_process.stdout = "output\n"
        mock_process.stderr = "error\n"
        mock_run.return_value = mock_process

        # Execute
        result = bash.invoke({"command": "some_command"})

        # Assert
        self.assertEqual(result, "output\nerror")

if __name__ == '__main__':
    unittest.main()
