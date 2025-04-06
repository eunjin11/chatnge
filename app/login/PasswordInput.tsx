"use client";

import Image from "next/image";
import { useState } from "react";

export const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="bg-gray-100 rounded-lg p-3 flex justify-between items-center">
      <input
        type={showPassword ? "text" : "password"}
        className="bg-transparent w-full outline-none text-sm"
        placeholder="비밀번호를 입력해주세요"
      />
      <button
        onClick={togglePasswordVisibility}
        className="flex items-center justify-center"
        type="button"
        aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
      >
        <Image
          src={showPassword ? "/eye_slash.svg" : "/eye.svg"}
          alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          width={20}
          height={20}
          className="text-gray-400"
        />
      </button>
    </div>
  );
};
