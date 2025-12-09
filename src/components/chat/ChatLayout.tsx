/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/components/chat/ChatLayout.tsx
"use client";

import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

export default function ChatLayout({
  conversations,
  activeConversation,
  onSelectConversation,
  messages,
  onSendMessage,
  currentUserId,
}: any) {
  return (
    <div className="flex h-[85vh] border rounded-xl shadow-md bg-white overflow-hidden">
      
      {/* Left Sidebar */}
      <div className="w-72 border-r bg-gray-50 p-3">
        <h2 className="font-semibold text-lg mb-2">Conversations</h2>
        <ConversationList
          conversations={conversations}
          activeId={activeConversation?.id}
          onSelect={(c: any) => onSelectConversation(c)}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {activeConversation ? (
          <ChatWindow
            conversation={activeConversation}
            messages={messages}
            onSendMessage={onSendMessage}
            currentUserId={currentUserId}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
