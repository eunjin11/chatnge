import FormButton from "@/components/form/FormButton";
import React, { useState } from "react";
import ProfileFormInfo from "./ProfileFormInfo";

type BirthdateStepProps = {
  onNext: () => void;
};

const BirthDateStep = ({ onNext }: BirthdateStepProps) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col bg-primary ">
        <ProfileFormInfo
          step="2/5"
          subTitle={"나이를 알려주세요!"}
          text={"입력해주신 정보는 안전하게 보호돼요!"}
        />
        <div className="flex-1 bg-white rounded-t-3xl flex flex-col">
          <div className="flex flex-row p-8 my-4 text-gray-800">
            <div className="flex flex-col">
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
                maxLength={4}
                className="w-full focus:outline-none text-sm font-semibold text-[#585858]"
              />
              <div className="my-2 border-b-2 border-primary" />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="MM"
                maxLength={2}
                className="w-full focus:outline-none text-sm font-semibold text-[#585858]"
              />
              <div className="my-2 border-b-2 border-primary" />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="DD"
                maxLength={2}
                className="w-full focus:outline-none text-sm font-semibold text-[#585858]"
              />
              <div className="my-2 border-b-2 border-primary" />
            </div>
          </div>
          <div className="flex-grow"></div>
          <div className="px-4 my-8">
            <FormButton
              type="button"
              text="다음"
              isValid={true}
              onClick={onNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthDateStep;
