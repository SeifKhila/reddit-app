// LoadingSkeleton.js
import React from 'react';
import './LoadingSkeleton.css';

// Placeholder cards shown while posts are loading
export default function LoadingSkeleton({ count = 5 }) {
  return (
    <section
      className="skeleton-list"
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading posts"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card" aria-hidden="true">
          <div className="skeleton-thumbnail" />
          <div className="skeleton-content">
            <div className="skeleton-line long" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </section>
  );
}
