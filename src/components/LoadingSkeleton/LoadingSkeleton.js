import React from 'react';
import './LoadingSkeleton.css';

// this component just shows placeholder cards while posts are loading
function LoadingSkeleton() {
  const skeletons = Array(5).fill(0); // show 5 placeholders

  return (
    <section className="skeleton-list">
      {skeletons.map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-thumbnail"></div>
          <div className="skeleton-content">
            <div className="skeleton-line short"></div>
            <div className="skeleton-line long"></div>
            <div className="skeleton-line medium"></div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default LoadingSkeleton;
