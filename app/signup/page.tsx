"use client";
import React, { useState } from "react";
import Header from "@/components/Header";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCheckDuplicate = () => {
    console.log("Checking duplicate email:", email);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="회원가입" />

      <div className="pt-20 px-6">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-black mb-2">정보 입력</h2>
          <p className="text-sm text-[#585858] font-light mb-8">
            서비스 이용을 위해, 가입자님의 정보를 입력해주세요
          </p>
          <div className="mb-6">
            <label className="block text-base font-medium text-[#585858] mb-2">
              이메일
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력해주세요"
                className="flex-1 px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
              />
              <button
                onClick={handleCheckDuplicate}
                className="bg-[#36D0D3] text-white text-xs font-medium px-4 py-1 rounded-md whitespace-nowrap"
              >
                중복확인
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-base font-medium text-[#585858] mb-2">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력해주세요"
              className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
            />
          </div>
          <button className="w-full bg-[#36D0D3] text-white font-bold py-4 rounded-lg mt-8">
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
