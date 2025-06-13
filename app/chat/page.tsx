import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import ChatButton from "./_component/ChatButton";
import ChatRoomList from "./_component/ChatRoomList";
import MindReport from "./_component/MindReport";

const ChatPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={"채팅"} />
      <main className="flex-1 px-4 py-6 max-w-md mx-auto my-14 w-full">
        <div className="text-xs text-primary font-bold mb-1">CHAT</div>
        <div className="text-lg font-bold mb-1">무엇이든 다 도와줄게!</div>
        <ChatButton />
        <MindReport />
        <ChatRoomList />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default ChatPage;
