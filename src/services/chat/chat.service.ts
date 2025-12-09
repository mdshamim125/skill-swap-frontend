import { serverFetch } from "@/lib/server-fetch";

/**
 * Chat API Service
 * Using serverFetch (supports cookies + refresh token auto)
 */

const BASE = "/chat";

// ===================================================
// 1️⃣ CREATE or GET an existing conversation
// ===================================================
export const createOrGetConversation = async (
  userAId: string,
  userBId: string
) => {
  const res = await serverFetch.post(`${BASE}/create`, {
    body: JSON.stringify({ userAId, userBId }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to create/get conversation");
  }

  return res.json();
};

// ===================================================
// 2️⃣ GET all conversations for logged-in user
// ===================================================
export const getMyConversations = async () => {
  const res = await serverFetch.get(`${BASE}/my-conversations`);

  if (!res.ok) {
    throw new Error("Failed to load conversations");
  }

  return res.json();
};

// ===================================================
// 3️⃣ GET messages of a specific conversation
// ===================================================
export const getMessages = async (conversationId: string) => {
  const res = await serverFetch.get(`${BASE}/messages/${conversationId}`);

  if (!res.ok) {
    throw new Error("Failed to load messages");
  }

  return res.json();
};

// ===================================================
// 4️⃣ SEND message (REST Fallback for saving to DB)
// ===================================================
export const sendMessageRest = async (conversationId: string, text: string) => {
  const res = await serverFetch.post(`${BASE}/messages/send`, {
    body: JSON.stringify({ conversationId, text }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
};

// ===================================================
// 5️⃣ OPTIONAL: DELETE a conversation (admin or user)
// ===================================================
export const deleteConversation = async (conversationId: string) => {
  const res = await serverFetch.delete(`${BASE}/${conversationId}`);

  if (!res.ok) {
    throw new Error("Failed to delete conversation");
  }

  return res.json();
};

// ===================================================
// 6️⃣ OPTIONAL: Mark messages as seen
// ===================================================
export const markMessagesAsSeen = async (conversationId: string) => {
  const res = await serverFetch.patch(`${BASE}/messages/seen`, {
    body: JSON.stringify({ conversationId }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to mark messages as seen");
  }

  return res.json();
};
