import React from "react";
import Image from "next/image";

const MonthResolution = () => {
  return (
    <>
      <div className="text-primary my-2 text-xs font-bold flex items-center space-x-1">
        <div>이번 달 다짐</div>
        <Image src="/Edit.svg" alt="edit" width={12} height={12} />
      </div>
      <h1 className="text-xl font-bold mb-4">프로젝트 무사히 끝내기!</h1>
    </>
  );
};

export default MonthResolution;
