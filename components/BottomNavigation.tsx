"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, MessageSquare, Pill, User } from "lucide-react";

const BottomNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center py-4 px-6 border-t bg-white border-gray-200 rounded-t-[20px] shadow-lg max-w-md mx-auto">
      <Link
        href="/diary"
        className={`flex flex-col items-center cursor-pointer ${pathname.startsWith("/diary") ? "text-primary" : "text-gray-500"}`}
      >
        <Activity size={20} />
        <span className="text-xs mt-1">기록</span>
      </Link>
      <Link
        href="/medicine"
        className={`flex flex-col items-center ${pathname.startsWith("/medicine") ? "text-primary" : "text-gray-500"}`}
      >
        <Pill size={20} />
        <span className="text-xs mt-1">약 알리미</span>
      </Link>
      <Link
        href="/"
        className={`flex flex-col items-center ${pathname === "/" ? "text-primary" : "text-gray-500"}`}
      >
        <Home size={20} />
        <span className="text-xs mt-1">홈</span>
      </Link>
      <Link
        href="/chat"
        className={`flex flex-col items-center ${pathname.startsWith("/chat") ? "text-primary" : "text-gray-500"}`}
      >
        <MessageSquare size={20} />
        <span className="text-xs mt-1">CHAT</span>
      </Link>
      <Link
        href="/mypage"
        className={`flex flex-col items-center ${pathname.startsWith("/mypage") ? "text-primary" : "text-gray-500"}`}
      >
        <User size={20} />
        <span className="text-xs mt-1">MYPAGE</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
