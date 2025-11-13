// netlify/functions/reddits.js
export async function handler(event) {
  try {
    const qs = event.queryStringParameters || {};
    const path = (qs.path || "r/webdev/hot.json").replace(/^\//, "");

    // rebuild query string from the remaining params (e.g., raw_json=1, q=...)
    const { path: _omit, ...rest } = qs;
    const query = new URLSearchParams(rest).toString();
    const url = `https://www.reddit.com/${path}${query ? `?${query}` : ""}`;

    const resp = await fetch(url, {
      headers: {
        "User-Agent": "web:reddit-client-demo:1.0 (by /u/example)",
        "Accept": "application/json"
      }
    });

    // 👇 explicit rate-limit handling
    if (resp.status === 429) {
      return {
        statusCode: 429,
        body: JSON.stringify({
          error: "Rate limited by Reddit (10 req/min). Please wait a moment.",
          url
        })
      };
    }

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({
          error: `Reddit responded ${resp.status}`,
          url
        })
      };
    }

    const json = await resp.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}

