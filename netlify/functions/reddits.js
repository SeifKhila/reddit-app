// netlify/functions/reddits.js
export async function handler(event) {
  try {
    const qs = event.queryStringParameters || {};
    const path = (qs.path || "r/webdev/hot.json").replace(/^\//, "");

    // forward any extra query params (e.g., raw_json=1)
    const { path: _omit, ...rest } = qs;
    const query = new URLSearchParams(rest).toString();
    const url = `https://www.reddit.com/${path}${query ? `?${query}` : ""}`;

    const resp = await fetch(url, {
      headers: { "User-Agent": "web:reddit-client:1.0 (by /u/example)" }
    });

    if (!resp.ok) {
      return { statusCode: resp.status, body: JSON.stringify({ error: `Reddit responded ${resp.status}`, url }) };
    }

    const json = await resp.json();
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
