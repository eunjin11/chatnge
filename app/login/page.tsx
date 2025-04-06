"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import { login } from "@/app/api/fetchAuth";
import Link from "next/link";
import FormInput from "@/components/form/FormInput";
import FormButton from "@/components/form/FormButton";

const loginFormSchema = z.object({
  email: z.string().min(1, { message: "" }),
  password: z.string().min(1, { message: "" }),
});

type FormValues = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState, handleSubmit } = methods;

  const onSubmit = async (values: FormValues) => {
    setError("");

    try {
      console.log(values);
      const result = await login(values.email, values.password);
      console.log(result);

      if (result.error) {
        console.log(result.error);
        setError(`*${result.error}`);
        return;
      }
      router.push("/");
    } catch (error) {
      setError(`*${error}`);
    }
  };

  const isFormValid = formState.isValid;

  return (
    <div className="min-h-screen px-4 bg-white">
      <Header title="로그인" />

      <div className="pt-20 py-3 max-w-sm mt-10 mx-auto">
        <Image
          src="/Logo.png"
          alt="챗인지 로고"
          width={60}
          height={60}
          className="mx-auto"
        />
        <h1 className="text-center text-lg font-medium my-6">
          챗인지는 로그인 후 이용 가능합니다.
        </h1>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <FormInput
              name="email"
              type="string"
              placeholder="이메일을 입력해주세요"
            />
            <FormInput
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <div className="text-red-500 text-xs h-6">{error}</div>
            <FormButton isValid={isFormValid} text="로그인" />
          </form>
        </FormProvider>

        <div className="mt-4 text-center">
          <Link
            href="/signup"
            className="text-sm text-[#585858] hover:text-[#36D0D3]"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
