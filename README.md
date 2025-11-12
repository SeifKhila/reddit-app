# Reddit Client (React + Redux Toolkit)

A minimal Reddit client built as a learning project. It lists subreddit posts, supports search, and loads comments per post with cached toggling.

## Stack
- React + Vite/CRA (your setup)
- Redux Toolkit (`@reduxjs/toolkit`)
- React Redux (`react-redux`)

## Features
- Browse posts by subreddit (`webdev`, `reactjs`, etc.)
- Search within the selected subreddit
- Show/Hide comments per post (first open fetch; cached afterwards)
- Loading and error states for posts & comments
- Safe thumbnail handling + external link to Reddit

## Getting Started
```bash
npm install
npm start
