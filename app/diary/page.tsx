import BottomNavigation from "@/components/BottomNavigation";
import { getMonthlyEmotionSummary } from "@/services/emotion";
import DiaryClient from "./_component/DiaryClient";

export default async function DiaryPage() {
  const { monthRange, monthData } = await getMonthlyEmotionSummary(new Date());

  if (!monthData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <DiaryClient
        monthRange={`${monthRange.firstDay} - ${monthRange.lastDay}`}
        monthData={monthData}
      />
      <BottomNavigation />
    </>
  );
}
