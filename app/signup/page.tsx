"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { signup } from "../services/auth";
import InfoStep from "./_component/InfoStep";
import PWStep from "./_component/PWStep";
import { SignUpStep } from "@/constants/types";

const SignUpPage = () => {
  const router = useRouter();

  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
  });
  const [step, setStep] = useState<SignUpStep>("정보 입력");

  const handleNextStep = (email: string, name: string) => {
    setRegisterData((prev) => ({ ...prev, email, name }));
    setStep("비밀번호 입력");
    console.log(email, name);
  };

  const handleSignUp = async (password: string) => {
    console.log(registerData, password);
    if (!(registerData.email && registerData.name && password)) {
      setStep("정보 입력");
      return;
    }
    try {
      const response = await signup(
        registerData.email,
        registerData.name,
        password
      );
      console.log(response);
      router.push("/setting/profile");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="회원가입" />
      {step === "정보 입력" && (
        <InfoStep
          onNext={(email: string, name: string) => handleNextStep(email, name)}
        />
      )}
      {step === "비밀번호 입력" && (
        <PWStep
          onNext={(password: string) => {
            handleSignUp(password);
          }}
        />
      )}
    </div>
  );
};

export default SignUpPage;
