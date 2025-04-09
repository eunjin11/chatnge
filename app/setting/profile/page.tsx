"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import NicknameStep from "./NicknameStep";
import BirthDateStep from "./BirthDateStep";
import MotivationStep from "./MotivationStep";
import MedicationStatusStep from "./MedicationStatusStep";
import ConfirmStep from "./ConfirmStep";
import { updateProfile } from "@/app/api/fetchAuth";
import { MedicationStatus, ProfileUpdateData } from "@/constants/types";

const ProfileSettingPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<
    "닉네임" | "생일" | "계기" | "복용 여부" | "확인"
  >("닉네임");

  const [registerData, setRegisterData] = useState<ProfileUpdateData>({
    nickname: "",
    birthdate: new Date(),
    motivation: [],
    medicationStatus: "UNKNOWN",
  });

  const updateNickname = async (nickname: string) => {
    setRegisterData((prev) => ({ ...prev, nickname }));
    setStep("생일");
  };

  const updateBirthdate = async (birthdate: string) => {
    const newBirthdate = isNaN(new Date(birthdate).getTime())
      ? new Date()
      : new Date(birthdate);
    setRegisterData((prev) => ({ ...prev, newBirthdate }));
    setStep("계기");
  };

  const updateMotivation = async (motivation: string[]) => {
    setRegisterData((prev) => ({ ...prev, motivation }));
    setStep("복용 여부");
  };

  const updateMedicationStatus = async (medicationStatus: MedicationStatus) => {
    setRegisterData((prev) => ({ ...prev, medicationStatus }));
    setStep("확인");
  };

  const handleProfileUpdate = async () => {
    try {
      const result = await updateProfile({
        nickname: registerData.nickname,
        birthdate: registerData.birthdate ? registerData.birthdate : new Date(),
        motivation: registerData.motivation,
        medicationStatus: registerData.medicationStatus,
      });

      if (result.error) {
        console.error("Profile update error:", result.error);
        return;
      }
      console.log(result);
      router.push("/");
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  return (
    <>
      <Header title="프로필" />
      {step === "닉네임" && (
        <NicknameStep onNext={(nickname: string) => updateNickname(nickname)} />
      )}
      {step === "생일" && (
        <BirthDateStep
          onNext={(birthdate: string) => updateBirthdate(birthdate)}
        />
      )}
      {step === "계기" && (
        <MotivationStep onNext={() => setStep("복용 여부")} />
      )}
      {step === "복용 여부" && (
        <MedicationStatusStep onNext={() => setStep("확인")} />
      )}
      {step === "확인" && <ConfirmStep onNext={() => handleProfileUpdate()} />}
    </>
  );
};

export default ProfileSettingPage;
