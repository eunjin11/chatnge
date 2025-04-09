import { Button } from "@/components/ui/button";
import { MedicationStatus } from "@/constants/types";
import React, { useState } from "react";
import ProfileFormInfo from "./ProfileFormInfo";
import FormButton from "@/components/form/FormButton";

type MedicationStatusStepProps = {
  onNext: (medicationStatus: MedicationStatus) => void;
};

const MedicationStatusStep = ({ onNext }: MedicationStatusStepProps) => {
  const [selectedStatus, setSelectedStatus] = useState<MedicationStatus | null>(
    null
  );

  const handleStatusSelect = (status: MedicationStatus) => {
    setSelectedStatus(status);
  };

  const medicationOptions: { label: string; value: MedicationStatus }[] = [
    {
      label: "네 복용 중이에요",
      value: "YES",
    },
    {
      label: "아니요, 복용 중인 약이 없어요",
      value: "NO",
    },
    {
      label: "기억이 잘 안 나요/예매해요",
      value: "UNKNOWN",
    },
  ];

  const isFormValid = () => {
    return selectedStatus !== null;
  };

  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col bg-primary h-full">
        <ProfileFormInfo
          step="4/5"
          subTitle={"현재 복용 중인 약이 있으신가요?"}
          text={"더 나은 건강 관리를 위해 알려주세요."}
        />
        <div className="flex-1 bg-white rounded-t-3xl flex flex-col">
          <div className="p-6 flex flex-col gap-8">
            <h3 className="font-medium text-gray-800">약 정보 & 복약 관리</h3>
            <div className="flex flex-col gap-2">
              {medicationOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={`flex items-center px-4 py-2 border rounded-xl cursor-pointer ${
                    selectedStatus === option.value
                      ? "border-primary bg-white"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleStatusSelect(option.value)}
                >
                  <div
                    className={`w-5 h-5 flex-shrink-0 rounded-full border ${
                      selectedStatus === option.value
                        ? "bg-primary"
                        : "border border-gray-300"
                    }`}
                  />
                  <span className="ml-3 text-gray-700">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-grow"></div>
          <div className="px-4 my-8">
            <FormButton
              isValid={isFormValid()}
              text="다음"
              onClick={() => selectedStatus && onNext(selectedStatus)}
            ></FormButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationStatusStep;
