import React from "react";
import Image from "next/image";
interface DiaryCardProps {
  type: "emotion" | "medication";
  title: string;
  description: string;
}

function DiaryCard({ type, title, description }: DiaryCardProps) {
  return (
    <div
      className={`rounded-[20px] p-4 w-[48%] h-[180px] flex flex-col shadow-lg relative ${
        type === "emotion" ? "bg-primary text-white" : "bg-white"
      }`}
    >
      <p className="font-bold mb-2 text-[16px] whitespace-pre-line">{title}</p>
      <p
        className={`text-[8px] ${
          type === "emotion" ? "text-white" : "text-gray-600"
        }`}
      >
        {description}
      </p>
      {type === "medication" && (
        <div className="absolute bottom-4 right-4">
          <Image
            src="/MedicationCheckCharacter.png"
            alt="diary-card"
            width={89}
            height={70}
            quality={100}
            priority
          />
        </div>
      )}
    </div>
  );
}

export default DiaryCard;
