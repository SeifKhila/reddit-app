// netlify/functions/reddit.js
export async function handler(event) {
  try {
    const url = event.queryStringParameters?.url || '';
    if (!url || !url.startsWith('/')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid ?url=/path' })
      };
    }

    const upstream = `https://www.reddit.com${url}`;
    const res = await fetch(upstream, { headers: { 'User-Agent': 'netlify-proxy/1.0' } });

    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json' },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Proxy failed', message: String(err) })
    };
  }
}
