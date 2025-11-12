import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, placeholder = 'search reddit...' }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(term.trim());
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
        aria-label="Search Reddit"
      />
      <button className="btn primary" type="submit">
        Search
      </button>
    </form>
  );
}


