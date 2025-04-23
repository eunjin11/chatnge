import { EmotionResponse } from "@/constants/types";

interface MindReportProps {
  emotionRecord: EmotionResponse;
}

const MindReport = ({ emotionRecord }: MindReportProps) => {
  return (
    <div className="flex flex-col h-screen bg-primary">
      <div className="flex items-center justify-center bg-white text-lg font-bold rounded-full">
        오늘의 감정 기록
        <h2 className="text-lg font-semibold mb-2">오늘의 감정 요약</h2>
        <p className="text-sm whitespace-pre-line">{emotionRecord.aiSummary}</p>
        <div className="mt-2 text-xs text-gray-500">
          {emotionRecord.date.toString()} - {emotionRecord.emotion}
        </div>
        <div className="mt-2 text-xs text-gray-500">{emotionRecord.reason}</div>
        <div className="mt-2 text-xs text-gray-500">
          {emotionRecord.feeling}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {emotionRecord.oneLineRecord}
        </div>
      </div>
    </div>
  );
};

export default MindReport;
