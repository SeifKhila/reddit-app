import React from 'react';
import './Skeleton.css';

export default function SkeletonPosts({ count = 5 }) {
  return (
    <div className="post-list">
      {Array.from({ length: count }).map((_, i) => (
        <article className="post-card skeleton" key={i}>
          <div className="thumb shimmer" />
          <div className="content">
            <div className="line w-70 shimmer" />
            <div className="line w-50 shimmer" />
            <div className="line w-30 shimmer" />
          </div>
        </article>
      ))}
    </div>
  );
}
