import React from "react";

interface MindLogItemProps {
  category: string;
  title: string;
  description: string;
}

const MindLogItem = ({ category, title, description }: MindLogItemProps) => {
  return (
    <div className="flex items-center mb-4 border border-gray-200 rounded-lg p-3">
      <div className="bg-gray-200 p-2 rounded-lg mr-3">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{category}</div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <button className="ml-2">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default MindLogItem;
