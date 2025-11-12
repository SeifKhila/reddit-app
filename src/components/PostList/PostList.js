import { useSelector } from 'react-redux';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import Post from '../Post/Post';

function PostList() {
  const { items, isLoading, error } = useSelector((s) => s.posts);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;
  if (!Array.isArray(items) || items.length === 0) return <p>No posts yet.</p>;

  return (
    <div className="post-list">
      {items.map((p) => (
        <Post key={p.id} {...p} />
      ))}
    </div>
  );
}

export default PostList;




