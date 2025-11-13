// netlify/functions/reddits.js
export async function handler(event) {
  try {
    const qs = event.queryStringParameters || {};
    const path = (qs.path || "r/webdev/hot.json").replace(/^\//, "");
    const url = `https://www.reddit.com/${path}`;

    const resp = await fetch(url);
    const json = await resp.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify(json),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}