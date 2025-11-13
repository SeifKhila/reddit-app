// netlify/functions/reddits.js
export async function handler(event) {
  try {
    const qs = event.queryStringParameters || {};
    const path = (qs.path || "r/webdev/hot.json").replace(/^\//, "");
    const url = `https://www.reddit.com/${path}`;

    // Use explicit HTTPS fetch with headers
    const resp = await fetch(url, {
      headers: { "User-Agent": "NetlifyRedditClient/1.0" },
    });

    // If Reddit blocks or errors
    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: `Reddit responded ${resp.status}` }),
      };
    }

    const json = await resp.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
