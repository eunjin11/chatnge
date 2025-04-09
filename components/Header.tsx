"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-[0px_2px_2px_0px_rgba(204,204,204,0.25)] p-4">
      <div className="flex items-center justify-between">
        <button className="text-[#5F6368] h-6 w-6" onClick={handleGoBack}>
          <Image src="/BackArrow.svg" alt="back" width={10} height={10} />
        </button>
        <h1 className="text-lg font-normal text-black">{title}</h1>
        <div className="w-8" />
      </div>
    </div>
  );
}

export default Header;
