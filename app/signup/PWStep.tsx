import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type PWStepProps = {
  onNext: (password: string) => void;
};

const PWStepSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "*영문과 숫자를 포함한 8글자 이상이여야 해요" })
      .regex(/[a-zA-Z]/, "*영문자를 포함해야 합니다.")
      .regex(/[0-9]/, "*숫자를 포함해야 합니다."),
    passwordCheck: z
      .string()
      .min(8, { message: "*비밀번호가 일치하지 않아요" }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "*비밀번호가 일치하지 않아요",
    path: ["passwordCheck"],
  });

type FormValues = z.infer<typeof PWStepSchema>;

function PWStep({ onNext }: PWStepProps) {
  const [isValid, setIsValid] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(PWStepSchema),
    defaultValues: {
      password: "",
      passwordCheck: "",
    },
  });

  const { formState, handleSubmit, watch } = methods;

  const password = watch("password");
  const passwordCheck = watch("passwordCheck");

  useEffect(() => {
    if (password.length >= 1 && passwordCheck.length >= 1) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, passwordCheck]);

  const onSubmit = async (values: FormValues) => {
    console.log(values.password, values.passwordCheck);
    if (values.password) {
      onNext(values.password);
    }
  };

  return (
    <div className="pt-20 px-6">
      <div className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-[#36D0D3] mb-1">비밀번호 입력</h2>
        <p className="text-sm text-[#585858] mb-8">
          안전한 사용을 위해 비밀번호를 입력해주세요
        </p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="mb-6">
              <Label className="block text-base font-medium text-[#585858] mb-2">
                비밀번호
              </Label>
              <FormInput name="password" type="password" />
              <div className="text-red-500 text-xs h-4">
                {formState.errors.password?.message}
              </div>
            </div>
            <div className="mb-6">
              <Label className="block text-base font-medium text-[#585858] mb-2">
                비밀번호 확인
              </Label>
              <FormInput name="passwordCheck" type="password" />
              <div className="text-red-500 text-xs h-4">
                {formState.errors.passwordCheck?.message}
              </div>
            </div>
            <FormButton type="submit" text="가입하기" isValid={isValid} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default PWStep;
