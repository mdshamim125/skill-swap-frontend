/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/components/chat/ChatInput.tsx
"use client";

import { useState } from "react";

export default function ChatInput({ onSend }: any) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 border p-2 rounded-lg"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}
