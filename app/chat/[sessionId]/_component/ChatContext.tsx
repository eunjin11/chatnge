"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Message } from "@/types/message";

interface ChatContextType {
  messages: Message[];
  addNewMessages: (userMessage: Message, aiMessage: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  initialMessages: Message[];
}

export const ChatProvider = ({
  children,
  initialMessages,
}: ChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addNewMessages = (userMessage: Message, aiMessage: Message) => {
    setMessages((prev) => [...prev, userMessage, aiMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, addNewMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
