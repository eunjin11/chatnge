import { Activity } from "lucide-react";
import { Home } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { User } from "lucide-react";
import React from "react";

const BottomNaviation = () => {
  return (
    <div className="flex justify-between items-center py-4 px-2 border-t border-gray-200 rounded-t-[20px] shadow-lg">
      <button className="flex flex-col items-center text-primary">
        <Activity size={20} />
        <span className="text-xs mt-1">기록</span>
      </button>
      <button className="flex flex-col items-center text-gray-500">
        <Activity size={20} />
        <span className="text-xs mt-1">약 알리미</span>
      </button>
      <button className="flex flex-col items-center text-gray-500">
        <Home size={20} />
        <span className="text-xs mt-1">홈</span>
      </button>
      <button className="flex flex-col items-center text-gray-500">
        <MessageSquare size={20} />
        <span className="text-xs mt-1">CHAT</span>
      </button>
      <button className="flex flex-col items-center text-gray-500">
        <User size={20} />
        <span className="text-xs mt-1">MYPAGE</span>
      </button>
    </div>
  );
};

export default BottomNaviation;
