/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/components/chat/MessageBubble.tsx
"use client";

export default function MessageBubble({ text, isOwn, time }: any) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-xs px-4 py-2 rounded-lg shadow
          ${isOwn ? "bg-blue-600 text-white" : "bg-white text-gray-900"}
        `}
      >
        <p>{text}</p>
        <p className="text-[10px] opacity-70 mt-1">
          {new Date(time).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
