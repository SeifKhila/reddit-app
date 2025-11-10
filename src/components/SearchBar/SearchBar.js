import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  // local input state
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    onSearch(term.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search reddit..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="search-input"
        aria-label="search"
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
