"use client";
import React, { useState } from "react";
import Header from "@/components/Header";

type MedicationStatus = "YES" | "NO" | "UNKNOWN";

const ProfileSettingsPage = () => {
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [motivation, setMotivation] = useState("");
  const [medicationStatus, setMedicationStatus] =
    useState<MedicationStatus>("UNKNOWN");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="프로필 설정" />

      <div className="pt-20 px-6">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-[#36D0D3] mb-2">
            추가 정보 입력
          </h2>
          <p className="text-sm text-[#585858] font-light mb-8">
            더 나은 서비스 이용을 위해 추가 정보를 입력해주세요
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-base font-medium text-[#585858] mb-2">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요"
                className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-base font-medium text-[#585858] mb-2">
                생년월일
              </label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
              />
            </div>

            <div className="mb-6">
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
            </div>

            <div className="mb-6">
              <label className="block text-base font-medium text-[#585858] mb-2">
                가입 동기
              </label>
              <textarea
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="가입 동기를 입력해주세요"
                className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3] min-h-[100px] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#36D0D3] text-white font-bold py-4 rounded-lg mt-8"
            >
              완료
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
