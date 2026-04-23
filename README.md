# 💬 Chat Room

A real-time chat application built with React, Firebase, and Tailwind CSS.

🔗 **Live Demo:** [chat-room-orcin-one.vercel.app](https://chat-room-orcin-one.vercel.app/)

---

## About

Chat Room is a full-stack real-time messaging app where users sign in with Google and chat across multiple topic-based rooms. Messages appear instantly for all connected users — no page refresh needed.

---

## Features

- **Google Sign-In** — one-click authentication via Firebase Auth
- **Real-time messaging** — messages appear instantly using Firestore `onSnapshot`
- **Multiple rooms** — general, react-help, and random
- **User avatars** — Google profile pictures shown next to messages
- **Auto-scroll** — chat scrolls to the latest message automatically
- **Dark UI** — clean dark theme built with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Authentication | Firebase Auth (Google) |
| Database | Cloud Firestore |
| Deployment | Vercel |

---

## How It Works

The app uses Firebase's `onSnapshot` listener to watch Firestore in real time. When any user sends a message, it is written to Firestore and instantly pushed to all other connected users.

**Authentication flow:**
1. User clicks Sign in with Google
2. Firebase handles the OAuth redirect
3. Google returns user data to Firebase
4. `onAuthStateChanged` detects login and renders the chat

**Messaging flow:**
1. User sends a message
2. Message is written to `rooms/{room}/messages/{id}` in Firestore
3. All connected clients receive the update via `onSnapshot`
4. React re-renders with the new message

---

## Project Structure

```
src/
  firebase.js          Firebase config, auth, and db exports
  main.jsx             App entry point
  App.jsx              Auth state listener — routes to Login or Chat
  components/
    Login.jsx          Google Sign-In screen
    Chat.jsx           Main chat UI with sidebar and message area
    ChatMessage.jsx    Individual message bubble component
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/MuhammadDawood149/Chat-Room.git
cd Chat-Room

# Install dependencies
npm install

# Add your Firebase config to src/firebase.js
# Then run the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## What I Learned

- Setting up Firebase Authentication with Google Sign-In
- Using Firestore real-time listeners (`onSnapshot`) for live data
- Structuring a React app with multiple components and shared state
- Using `useEffect` cleanup to unsubscribe from Firestore listeners
- Deploying a React + Vite app to Vercel from GitHub

---

## Author

**Muhammad Dawood** — [github.com/MuhammadDawood149](https://github.com/MuhammadDawood149)

---

*Built with React + Firebase + Tailwind CSS + Vite — 2025*
