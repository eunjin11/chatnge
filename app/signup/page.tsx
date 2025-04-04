"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { checkDuplicateEmail, signup } from "../api/fetchAuth";

const SignUpPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCheckDuplicate = async () => {
    const isDuplicate = await checkDuplicateEmail(email);
    if (isDuplicate) {
      console.log("이미 존재하는 이메일입니다.");
    } else {
      console.log("사용 가능한 이메일입니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signup(email, name, password);

      if (result.error) {
        alert(result.error);
        return;
      }

      // 회원가입 및 자동 로그인 성공 시 메인 페이지로 이동
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="회원가입" />

      <div className="pt-20 px-6">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-[#36D0D3] mb-2">정보 입력</h2>
          <p className="text-sm text-[#585858] font-light mb-8">
            서비스 이용을 위해, 필수 정보를 입력해주세요
          </p>

          <form onSubmit={handleSubmit}>
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
                  required
                  className="flex-1 px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
                />
                <button
                  type="button"
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
                required
                className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-base font-medium text-[#585858] mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력해주세요"
                required
                className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#36D0D3] text-white font-bold py-4 rounded-lg mt-8"
            >
              다음
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
