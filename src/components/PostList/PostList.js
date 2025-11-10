import React from 'react';
import './PostList.css';
import Post from '../Post/Post';

function PostList({ posts }) {
  // just render list of cards
  if (!posts || posts.length === 0) {
    return <p className="postlist-empty">no posts yet</p>;
  }

  return (
    <section className="postlist">
      {posts.map((p) => (
        <Post
          key={p.id}
          title={p.title}
          author={p.author}
          score={p.score}
          comments={p.num_comments}
          thumbnail={p.thumbnail}
        />
      ))}
    </section>
  );
}

export default PostList;

