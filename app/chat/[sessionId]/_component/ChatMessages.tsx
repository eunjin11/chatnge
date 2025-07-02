"use client";

import ChatBubble from "../../../diary/[date]/_component/ChatBubble";
import { useChatContext } from "./ChatContext";

const ChatMessages = () => {
  const { messages } = useChatContext();

  return (
    <div className="flex-1 p-4 space-y-2 overflow-y-auto">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;
