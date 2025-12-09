/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ChatLayout from "@/components/chat/ChatLayout";
import { useChat } from "@/hooks/useChat";
import { getAllUsers, getUserInfo } from "@/services/auth/getUserInfo";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const { messages, joinConversation, sendMessage } = useChat();
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // -------------------------------
  // 1️⃣ Load logged-in user
  // -------------------------------
  useEffect(() => {
    (async () => {
      const userInfo = await getUserInfo();
      if (userInfo) setUser(userInfo);
    })();
  }, []);

  // -------------------------------
  // 2️⃣ Load conversations
  // -------------------------------
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        let items: any[] = [];

        // Helper to remove self + duplicates
        const sanitize = (arr: any[]) =>
          arr
            .filter((a) => a.id !== user.id) // remove myself
            .filter(
              (v, i, self) => self.findIndex((x) => x.id === v.id) === i
            ); // remove duplicates

        if (user.role === "USER") {
          // User → sees mentors only
          const mentorsRes = await getAllUsers(
            {},
            { type: "mentors" },
            { id: user.id, role: "USER" }
          );

          const mentors = sanitize(mentorsRes.data ?? mentorsRes);

          items = mentors.map((m: any) => ({
            id: `u-${user.id}-m-${m.id}`,
            userId: m.id,
            name: m.name,
            type: "mentor",
          }));
        }

        if (user.role === "MENTOR") {
          // Mentor → sees users + admins

          const usersRes = await getAllUsers(
            {},
            { type: "users" },
            { id: user.id, role: "MENTOR" }
          );

          const adminsRes = await getAllUsers(
            {},
            { type: "admins" },
            { id: user.id, role: "MENTOR" }
          );

          const users = sanitize(usersRes.data ?? usersRes);
          const admins = sanitize(adminsRes.data ?? adminsRes);

          items = [
            ...users.map((u: any) => ({
              id: `m-${user.id}-u-${u.id}`,
              userId: u.id,
              name: u.name,
              type: "user",
            })),
            ...admins.map((a: any) => ({
              id: `m-${user.id}-a-${a.id}`,
              userId: a.id,
              name: a.name,
              type: "admin",
            })),
          ];
        }

        if (user.role === "ADMIN") {
          // Admin → sees mentors only
          const mentorsRes = await getAllUsers(
            {},
            { type: "mentors" },
            { id: user.id, role: "ADMIN" }
          );

          const mentors = sanitize(mentorsRes.data ?? mentorsRes);

          items = mentors.map((m: any) => ({
            id: `a-${user.id}-m-${m.id}`,
            userId: m.id,
            name: m.name,
            type: "mentor",
          }));
        }

        setConversations(items);
      } catch (err) {
        console.error("Conversation load failed:", err);
      }
    })();
  }, [user]);

  // -------------------------------
  // 3️⃣ Join conversation
  // -------------------------------
  useEffect(() => {
    if (!activeConversation) return;
    joinConversation(activeConversation.id);
  }, [activeConversation, joinConversation]);

  // -------------------------------
  // 4️⃣ Render UI
  // -------------------------------
  return (
    <ChatLayout
      conversations={conversations}
      activeConversation={activeConversation}
      onSelectConversation={setActiveConversation}
      messages={messages}
      currentUserId={user?.id}
      onSendMessage={(text: string) => {
        if (!activeConversation) return;
        sendMessage(activeConversation.id, text);
      }}
    />
  );
}










// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import ChatLayout from "@/components/chat/ChatLayout";
// import { useChat } from "@/hooks/useChat";
// import { getAllUsers, getUserInfo } from "@/services/auth/getUserInfo";
// import { useEffect, useState } from "react";

// export default function ChatPage() {
//   const { messages, joinConversation, sendMessage } = useChat();
//   const [activeConversation, setActiveConversation] = useState<any>(null);
//   const [conversations, setConversations] = useState<any[]>([]);
//   const [user, setUser] = useState<any>(null);

//   // 1️⃣ Load current logged-in user
//   useEffect(() => {
//     (async () => {
//       const userInfo = await getUserInfo();
//       if (userInfo) setUser(userInfo);
//     })();
//   }, []);

//   // 2️⃣ Load conversations dynamically
//   useEffect(() => {
//     if (!user) return;

//     (async () => {
//       try {
//         let conversationData: any[] = [];

//         if (user.role === "USER") {
//           // Users see only mentors
//           const mentors = await getAllUsers(
//             {},
//             { type: "mentors" },
//             { id: user.id, role: "USER" }
//           );

//           conversationData = mentors.map((m: any) => ({
//             id: `u-${user.id}-m-${m.id}`,
//             name: m.name,
//             type: "mentor",
//           }));
//         } else if (user.role === "MENTOR") {
//           // Mentors see users + admins
//           const users = await getAllUsers(
//             {},
//             { type: "users" },
//             { id: user.id, role: "MENTOR" }
//           );

//           const admins = await getAllUsers(
//             {},
//             { type: "admins" },
//             { id: user.id, role: "MENTOR" }
//           );

//           conversationData = [
//             ...users.map((u: any) => ({
//               id: `m-${user.id}-u-${u.id}`,
//               name: u.name,
//               type: "user",
//             })),
//             ...admins.map((a: any) => ({
//               id: `m-${user.id}-a-${a.id}`,
//               name: a.name,
//               type: "admin",
//             })),
//           ];
//         } else if (user.role === "ADMIN") {
//           // Admin sees all mentors
//           const mentors = await getAllUsers(
//             {},
//             { type: "mentors" },
//             { id: user.id, role: "ADMIN" }
//           );

//           conversationData = mentors.map((m: any) => ({
//             id: `a-${user.id}-m-${m.id}`,
//             name: m.name,
//             type: "mentor",
//           }));
//         }

//         setConversations(conversationData);
//       } catch (err) {
//         console.error("Failed to load conversations:", err);
//       }
//     })();
//   }, [user]);

//   // 3️⃣ Join conversation when selected
//   useEffect(() => {
//     if (!activeConversation) return;
//     joinConversation(activeConversation.id);
//   }, [activeConversation, joinConversation]);

//   // 4️⃣ Render chat UI
//   return (
//     <ChatLayout
//       conversations={conversations}
//       activeConversation={activeConversation}
//       onSelectConversation={setActiveConversation}
//       messages={messages}
//       currentUserId={user?.id}
//       onSendMessage={(text: string) => {
//         if (!activeConversation) return;
//         sendMessage(activeConversation.id, text);
//       }}
//     />
//   );
// }
