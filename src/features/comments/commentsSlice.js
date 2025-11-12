import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/reddit';

/*
  Concept:
  Each post can have its own set of comments.
  We store them by post ID so each one loads independently.
*/

// Async thunk → fetch comments for a given post
export const fetchCommentsForPost = createAsyncThunk(
  'comments/fetchForPost',
  async ({ postId, permalink }) => {
    const comments = await getPostComments(permalink);
    return { postId, comments };
  }
);


const initialState = {
  byPostId: {} // Example: { abc123: { items: [], isLoading: false, error: null, isOpen: false } }
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleComments(state, action) {
      const id = action.payload;
      // Get current slot or create an empty one
      const slot = state.byPostId[id] ?? { items: [], isLoading: false, error: null, isOpen: false };
      slot.isOpen = !slot.isOpen;
      state.byPostId[id] = slot;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsForPost.pending, (state, action) => {
        const { arg: postId } = action.meta;
        const slot = state.byPostId[postId] ?? { items: [], isLoading: false, error: null, isOpen: true };
        slot.isLoading = true;
        slot.error = null;
        slot.isOpen = true; // open while loading
        state.byPostId[postId] = slot;
      })
      .addCase(fetchCommentsForPost.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.byPostId[postId].isLoading = false;
        state.byPostId[postId].items = comments;
      })
      .addCase(fetchCommentsForPost.rejected, (state, action) => {
        const { arg: postId } = action.meta;
        state.byPostId[postId].isLoading = false;
        state.byPostId[postId].error = action.error.message || 'Failed to load comments';
      });
  },
});

export const { toggleComments } = commentsSlice.actions;
export default commentsSlice.reducer;
