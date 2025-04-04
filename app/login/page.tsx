"use client";

import React, { useState } from "react";
import { login } from "@/app/api/fetchAuth";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(email, password);

      if (result.error) {
        setError(result.error);
        return;
      }

      // 로그인 성공 시 메인 페이지로 이동
      router.push("/");
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="로그인" />

      <div className="pt-20 px-6">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-[#36D0D3] mb-2">로그인</h2>
          <p className="text-sm text-[#585858] font-light mb-8">
            서비스 이용을 위해 로그인해 주세요
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-base font-medium text-[#585858] mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                required
                className="w-full px-4 py-3 border-[1.5px] border-[#D9D9D9] rounded-2xl text-sm focus:outline-none focus:border-[#36D0D3]"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#36D0D3] text-white font-bold py-4 rounded-lg"
            >
              로그인
            </button>

            <div className="mt-4 text-center">
              <a
                href="/signup"
                className="text-sm text-[#585858] hover:text-[#36D0D3]"
              >
                아직 회원이 아니신가요? 회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
