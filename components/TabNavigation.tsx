import React from "react";

interface TabNavigationProps {
  activeTab: "recent" | "emotion" | "medication";
  onTabChange: (tab: "recent" | "emotion" | "medication") => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="fixed top-18 left-0 right-0 bg-white border-b border-gray-200 py-2 px-8 flex-1 flex space-x-12 max-w-md mx-auto">
      <button
        className={`${
          activeTab === "recent"
            ? "text-black border-b-2 border-black"
            : "text-gray-400"
        }`}
        onClick={() => onTabChange("recent")}
      >
        전체
      </button>
      <button
        className={`${
          activeTab === "emotion"
            ? "text-black border-b-2 border-black"
            : "text-gray-400"
        }`}
        onClick={() => onTabChange("emotion")}
      >
        감정 기록
      </button>
      <button
        className={`${
          activeTab === "medication"
            ? "text-black border-b-2 border-black"
            : "text-gray-400"
        }`}
        onClick={() => onTabChange("medication")}
      >
        복약 기록
      </button>
    </div>
  );
};

export default TabNavigation;
