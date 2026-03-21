export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey =
    process.env.QUIZAPI_KEY
    || process.env.REACT_APP_QUIZAPI_KEY
    || process.env.VITE_QUIZAPI_KEY
    || process.env.NEXT_PUBLIC_QUIZAPI_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'QuizAPI key is not configured' });
  }

  const limit = req.query.limit || '20';
  const category = req.query.category || 'Code,Linux,DevOps,Docker,BASH,SQL';

  const params = new URLSearchParams({
    limit: String(limit),
    category: String(category),
  });

  try {
    const response = await fetch(`https://quizapi.io/api/v1/questions?${params.toString()}`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'QuizAPI request failed' });
    }

    const payload = await response.json();
    return res.status(200).json(payload);
  } catch {
    return res.status(500).json({ error: 'QuizAPI proxy failed' });
  }
}
