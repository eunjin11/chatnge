const chatReport = {
  week: "2025년 5월 11일 ~ 17일",
  positive: 65,
  positiveDiff: 10,
  negative: 25,
  negativeDiff: -5,
  totalChats: 12,
  avgLength: 5,
};

const MindReport = () => {
  return (
    <div className="mb-6">
      <div className="text-xs text-gray-400 mb-1">대화 분석 마인드 리포트</div>
      <div className="text-xs text-gray-400 mb-2">WEEK | {chatReport.week}</div>
      <div className="flex gap-2 mb-2 border border-primary rounded-xl">
        <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
          <div className="text-primary text-2xl font-bold">
            {chatReport.positive}%
          </div>
          <div className="text-xs text-gray-500">긍정 표현</div>
          <div className="text-xs text-primary mt-1">
            +{chatReport.positiveDiff}%
          </div>
        </div>
        <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
          <div className="text-primary text-2xl font-bold">
            {chatReport.negative}%
          </div>
          <div className="text-xs text-gray-500">부정 표현</div>
          <div className="text-xs text-primary mt-1">
            {chatReport.negativeDiff}%
          </div>
        </div>
        <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
          <div className="text-primary text-base font-bold">
            총 {chatReport.totalChats}회
          </div>
          <div className="text-xs text-gray-500">대화 횟수</div>
          <div className="text-xs text-gray-500 mt-1">
            평균 {chatReport.avgLength}문장
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindReport;
