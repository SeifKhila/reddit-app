import React, { useState } from 'react'; // <- make sure useState is imported
import { useDispatch, useSelector } from 'react-redux';
import { toggleComments, fetchCommentsForPost } from '../../features/comments/commentsSlice';
import './Post.css';

function timeAgo(utc) {
  if (!utc) return '';
  const seconds = Math.max(1, Math.floor(Date.now() / 1000 - utc));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}


// helper: make a short badge from /r/<name> in the permalink
function abbrFromPermalink(permalink = '') {
  const m = permalink.match(/\/r\/([^/]+)/);
  const name = (m?.[1] || '').toUpperCase();
  if (!name) return 'RD';
  const parts = name.split(/[-_]/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).slice(0, 3);
  return name.slice(0, 2);
}

function Post({ id, title, author, score, num_comments, thumbnail, permalink, created_utc }) {
  const dispatch = useDispatch();

  const slot = useSelector((s) => s.comments.byPostId[id]);
  const isOpen = slot?.isOpen ?? false;
  const isLoading = slot?.isLoading ?? false;
  const error = slot?.error ?? null;
  const comments = slot?.items ?? [];

  // show fallback if the image is missing or errors
  const [imgError, setImgError] = useState(false);
  const showImage = thumbnail && thumbnail.startsWith('http') && !imgError;

  const onToggle = () => {
    const opening = !isOpen;
    dispatch(toggleComments(id));
    if (opening && comments.length === 0) {
      dispatch(fetchCommentsForPost({ postId: id, permalink }));
    }
  };

  return (
    <article className="post-card">
      <div className="thumb">
        {showImage ? (
          <img
            src={thumbnail}
            alt=""
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="no-thumb" aria-label="No thumbnail">
            <span className="abbr">{abbrFromPermalink(permalink)}</span>
          </div>
        )}
      </div>

      <div className="content">
        <h3 className="title">
          <a className="title-link" href={`https://www.reddit.com${permalink}`} target="_blank" rel="noreferrer">
            {title}
          </a>
        </h3>

        <p className="meta">
          by u/{author} • {score} upvotes • {num_comments} comments • {timeAgo(created_utc)}
        </p>

        <button className="toggle-comments btn subtle" onClick={onToggle}>
          {isOpen ? 'Hide comments' : 'Show comments'} ({num_comments})
        </button>

        {isOpen && (
          <div className="comments">
            {isLoading && <p>Loading comments…</p>}
            {error && <p style={{ color: 'crimson' }}>{error}</p>}
            {!isLoading && !error && comments.length === 0 && <p>No comments.</p>}
            {!isLoading && !error && comments.map((c) => (
              <div key={c.id} className="comment">
                <div className="comment-meta">u/{c.author} • {timeAgo(c.created_utc)}</div>
                <p className="comment-body">{c.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default Post;


