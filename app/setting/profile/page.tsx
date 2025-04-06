"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
//import { updateProfile } from "@/app/api/fetchAuth";
import NicknameStep from "./NicknameStep";
import BirthDateStep from "./BirthDateStep";
import MotivationStep from "./MotivationStep";
import MedicationStatusStep from "./MedicationStatusStep";
import ConfirmStep from "./ConfirmStep";

//type MedicationStatus = "YES" | "NO" | "UNKNOWN";

const ProfileSettingPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<
    "닉네임" | "생일" | "계기" | "복용 여부" | "확인"
  >("닉네임");

  // const [registerData, setRegisterData] = useState<{
  //   nickname: string;
  //   birthdate: string;
  //   motivation: string[];
  //   medicationStatus: MedicationStatus;
  // }>({
  //   nickname: "",
  //   birthdate: "",
  //   motivation: [],
  //   medicationStatus: "UNKNOWN",
  // });

  // const handleProfileUpdate = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const result = await updateProfile({
  //       nickname: registerData.nickname,
  //       birthdate: registerData.birthdate
  //         ? new Date(registerData.birthdate)
  //         : new Date(),
  //       motivation: registerData.motivation,
  //       medicationStatus: registerData.medicationStatus,
  //     });

  //     if (result.error) {
  //       setError(result.error);
  //       return;
  //     }
  //     console.log(result);
  //     // 프로필 업데이트 성공 시 메인 페이지로 이동
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Profile update error:", error);
  //     setError("프로필 업데이트 중 오류가 발생했습니다.");
  //   }
  // };

  return (
    <>
      <Header title="프로필" />
      {step === "닉네임" && <NicknameStep onNext={() => setStep("생일")} />}
      {step === "생일" && <BirthDateStep onNext={() => setStep("계기")} />}
      {step === "계기" && (
        <MotivationStep onNext={() => setStep("복용 여부")} />
      )}
      {step === "복용 여부" && (
        <MedicationStatusStep onNext={() => setStep("확인")} />
      )}
      {step === "확인" && <ConfirmStep onNext={() => router.push("/")} />}
    </>
  );
};

export default ProfileSettingPage;
