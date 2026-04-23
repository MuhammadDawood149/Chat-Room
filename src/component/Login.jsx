import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const handleLogin = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-white mb-2">💬 Chat Room</h1>
        <p className="text-gray-400 mb-8">Sign in to start chatting</p>
        <button
          onClick={handleLogin}
          className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
