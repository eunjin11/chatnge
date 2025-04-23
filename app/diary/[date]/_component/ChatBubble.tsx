import { Message } from "../page";

const ChatBubble = ({ message }: { message: Message }) => {
  return (
    <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
      {!message.isUser && (
        <div className="chat-bubble chat-bubble-bot">
          <p className="text-sm whitespace-pre-line">{message.text}</p>
        </div>
      )}

      {message.isUser && (
        <div className="chat-bubble chat-bubble-user">
          <div className="flex items-center">
            <p className="text-sm">{message.text}</p>
            <span className="ml-2 text-sm">{message.emoji}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
