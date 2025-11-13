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
    permalink: d.permalink,
    created_utc: d.created_utc ?? 0,
  };
};

async function fetchJson(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`status ${res.status}`);
  return res.json();
}

export async function getSubredditPosts(name) {
  const url = `https://www.reddit.com/r/${encodeURIComponent(name)}/hot.json?raw_json=1`;
  const json = await fetchJson(url);
  return json?.data?.children?.map(shape) ?? [];
}

export async function searchInSubreddit(name, term) {
  const url =
    `https://www.reddit.com/r/${encodeURIComponent(name)}/search.json` +
    `?q=${encodeURIComponent(term)}&restrict_sr=1&sort=relevance&raw_json=1`;
  const json = await fetchJson(url);
  return json?.data?.children?.map(shape) ?? [];
}

export async function getPostComments(permalink) {
  const url = `https://www.reddit.com${permalink}.json?raw_json=1`;
  const json = await fetchJson(url);
  const comments = (json?.[1]?.data?.children ?? [])
    .map(({ data: c }) => ({
      id: c.id,
      author: c.author,
      body: c.body,
      score: c.score,
      created_utc: c.created_utc ?? 0,
    }))
    .filter((c) => !!c.body);
  return comments;
}





