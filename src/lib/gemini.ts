export async function callGemini(messages: { role: string; content: string }[]) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Anthropic API key not found in environment variables (VITE_ANTHROPIC_API_KEY)');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'dangerously-allow-browser': 'true', // Anthropic API usually doesn't allow direct browser calls due to CORS, but we can try if there's a proxy or the user has one set up.
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      messages: messages.map(m => ({
        role: m.role === 'model' ? 'assistant' : m.role,
        content: m.content
      })),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}
