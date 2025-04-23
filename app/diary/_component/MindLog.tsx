import React from "react";
import MindLogItem from "./MindLogItem";

const MindLog = () => {
  return (
    <div className="m-2 border border-gray-200 rounded-[20px] p-4 shadow-lg">
      <h2 className="font-bold mb-2">마인드 로그</h2>
      <div className="flex space-x-2 my-2">
        <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          최근 기록
        </button>
        <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          매우 좋아요
        </button>
        <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          최근 일주일
        </button>
      </div>
      {/* 리스트 아이템 */}
      {[1, 2, 3].map((item) => (
        <MindLogItem
          key={item}
          category="Category • 1.2 miles away"
          title="List item"
          description="Supporting line text"
        />
      ))}
    </div>
  );
};

export default MindLog;
