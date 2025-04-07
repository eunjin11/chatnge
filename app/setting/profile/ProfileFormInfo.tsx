import React from "react";

type ProfileFormInfoProps = {
  step: string;
  subTitle: string;
  text: string;
};

function ProfileFormInfo({ step, subTitle, text }: ProfileFormInfoProps) {
  return (
    <div className="p-6 pt-20 pb-4">
      <div className="bg-[#86e3e5] border-primary border-2 rounded-full px-2 inline-block mb-1">
        <span className="text-white text-xs">{step}</span>
      </div>
      <h2 className="text-white text-2xl font-bold mt-2 mb-4">
        챗인지를 위한 첫 대화,
        <br />
        나를 소개해요
      </h2>

      <div className="mt-2 mb-2">
        <div className="bg-white text-gray-800 px-4 py-2 rounded-[10px] inline-block max-w-xs">
          {subTitle}
        </div>
      </div>
      <div className="mt-20">
        <p className="text-sm text-white text-center">{text}</p>
      </div>
    </div>
  );
}

export default ProfileFormInfo;
