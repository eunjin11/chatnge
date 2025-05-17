import { getWeeklyEmotionSummary } from "../../services/emotion";
import DiaryClient from "./_component/DiaryClient";

export default async function DiaryPage() {
  const { weekRange, weekData } = await getWeeklyEmotionSummary(new Date());

  return (
    <DiaryClient
      weekRange={`${weekRange.sunday} - ${weekRange.saturday}`}
      weekData={weekData}
    />
  );
}
