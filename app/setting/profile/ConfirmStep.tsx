import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { ProfileUpdateData } from "@/constants/types";
import { medicationOptions } from "./MedicationStatusStep";

type ConfirmStepProps = {
  profileData: ProfileUpdateData;
  onNext: () => void;
};

const ConfirmStep = ({ profileData, onNext }: ConfirmStepProps) => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const medicationLabel = medicationOptions.find(
    (option) => option.value === profileData.medicationStatus
  )?.label;

  return (
    <div className="flex flex-col items-center min-h-screen bg-primary p-6">
      <div className="flex flex-col items-center text-white mt-8 mb-6">
        <div className="text-white mb-2">
          <Image
            src="/Logo.png"
            alt="챗인지 로고"
            width={60}
            height={60}
            className="mx-auto"
          />
        </div>
        <h1 className="text-xl font-bold text-center">
          이제, 당신만의 챗인지가 시작해요!
        </h1>
        <p className="text-sm text-center mt-1">
          지금까지 답변주신 이야기들을 수집했어요
        </p>
      </div>

      <div className="bg-white rounded-xl w-full p-6 shadow-md mb-10">
        <div className="mb-4">
          <p className="text-gray-500 text-xs">프로필 정보</p>
          <h2 className="text-2xl font-bold text-yellow-500">
            {profileData.nickname}
          </h2>
          <p className="text-xs text-gray-500">
            {formatDate(profileData.birthdate)}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">목적</p>
          <div className="flex space-x-2">
            {profileData.motivation.map((item, index) => (
              <div
                key={index}
                className="px-3 py-1 border border-primary text-gray-700 text-xs rounded-full"
              >
                #{item}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">나의 상황</p>
          <div className="flex items-center border border-primary rounded-full px-4 py-2">
            <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">{profileData.status}</span>
          </div>
        </div>

        <div className="mb-2">
          <p className="text-sm mb-2">복용상태</p>
          <div className="flex items-center border border-primary rounded-full px-4 py-2">
            <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">{medicationLabel}</span>
          </div>
        </div>
      </div>
      <Button
        type="button"
        className={`w-full h-[50px] text-primary font-bold py-4 rounded-xl 
        bg-[#D7F8F8]`}
        onClick={onNext}
      >
        시작하기
      </Button>
    </div>
  );
};

export default ConfirmStep;
