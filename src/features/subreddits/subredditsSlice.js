import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: ['popular', 'javascript', 'reactjs', 'webdev'], // added 'popular'
  isLoading: false,
  error: null,
  selected: 'webdev',
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    setSelectedSubreddit(state, action) {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;


