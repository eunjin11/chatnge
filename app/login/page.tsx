import Image from "next/image";
import Link from "next/link";
import { PasswordInput } from "./PasswordInput";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center">
          <Image src="/Logo.png" alt="챗인지 로고" width={60} height={60} />
        </div>
        <h1 className="text-center text-lg font-medium mb-6">
          '챗인지'는 로그인 후 이용 가능합니다.
        </h1>

        <div className="space-y-3">
          <div className="bg-gray-100 rounded-lg p-3">
            <input
              type="text"
              className="bg-transparent w-full outline-none text-sm"
              placeholder="아이디를 입력해주세요"
            />
          </div>
          <PasswordInput />
          <button className="w-full bg-teal-400 text-white rounded-lg p-3 mt-4">
            로그인
          </button>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
            <Link href="/forgot-password" className="hover:underline">
              비밀번호 찾기
            </Link>
            <div className="w-px bg-gray-300"></div>
            <Link href="/signup" className="hover:underline">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
