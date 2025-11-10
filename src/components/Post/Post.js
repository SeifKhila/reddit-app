
import React from 'react';
import './Post.css';

function Post({ title, author, score, comments, thumbnail }) {
  // if reddit doesn’t send a real image, just use a placeholder block instead
  const hasThumb = thumbnail && thumbnail.startsWith('http');

  return (
    <article className="post-card">
      <div className="thumb">
        {hasThumb ? (
          <img
            src={thumbnail}
            alt=""
            // if image breaks, hide it and show the backup block instead
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.classList.add('no-thumb');
            }}
          />
        ) : (
          <div className="no-thumb" />
        )}
      </div>

      <div className="content">
        {/* main title */}
        <h3 className="title">{title}</h3>

        {/* small info line under title */}
        <p className="meta">
          by u/{author} • {score} upvotes • {comments} comments
        </p>
      </div>
    </article>
  );
}

export default Post;
