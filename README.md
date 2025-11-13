# Reddit Client

A Reddit client built with React and Redux. Users can browse posts from
different subreddits, search within a subreddit, and view comments with
Markdown support.

## Live URL

https://YOUR-NETLIFY-SITE.netlify.app

## Wireframes

- Home / list view: (insert screenshot or link)
- Post with comments expanded: (insert screenshot or link)

## Technologies Used

- React (Create React App)
- Redux Toolkit & React Redux
- React Testing Library + Jest
- React Markdown + remark-gfm
- Netlify (hosting + serverless function)
- Git & GitHub

## Features

- Load posts from a chosen subreddit (`r/webdev` by default)
- Search within the current subreddit using a search term
- View comments inline under each post
- Render comment bodies from Reddit’s Markdown
- Responsive layout for desktop and mobile
- Error + loading states for posts and comments
- Fallback data so users always see posts on first load

## Reddit JSON API & Rate Limiting

This app uses Reddit's JSON API by appending `.json` to URLs, for example:

- `https://www.reddit.com/r/webdev/hot.json`
- `https://www.reddit.com/search.json?q=react`

Comments are returned in Markdown and are rendered with `react-markdown`
and `remark-gfm`.

As of July 2023, Reddit limits free API access to 10 requests per minute.
In development (`npm start`), Create React App's proxy forwards requests
directly to `https://www.reddit.com`. In production (Netlify), a serverless
function proxies requests. If Reddit returns an error (e.g. 403 or 429
rate limit), the client falls back to a local dataset
`public/data/webdev.json` so the app remains usable.

## Tests

- Unit tests written with Jest and React Testing Library:
  - `Post.test.js` verifies that post titles, author metadata and
    comments render correctly.

(You can add an “End-to-end tests” bullet here once we add those.)

## Project Management

This project is tracked using a GitHub Project board:

- TODO / In Progress / Done

(Link your board here, e.g.  
https://seifkhila.github.io/reddit-app/)

## Future Work

- Proper OAuth-based Reddit API backend (no anonymous rate limits)
- Infinite scroll / pagination
- Sorting (Top, New, Hot)
- Dark mode
- Progressive Web App (PWA) support
