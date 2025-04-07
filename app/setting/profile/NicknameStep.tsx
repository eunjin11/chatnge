"use client";

import React, { useState } from "react";
import FormButton from "@/components/form/FormButton";
import ProfileFormInfo from "./ProfileFormInfo";

type NicknameStepProps = {
  onNext: () => void;
};

const NicknameStep = ({ onNext }: NicknameStepProps) => {
  const [nickname, setNickname] = useState("");

  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col bg-primary ">
        <ProfileFormInfo
          step="1/4"
          title={
            <>
              챗인지를 위한 첫 대화,
              <br />
              나를 소개해요
            </>
          }
          subTitle={"어떤 이름으로 불러드릴까요?"}
          text={"이 닉네임은 당신을 부를 소중한 이름이에요"}
        />
        <div className="flex-1 bg-white rounded-t-3xl flex flex-col">
          <div className="p-8 my-4 text-gray-800">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요"
              className="w-full focus:outline-none text-sm font-semibold text-[#585858]"
            />
            <div className="my-2 border-b-2 border-primary" />
            <p className="text-xs font-normal">
              영문,숫자,한글 2-10글자 이내로 입력해주세요
            </p>
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

export default NicknameStep;
