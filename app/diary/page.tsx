import BottomNavigation from "@/components/BottomNavigation";
import { getMonthlyEmotionSummary } from "@/services/emotion";
import DiaryClient from "./_component/DiaryClient";

export default async function DiaryPage() {
  const { monthRange, monthData } = await getMonthlyEmotionSummary(new Date());

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
