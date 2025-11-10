import React from 'react';
import './SubredditSelector.css';

function SubredditSelector({ value, options, onChange }) {
  // dropdown to switch subreddit (keeping it simple)
  return (
    <div className="subreddit-wrap">
      <label htmlFor="subreddit" className="subreddit-label">subreddit</label>
      <select
        id="subreddit"
        className="subreddit-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((name) => (
          <option key={name} value={name}>r/{name}</option>
        ))}
      </select>
    </div>
  );
}

export default SubredditSelector;
