import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import ChatMessage from "./ChatMessage";

const rooms = ["general", "react-help", "random"];

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("general");
  const bottomRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "rooms", room, "messages"),
      orderBy("timestamp"),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "rooms", room, "messages"), {
      text: input,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="flex flex-col w-56 bg-gray-900 p-4">
        <h2 className="text-lg font-bold mb-4">💬 Rooms</h2>
        <div className="flex flex-col gap-1 flex-1">
          {rooms.map((r) => (
            <button
              key={r}
              onClick={() => setRoom(r)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition ${
                room === r
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              # {r}
            </button>
          ))}
        </div>

        {/* User info at bottom */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-300 truncate">
              {user.displayName}
            </span>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="w-full text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 py-1 rounded-lg transition"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 font-semibold">
          # {room}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {messages.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-10">
              No messages yet. Say hello! 👋
            </p>
          )}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} currentUser={user} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-800 flex gap-3">
          <input
            className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            placeholder={`Message #${room}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
