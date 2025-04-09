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
import {
  MedicationStatus,
  ProfileUpdateData,
  ProfileUpdateStep,
} from "@/constants/types";
import StatusStep from "./StatusStep";

const ProfileSettingPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<ProfileUpdateStep>("닉네임");

  const [registerData, setRegisterData] = useState<ProfileUpdateData>({
    nickname: "",
    birthdate: new Date(),
    status: "",
    motivation: [],
    medicationStatus: "UNKNOWN",
  });

  const updateNickname = async (nickname: string) => {
    setRegisterData((prev) => ({ ...prev, nickname }));
    console.log(registerData);
    setStep("생일");
  };

  const updateBirthdate = async (birthdate: string) => {
    const newBirthdate = isNaN(new Date(birthdate).getTime())
      ? new Date()
      : new Date(birthdate);
    setRegisterData((prev) => ({ ...prev, birthdate: newBirthdate }));
    console.log(registerData);
    setStep("상태");
  };

  const updateStatus = async (status: string) => {
    setRegisterData((prev) => ({ ...prev, status }));
    console.log(registerData);
    setStep("계기");
  };

  const updateMotivation = async (motivation: string[]) => {
    setRegisterData((prev) => ({ ...prev, motivation }));
    console.log(registerData);
    setStep("복용 여부");
  };

  const updateMedicationStatus = async (medicationStatus: MedicationStatus) => {
    setRegisterData((prev) => ({ ...prev, medicationStatus }));
    console.log(registerData);
    setStep("확인");
  };

  const handleProfileUpdate = async () => {
    console.log(registerData);
    try {
      const result = await updateProfile({
        nickname: registerData.nickname,
        birthdate: registerData.birthdate ? registerData.birthdate : new Date(),
        status: registerData.status,
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
      {/* <Header title="프로필" /> */}
      {step === "닉네임" && (
        <NicknameStep onNext={(nickname: string) => updateNickname(nickname)} />
      )}
      {step === "생일" && (
        <BirthDateStep
          onNext={(birthdate: string) => updateBirthdate(birthdate)}
        />
      )}
      {step === "상태" && (
        <StatusStep onNext={(status: string) => updateStatus(status)} />
      )}
      {step === "계기" && (
        <MotivationStep
          onNext={(motivation: string[]) => updateMotivation(motivation)}
        />
      )}
      {step === "복용 여부" && (
        <MedicationStatusStep
          onNext={(medicationStatus: MedicationStatus) =>
            updateMedicationStatus(medicationStatus)
          }
        />
      )}
      {step === "확인" && (
        <ConfirmStep
          profileData={registerData}
          onNext={() => handleProfileUpdate()}
        />
      )}
    </>
  );
};

export default ProfileSettingPage;
