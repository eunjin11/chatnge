"use client";
import { Button } from "@/components/ui/button";
import { EmotionResponse } from "@/constants/types";
import { useRouter } from "next/navigation";

interface MindReportProps {
  emotionRecord: EmotionResponse;
}

const MindReport = ({ emotionRecord }: MindReportProps) => {
  const router = useRouter();
  // Format date for display
  const formatDate = (date: Date | string) => {
    if (typeof date === "string") {
      date = new Date(date);
    }
    return date.toISOString().split("T")[0].replace(/-/g, ".");
  };

  return (
    <div className="h-screen bg-primary relative overflow-hidden">
      {/* Main content */}
      <div className="flex flex-col items-center pt-12 px-6">
        {/* Header text similar to the image */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">김이터님의</h1>
          <p className="text-xl font-bold text-white mt-1">
            마인드리포트가 완성!
          </p>
          <p className="text-sm text-white mt-1">
            오늘 하루, 이렇게 정리해봤어요
          </p>
        </div>

        {/* Date display */}
        <div className="text-center my-4 bg-white rounded-full px-4 py-1 shadow-md">
          <p className="text-sm text-gray-700">
            {formatDate(emotionRecord.date)}
          </p>
        </div>

        {/* Emotion card */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{emotionRecord.emotion}</h2>
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl">😐</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {emotionRecord.detailedEmotions.map((emotion, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded-full text-sm"
              >
                #{emotion}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              {emotionRecord.oneLineRecord}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-700">{emotionRecord.aiSummary}</p>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/diary`)}
          className="bg-white text-primary w-full m-10"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default MindReport;
