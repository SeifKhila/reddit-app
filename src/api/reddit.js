// src/api/reddit.js

// src/api/reddit.js
const safeThumb = (t) => (t && t.startsWith('http') ? t : '');

const shape = (child) => {
  const d = child?.data || {};
  return {
    id: d.id,
    title: d.title,
    author: d.author,
    score: d.score,
    num_comments: d.num_comments,
    thumbnail: safeThumb(d.thumbnail),
    permalink: d.permalink,          //  add this
    created_utc: d.created_utc ?? 0, // (optional, for "3h ago")
  };
};

// CRA dev server proxies these relative paths to https://www.reddit.com
async function getJson(path) {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`status ${res.status}`);
  return res.json();
}

export async function getSubredditPosts(name) {
  const json = await getJson(`/r/${encodeURIComponent(name)}.json?raw_json=1`);
  return json?.data?.children?.map(shape) ?? [];
}

export async function searchInSubreddit(name, term) {
  const q = `${term} subreddit:${name}`;
  const json = await getJson(`/search.json?q=${encodeURIComponent(q)}&raw_json=1`);
  return json?.data?.children?.map(shape) ?? [];
}

export async function getPostComments(permalink) {
  // permalink looks like: /r/webdev/comments/abc123/some_slug/
  const json = await getJson(`${permalink}.json?raw_json=1`);

const comments = (json?.[1]?.data?.children ?? [])
  .map(({ data: c }) => ({
    id: c.id,
    author: c.author,
    body: c.body,
    score: c.score,
    created_utc: c.created_utc ?? 0,
  }))
  .filter(c => !!c.body);


  return comments;
}




