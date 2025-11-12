import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import SubredditSelector from './components/SubredditSelector/SubredditSelector';
import PostList from './components/PostList/PostList';
import LoadingSkeleton from './components/LoadingSkeleton/LoadingSkeleton';

import { fetchPostsBySubreddit, searchPostsInSubreddit } from './features/posts/postsSlice';

function App() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const selected = useSelector((s) => s.subreddits.selected);
  const { isLoading: loading, error } = useSelector((s) => s.posts);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchPostsInSubreddit({ subreddit: selected, query: searchTerm }));
    } else {
      dispatch(fetchPostsBySubreddit(selected));
    }
  }, [dispatch, selected, searchTerm]);

  const handleSearch = (term) => setSearchTerm(term.trim());

  return (
    <div>
      <Header />

      <main className="container">
        <header className="hero">
          <h1 className="title">Welcome to Reddit Client</h1>

          {/* Search */}
          <div className="search-row">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Subreddit + viewing */}
          <div className="controls">
            <label htmlFor="subreddit-select" className="label">Subreddit:</label>
            <SubredditSelector id="subreddit-select" />
            <p className="viewing">
              viewing <strong>r/{selected}</strong>
              {searchTerm ? <> • search <strong>{searchTerm}</strong></> : null}
            </p>
          </div>
        </header>

        {loading && <LoadingSkeleton />}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <PostList />}
      </main>

      <Footer />
    </div>
  );
}

export default App;



