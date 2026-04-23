import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAys5XRoh1twWvyFJS9Dmw0dvKKpKXL7CA",
  authDomain: "chat-room-e2996.firebaseapp.com",
  projectId: "chat-room-e2996",
  storageBucket: "chat-room-e2996.firebasestorage.app",
  messagingSenderId: "112113035437",
  appId: "1:112113035437:web:13355224fa9b3172b37e24",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
