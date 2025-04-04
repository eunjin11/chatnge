"use client";
import React, { useState } from "react";
import Header from "@/components/Header";

type MedicationStatus = "YES" | "NO" | "UNKNOWN";

const ProfilePage = () => {
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [motivation, setMotivation] = useState("");
  const [medicationStatus, setMedicationStatus] =
    useState<MedicationStatus>("UNKNOWN");

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  const handleMotivationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivation(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="프로필 설정" />

      <div className="pt-20 px-6">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-[#36D0D3] mb-2">정보 입력</h2>
          <p className="text-sm text-[#585858] font-light mb-8">
            서비스 이용을 위해, 가입자님의 정보를 입력해주세요
          </p>
          <div className="mb-6">
            <label className="block text-base font-medium text-[#585858] mb-2">
              닉네임
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="닉네임을 입력해주세요"
                className="flex-1 px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-base font-medium text-[#585858] mb-2">
              나이
            </label>
            <input
              type="text"
              value={birthdate}
              onChange={handleBirthdateChange}
              placeholder="생년월일을 입력해주세요"
              className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-base font-medium text-[#585858] mb-2">
              가입 계기
            </label>
            <input
              type="text"
              value={motivation}
              onChange={handleMotivationChange}
              placeholder="찾게된 계기를 입력해주세요"
              className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
            />
          </div>
          <label className="block text-base font-medium text-[#585858] mb-2">
            약 복용 여부
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="medicationStatus"
                value="YES"
                checked={medicationStatus === "YES"}
                onChange={(e) =>
                  setMedicationStatus(e.target.value as MedicationStatus)
                }
                className="w-4 h-4 text-[#36D0D3] border-[#D9D9D9] focus:ring-[#36D0D3]"
              />
              <span className="ml-2 text-sm text-[#585858]">예</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="medicationStatus"
                value="NO"
                checked={medicationStatus === "NO"}
                onChange={(e) =>
                  setMedicationStatus(e.target.value as MedicationStatus)
                }
                className="w-4 h-4 text-[#36D0D3] border-[#D9D9D9] focus:ring-[#36D0D3]"
              />
              <span className="ml-2 text-sm text-[#585858]">아니오</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="medicationStatus"
                value="UNKNOWN"
                checked={medicationStatus === "UNKNOWN"}
                onChange={(e) =>
                  setMedicationStatus(e.target.value as MedicationStatus)
                }
                className="w-4 h-4 text-[#36D0D3] border-[#D9D9D9] focus:ring-[#36D0D3]"
              />
              <span className="ml-2 text-sm text-[#585858]">모름</span>
            </label>
          </div>
          <button className="w-full bg-[#36D0D3] text-white font-bold py-4 rounded-lg mt-8">
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
