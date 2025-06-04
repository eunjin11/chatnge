import React, { useState } from "react";
import { z } from "zod"; // Zod import
import FormButton from "@/components/form/FormButton";
import ProfileFormInfo from "./ProfileFormInfo";

const birthDateSchema = z.object({
  year: z
    .string()
    .min(4, "연도는 4자리여야 합니다.")
    .regex(/^\d{4}$/, "연도는 숫자만 포함해야 합니다."),
  month: z
    .string()
    .min(2, "월은 두 자리가 되어야 합니다.")
    .regex(/^\d{2}$/, "월은 숫자만 포함해야 합니다.")
    .refine((val) => parseInt(val) >= 1 && parseInt(val) <= 12, {
      message: "월은 1에서 12 사이의 값이어야 합니다.",
    }),
  day: z
    .string()
    .min(2, "일은 두 자리가 되어야 합니다.")
    .regex(/^\d{2}$/, "일은 숫자만 포함해야 합니다.")
    .refine((val) => parseInt(val) >= 1 && parseInt(val) <= 31, {
      message: "일은 1에서 31 사이의 값이어야 합니다.",
    }),
});

type BirthdateStepProps = {
  onNext: (birthdate: string) => void;
};

const BirthDateStep = ({ onNext }: BirthdateStepProps) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 추가

  const handleNext = () => {
    try {
      const validated = birthDateSchema.parse({ year, month, day });

      const {
        year: validatedYear,
        month: validatedMonth,
        day: validatedDay,
      } = validated;

      const date = new Date(
        `${validatedYear}-${validatedMonth}-${validatedDay}`
      );
      if (isNaN(date.getTime())) {
        setError("유효한 날짜를 입력해주세요.");
      } else {
        setError(null);
        onNext(`${validatedYear}-${validatedMonth}-${validatedDay}`);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col bg-primary ">
        <ProfileFormInfo
          step="2/5"
          subTitle={"나이를 알려주세요!"}
          text={"입력해주신 정보는 안전하게 보호돼요!"}
        />
        <div className="flex-1 bg-white rounded-t-3xl flex flex-col">
          <div className="flex flex-row p-8 my-4 text-gray-800">
            <div className="flex flex-col">
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
                maxLength={4}
                className="w-full focus:outline-none text-sm font-semibold text-[#585858]"
              />
              <div className="my-2 border-b-2 border-primary" />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="MM"
                maxLength={2}
                className="w-full focus:outline-none text-sm font-semibold text-[#585858]"
              />
              <div className="my-2 border-b-2 border-primary" />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="DD"
                maxLength={2}
                className="w-full focus:outline-none text-sm font-semibold text-[#585858]"
              />
              <div className="my-2 border-b-2 border-primary" />
            </div>
          </div>
          <div className="flex-grow"></div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="px-4 my-8">
            <FormButton
              type="button"
              text="다음"
              isValid={true}
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthDateStep;
