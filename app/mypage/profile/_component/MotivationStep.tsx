import FormButton from "@/components/form/FormButton";
import React, { useState } from "react";
import ProfileFormInfo from "./ProfileFormInfo";

type MotivationStepProps = {
  onNext: (motivation: string[]) => void;
};

const MotivationStep = ({ onNext }: MotivationStepProps) => {
  const [selectedMotivations, setSelectedMotivations] = useState<string[]>([]);

  const toggleMotivation = (motivation: string) => {
    if (selectedMotivations.includes(motivation)) {
      setSelectedMotivations(
        selectedMotivations.filter((item) => item !== motivation)
      );
    } else {
      setSelectedMotivations([...selectedMotivations, motivation]);
    }
  };

  const motivationCategories = [
    {
      icon: "📁",
      title: "기록 & 감정 관리",
      items: ["마음정리", "감정기록", "하루되돌아보기"],
    },
    {
      icon: "✏️",
      title: "약 정보 & 복약 관리",
      items: ["약효과확인", "약정보검색", "복약알림"],
    },
    {
      icon: "⏰",
      title: "자가 관리 & 도움 요청",
      items: ["자기관리습관", "조언받고싶어요", "상태체크"],
    },
    {
      icon: "❤️",
      title: "가벼운 관심",
      items: ["그냥궁금해서", "한번써보려고", "기타"],
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
                        selectedMotivations.includes(item)
                          ? "bg-primary-50"
                          : "bg-white "
                      }`}
                      onClick={() => toggleMotivation(item)}
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
              isValid={selectedMotivations.length > 0}
              onClick={() => onNext(selectedMotivations)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationStep;
