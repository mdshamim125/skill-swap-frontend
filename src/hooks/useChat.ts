/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useChat() {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Create socket connection (cookies will be sent automatically)
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
      {
        withCredentials: true, // IMPORTANT: allows HttpOnly cookies to be sent
      }
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected");
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("new_message", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("error_message", (err: any) => {
      console.error("socket error:", err);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const joinConversation = (conversationId: string) => {
    socketRef.current?.emit("join_conversation", conversationId);
  };

  const leaveConversation = (conversationId: string) => {
    socketRef.current?.emit("leave_conversation", conversationId);
  };

  const sendMessage = (conversationId: string, text: string) => {
    socketRef.current?.emit("send_message", { conversationId, text });
  };

  return {
    connected,
    messages,
    joinConversation,
    leaveConversation,
    sendMessage,
    socketRef,
  };
}
