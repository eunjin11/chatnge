import Image from "next/image";
import Link from "next/link";

const ChatButton = () => {
  return (
    <Link
      href="/chat/chatting"
      className="rounded-xl p-4 flex items-center gap-3 mb-6 bg-[rgb(202,243,227,0.5)] drop-shadow-sm"
    >
      <div>
        <div className="text-sm text-gray-600">
          마음, 약, 도움이 필요할 때 언제든 도와줄게
        </div>
        <div className="mt-2 text-xs underline">
          {">"}지금 바로 채팅하러 가기
        </div>
      </div>
      <Image
        src="/images/MedicationCheckCharacter.png"
        alt="챗봇"
        className="w-14 h-14 ml-auto"
        width={56}
        height={56}
      />
    </Link>
  );
};

export default ChatButton;
