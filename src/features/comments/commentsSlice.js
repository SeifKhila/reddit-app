// src/features/comments/commentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/reddit';

/*
  Concept:
  Each post can have its own set of comments.
  We store them by post ID so each one loads independently.

  Shape:
  state.comments.byPostId = {
    [postId]: {
      items: [],        // array of comments
      isLoading: false,
      error: null,
      isOpen: false     // whether comments panel is open
    }
  }
*/

const makeEmptySlot = () => ({
  items: [],
  isLoading: false,
  error: null,
  isOpen: false,
});

// Async thunk → fetch comments for a given post
// arg is an object: { postId, permalink }
export const fetchCommentsForPost = createAsyncThunk(
  'comments/fetchForPost',
  async ({ postId, permalink }) => {
    const comments = await getPostComments(permalink);
    return { postId, comments };
  }
);

const initialState = {
  byPostId: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleComments(state, action) {
      const postId = action.payload;
      const slot = state.byPostId[postId] ?? makeEmptySlot();
      slot.isOpen = !slot.isOpen;
      state.byPostId[postId] = slot;
    },
  },
  extraReducers: (builder) => {
    builder
      // loading
      .addCase(fetchCommentsForPost.pending, (state, action) => {
        const { postId } = action.meta.arg; // ✅ correct: arg is { postId, permalink }
        const slot = state.byPostId[postId] ?? makeEmptySlot();
        slot.isLoading = true;
        slot.error = null;
        slot.isOpen = true; // open while loading
        state.byPostId[postId] = slot;
      })
      // success
      .addCase(fetchCommentsForPost.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        const slot = state.byPostId[postId] ?? makeEmptySlot();
        slot.isLoading = false;
        slot.error = null;
        slot.items = comments;
        state.byPostId[postId] = slot;
      })
      // error
      .addCase(fetchCommentsForPost.rejected, (state, action) => {
        const { postId } = action.meta.arg;
        const slot = state.byPostId[postId] ?? makeEmptySlot();
        slot.isLoading = false;
        slot.error =
          action.error?.message || 'Failed to load comments';
        state.byPostId[postId] = slot;
      });
  },
});

export const { toggleComments } = commentsSlice.actions;
export default commentsSlice.reducer;

