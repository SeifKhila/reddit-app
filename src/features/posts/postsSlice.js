import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubredditPosts, searchInSubreddit } from '../../api/reddit';

// 1) Fetch posts for a subreddit
export const fetchPostsBySubreddit = createAsyncThunk(
  'posts/fetchBySubreddit',
  async (subreddit) => {
    const posts = await getSubredditPosts(subreddit);
    return posts; // becomes action.payload in 'fulfilled'
  }
);

// 2) Search within a subreddit
export const searchPostsInSubreddit = createAsyncThunk(
  'posts/searchInSubreddit',
  async ({ subreddit, query }) => {
    const posts = await searchInSubreddit(subreddit, query);
    return posts;
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.error = null;
    },
  },
  // 3) React to thunk lifecycle actions
  extraReducers: (builder) => {
    builder
      // fetchPostsBySubreddit
      .addCase(fetchPostsBySubreddit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsBySubreddit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPostsBySubreddit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load posts';
      })

      // searchPostsInSubreddit
      .addCase(searchPostsInSubreddit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPostsInSubreddit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(searchPostsInSubreddit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;


