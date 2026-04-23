import { useState, useEffect } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./component/Login";
import Chat from "./component/Chat";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle redirect result when user comes back from Google
    getRedirectResult(auth).catch((error) => {
      console.error(error);
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );

  return user ? <Chat user={user} /> : <Login />;
}

export default App;
