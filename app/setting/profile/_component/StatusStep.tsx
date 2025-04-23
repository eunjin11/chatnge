import FormButton from "@/components/form/FormButton";
import React, { useState } from "react";
import ProfileFormInfo from "./ProfileFormInfo";

type StepProps = {
  onNext: (status: string) => void;
};

const StatusStep = ({ onNext }: StepProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const toggleStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const motivationCategories = [
    {
      icon: "🏫",
      title: "학습",
      items: ["초등학생", "중학생", "고등학생", "대학생"],
    },
    {
      icon: "🏢",
      title: "직업",
      items: ["취업준비생", "직장인", "프리랜서"],
    },
    {
      icon: "🏠",
      title: "가족",
      items: ["주부", "육아 중이에요", "보호자(부모/교사)"],
    },
    {
      icon: "👤",
      title: "기타",
      items: ["쉬는 중이에요", "말하고 싶지 않아요", "기타"],
    },
  ];

  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col bg-primary h-full">
        <ProfileFormInfo
          step="3/5"
          subTitle={"쳇인지를 찾게 된 계기가 궁금해요!"}
          text={"당신의 이야기에 더 가까이 다가가기 위해 알고 싶어요."}
        />
        <div className="flex-1 bg-white rounded-t-3xl flex flex-col">
          <div className="px-6 pt-6 flex flex-col gap-1 overflow-auto">
            {motivationCategories.map((category, idx) => (
              <div key={idx} className="flex flex-col gap-2 text-gray-900">
                <div className="flex items-center gap-2 font-semibold">
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      className={`py-1 px-2 rounded-full border border-primary text-sm ${
                        selectedStatus === item ? "bg-primary-50" : "bg-white "
                      }`}
                      onClick={() => toggleStatus(item)}
                    >
                      #{item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-grow"></div>
          <div className="px-4 my-8">
            <FormButton
              type="button"
              text="다음"
              isValid={selectedStatus !== ""}
              onClick={() => onNext(selectedStatus)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusStep;
