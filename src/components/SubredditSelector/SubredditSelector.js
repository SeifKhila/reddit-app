import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubreddit } from '../../features/subreddits/subredditsSlice';
import { fetchPostsBySubreddit } from '../../features/posts/postsSlice';

export default function SubredditSelector(props) {
  const dispatch = useDispatch();
  const { list, selected } = useSelector((s) => s.subreddits);

  const onChange = (e) => {
    const sub = e.target.value;
    dispatch(setSelectedSubreddit(sub));
    dispatch(fetchPostsBySubreddit(sub));
  };

  // forward any props (id, className, aria-*) to the select
  return (
    <select value={selected} onChange={onChange} {...props}>
      {list.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}




