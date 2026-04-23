function ChatMessage({ message, currentUser }) {
  const isMe = message.uid === currentUser.uid;

  return (
    <div
      className={`flex items-end gap-2 mb-4 ${isMe ? "justify-end" : "justify-start"}`}
    >
      {!isMe && (
        <img
          src={message.photoURL}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      )}
      <div>
        {!isMe && (
          <p className="text-xs text-gray-400 mb-1 ml-1">
            {message.displayName}
          </p>
        )}
        <div
          className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
            isMe
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-700 text-white rounded-bl-none"
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
