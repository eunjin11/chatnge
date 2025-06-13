interface ChatRoomItemProps {
  type: string;
  date: string;
  text: string;
}

const ChatRoomItem = ({ type, date, text }: ChatRoomItemProps) => {
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-1 border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400">{type}</div>
        <button className="text-xs text-primary border border-primary rounded-full px-2 py-0.5">
          이어서 대화
        </button>
      </div>
      <div className="text-xs text-gray-400">{date}</div>
      <div className="text-sm mt-1">{text}</div>
    </div>
  );
};

export default ChatRoomItem;
