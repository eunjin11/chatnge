import Link from "next/link";
import { getCurrentUserProfile } from "../services/user";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default async function ProfilePage() {
  const { user, error } = await getCurrentUserProfile();

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
          <p>{error}</p>
          <Link
            href="/login"
            className="text-sm text-[#585858] hover:text-[#36D0D3]"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="text-sm text-[#585858] hover:text-[#36D0D3]"
          >
            회원가입
          </Link>
        </div>
      </div>
    );

  if (user)
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">내 프로필</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">이메일</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">이름</p>
                <p className="font-medium">{user.name}</p>
              </div>

              {user.nickname && (
                <div>
                  <p className="text-sm text-gray-500">닉네임</p>
                  <p className="font-medium">{user.nickname}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">생년월일</p>
                <p className="font-medium">
                  {formatDate(new Date(user.birthdate))}
                </p>
              </div>

              {user.status && (
                <div>
                  <p className="text-sm text-gray-500">상태</p>
                  <p className="font-medium">{user.status}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">복용 상태</p>
                <p className="font-medium">{user.medicationStatus}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">목적</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.motivation.length > 0 ? (
                    user.motivation.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        #{item}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      설정된 목적이 없습니다
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
