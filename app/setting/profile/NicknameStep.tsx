"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import FormButton from "@/components/form/FormButton";

type NicknameStepProps = {
  onNext: () => void;
};

const NicknameStep = ({ onNext }: NicknameStepProps) => {
  const [nickname, setNickname] = useState("");

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <div className="bg-primary p-6 pb-12">
          <h2 className="text-white text-2xl font-bold mt-16 mb-4">
            챗인지를 위한 첫 대화,
            <br />
            나를 소개해요
          </h2>

          <div className="bg-primary border-white border-2 rounded-full px-2 inline-block mb-1">
            <span className="text-white text-xs">1/4</span>
          </div>

          <div className="mt-4 mx-auto bg-white rounded-lg border-none h-12">
            <p className="my-auto mx-auto text-[#1E1E1E]">
              어떤 이름으로 불러드릴까요?
            </p>
          </div>

          <p className="text-white text-xs mt-2 mx-auto">
            이 닉네임은 챗인지에서 당신을 부를 소중한 이름이 될 거예요.
          </p>
        </div>
        <Input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          className="my-3 mx-auto w-[250px] text-sm h-[50px] border-[#D9D9D9] border-[1px] rounded-[14px] focus:border-primary focus-visible:ring-0"
        />
        <div className="flex-grow"></div>
        <FormButton type="button" text="다음" isValid={false} />
      </div>
    </div>
  );
};

export default NicknameStep;
