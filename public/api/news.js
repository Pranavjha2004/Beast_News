// /api/news.js

export default async function handler(req, res) {
  const { query } = req; // Accept query params like ?country=in

  const url = new URL('https://newsapi.org/v2/top-headlines');
  url.search = new URLSearchParams({
    ...query,
    apiKey: process.env.NEWS_API_KEY, // Use your Vercel env var here
  });

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
}
