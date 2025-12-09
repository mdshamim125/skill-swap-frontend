/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/components/chat/ChatWindow.tsx
"use client";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useEffect, useRef } from "react";

export default function ChatWindow({
  conversation,
  messages,
  onSendMessage,
  currentUserId,
}: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div>
          <h2 className="font-semibold">{conversation.name}</h2>
          <p className="text-sm text-gray-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m: any) => (
          <MessageBubble
            key={m.id}
            text={m.text}
            isOwn={m.senderId === currentUserId}
            time={m.createdAt}
          />
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <ChatInput onSend={(txt: string) => onSendMessage(txt)} />
      </div>
    </div>
  );
}
