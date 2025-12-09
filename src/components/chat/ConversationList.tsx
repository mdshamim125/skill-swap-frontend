/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/components/chat/ConversationList.tsx
"use client";

export default function ConversationList({ conversations, activeId, onSelect }: any) {
  return (
    <div className="space-y-2">
      {conversations.map((c: any) => (
        <div
          key={c.id}
          onClick={() => onSelect(c)}
          className={`p-3 rounded-lg cursor-pointer transition
            ${activeId === c.id ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}
          `}
        >
          <p className="font-medium">{c.name}</p>
          <p className="text-sm opacity-70 truncate">{c.lastMessage ?? "No messages yet"}</p>
        </div>
      ))}
    </div>
  );
}
