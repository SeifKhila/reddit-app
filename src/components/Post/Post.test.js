if (typeof jest !== 'undefined') {
  jest.mock('react-markdown', () => {
    const React = require('react');
    return function ReactMarkdown(props) {
      return React.createElement('div', null, props.children);
    };
  });
}

jest.mock('remark-gfm', () => {
  return () => null;
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// NOTE: we are deep inside e2e/e2e/__tests__, so go 3 levels up to reach src:
import commentsReducer from '../../../src/features/comments/commentsSlice';
import Post from '../../../src/components/Post/Post';

// helper to render Post with a real Redux store
function renderWithStore(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: {
      comments: commentsReducer,
    },
    preloadedState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

const basePost = {
  id: 'demo1',
  title: 'Build a Reddit client with React and Redux',
  author: 'codecademy_demo',
  score: 123,
  num_comments: 15,
  thumbnail: '',
  permalink: '/r/webdev/comments/demo1/build_a_reddit_client/',
  created_utc: 1700000000,
};

test('renders post title and author meta', () => {
  renderWithStore(<Post {...basePost} />, {
    preloadedState: {
      comments: { byPostId: {} },
    },
  });

  const titleEl = screen.getByText(/build a reddit client with react and redux/i);
  const authorMeta = screen.getByText(/by u\/codecademy_demo/i);

  expect(titleEl).toBeTruthy();
  expect(authorMeta).toBeTruthy();
});

test('renders markdown comment when open', () => {
  const markdownComment = {
    id: 'c1',
    author: 'commenter1',
    body: '**Bold** comment with [link](https://example.com)',
    score: 10,
    created_utc: 1700000100,
  };

  renderWithStore(<Post {...basePost} />, {
    preloadedState: {
      comments: {
        byPostId: {
          [basePost.id]: {
            items: [markdownComment],
            isLoading: false,
            error: null,
            isOpen: true, // comments panel open
          },
        },
      },
    },
  });

  const commentText = screen.getByText(/comment with/i);
  const commentAuthor = screen.getByText(/u\/commenter1/i);

  expect(commentText).toBeTruthy();
  expect(commentAuthor).toBeTruthy();
});