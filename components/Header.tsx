"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  title: string;
  subHeader?: React.ReactNode;
}

const Header = ({ title, subHeader }: HeaderProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      {subHeader && <div>{subHeader}</div>}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-[0px_2px_2px_0px_rgba(204,204,204,0.25)] p-4 max-w-md mx-auto">
        <div className="flex items-center align-middle justify-between">
          <button
            className="text-[#5F6368] h-[35px] w-[35px]"
            onClick={handleGoBack}
          >
            <Image src="/BackArrow.svg" alt="back" width={13} height={23} />
          </button>
          <h1 className="text-lg font-normal text-black flex items-center">
            {title}
          </h1>
          <div className="w-8" />
        </div>
      </div>
    </>
  );
};

export default Header;
