import ChatRoomItem from "./ChatRoomItem";

const chatHistory = [
  {
    type: "대화",
    date: "2025년 5월 3일 19:38",
    text: "기분이 이상하다고 느꼈던 이유가 있었어?",
  },
  {
    type: "약정보",
    date: "2025년 5월 1일 20:24",
    text: "복용 중인 약에 대해 알려줄게.",
  },
];

const ChatRoomList = () => {
  return (
    <>
      <div className="mb-2 flex justify-between items-center">
        <div className="font-bold">이전 대화 기록</div>
        <button className="text-xs text-gray-400">최근 1개월</button>
      </div>
      <div className="flex flex-col gap-3">
        {chatHistory.map((item, idx) => (
          <ChatRoomItem
            key={idx}
            type={item.type}
            date={item.date}
            text={item.text}
          />
        ))}
      </div>
    </>
  );
};

export default ChatRoomList;
