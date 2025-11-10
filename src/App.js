import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import SubredditSelector from './components/SubredditSelector/SubredditSelector';
import PostList from './components/PostList/PostList';
import { getSubredditPosts, searchInSubreddit } from './api/reddit';
import LoadingSkeleton from './components/LoadingSkeleton/LoadingSkeleton';

// keep this outside so it doesn't get recreated on each render
const SUBREDDITS = ['popular', 'javascript', 'reactjs', 'webdev'];

function App() {
  // quick in-memory cache so we don’t hit the api again for the same thing
  const cacheRef = useRef({});
  // last fetch timestamp (ref so the effect doesn’t re-run when it changes)
  const lastFetchAtRef = useRef(0);

  // local state (redux later)
  const [searchTerm, setSearchTerm] = useState('');
  const [subreddit, setSubreddit] = useState('webdev');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const key = `${subreddit}|${searchTerm || '__feed'}`;

      // if we already fetched this, just use cache
      if (cacheRef.current[key]) {
        setPosts(cacheRef.current[key]);
        return;
      }

      try {
        setLoading(true);
        setError('');

        // simple spacing between calls (reddit limit ~10/min)
        const now = Date.now();
        const since = now - lastFetchAtRef.current;
        if (since < 1200) {
          await new Promise((r) => setTimeout(r, 1200 - since));
        }

        // search vs normal feed
        const data = searchTerm
          ? await searchInSubreddit(subreddit, searchTerm)
          : await getSubredditPosts(subreddit);

        if (cancelled) return;

        // stash to cache and show
        cacheRef.current[key] = data;
        setPosts(data);
        lastFetchAtRef.current = Date.now();
      } catch (e) {
        if (cancelled) return;

        // friendly error message
        const msg = /429/.test(String(e))
          ? 'rate limit hit — try again in a few seconds'
          : 'could not load posts (network or API issue)';
        setError(msg);

        // if we’ve got a non-search cache for this subreddit, show that
        const fallbackKey = `${subreddit}|__feed`;
        if (cacheRef.current[fallbackKey]) {
          setPosts(cacheRef.current[fallbackKey]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [subreddit, searchTerm]);

  const handleSearch = (term) => setSearchTerm(term.trim());
  const handleSubChange = (name) => setSubreddit(name);

  return (
    <div>
      <Header />

      <main style={{ minHeight: '70vh', padding: '1rem' }}>
        <h2>Welcome to Reddit Client</h2>
        <p>building this bit by bit (components first, data later)</p>

        {/* search box */}
        <SearchBar onSearch={handleSearch} />

        {/* subreddit dropdown */}
        <SubredditSelector
          value={subreddit}
          options={SUBREDDITS}
          onChange={handleSubChange}
        />

        {/* quick status line */}
        <p style={{ marginTop: '0.5rem' }}>
          viewing: <strong>r/{subreddit}</strong>
          {searchTerm ? (
            <>
              {' '}
              • search: <strong>{searchTerm}</strong>
            </>
          ) : null}
        </p>

        {/* loading / error / list */}
        {loading && <LoadingSkeleton />}
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        {!loading && !error && <PostList posts={posts} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;

