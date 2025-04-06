import React, { useState } from "react";
import { checkDuplicateEmail } from "../api/fetchAuth";
import FormButton from "@/components/form/FormButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InfoStepProps = {
  onNext: (email: string, name: string) => void;
};

const InfoStepSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z.string().email({ message: "이메일 양식을 확인해주세요." }),
});

type FormValues = z.infer<typeof InfoStepSchema>;

function InfoStep({ onNext }: InfoStepProps) {
  const [checkEmail, setCheckEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const methods = useForm<FormValues>({
    resolver: zodResolver(InfoStepSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { formState, handleSubmit, register } = methods;

  const onSubmit = async (values: FormValues) => {
    console.log(values.email, values.name);
    setError("");
    if (checkEmail) {
      onNext(values.email, values.name);
    } else {
      setError("이메일을 확인해주세요.");
    }
  };

  const handleCheckDuplicate = async () => {
    const isDuplicate = await checkDuplicateEmail(email);
    if (isDuplicate) {
      setCheckEmail(false);
      setError("중복된 이메일입니다.");
    } else {
      setCheckEmail(true);
      setError("");
    }
  };

  return (
    <div className="pt-20 px-6">
      <div className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-[#36D0D3] mb-1">정보 입력</h2>
        <p className="text-sm text-[#585858] mb-8">
          서비스 이용을 위해, 가입자님의의 정보를 입력해주세요
        </p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="mb-6">
              <Label className="block text-base font-medium text-[#585858] mb-2">
                이름
              </Label>
              <FormInput
                name="name"
                type="text"
                placeholder="이름을 입력해주세요"
              />
            </div>
            {formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {formState.errors.name?.message}
              </p>
            )}
            <div className="mb-6">
              <div className="flex justify-between">
                <Label className="block text-base font-medium text-[#585858] my-auto">
                  이메일
                </Label>
                <Button
                  type="button"
                  onClick={handleCheckDuplicate}
                  className="bg-primary text-white text-xs px-2 h-[25px] m-2 rounded-[6px] whitespace-nowrap"
                >
                  중복확인
                </Button>
              </div>
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm h-[50px] shadow-none border-[#D9D9D9] border-[1px] rounded-[14px] focus:border-primary focus-visible:ring-0"
              />
              {formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formState.errors.email?.message}
                </p>
              )}
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <FormButton type="submit" text="다음" isValid={checkEmail} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default InfoStep;
