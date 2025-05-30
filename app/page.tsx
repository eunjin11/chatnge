import MainClient from "@/app/_component/MainClient";
import BottomNavigation from "@/components/BottomNavigation";
import { getWeeklyEmotionSummary } from "@/services/emotion";

export default async function MainPage() {
  const { weekRange, weekData } = await getWeeklyEmotionSummary(new Date());

  return (
    <>
      <MainClient
        weekRange={`${weekRange.sunday} - ${weekRange.saturday}`}
        weekData={weekData}
      />
      <BottomNavigation />
    </>
  );
}
