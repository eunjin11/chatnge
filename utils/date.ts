import { WEEK_DAYS } from "@/constants/week";
import { formatDateMMDD, formatDateYYYYMMDD } from "./formatDate";
import { WeeklyEmotionItem, EmotionRecord } from "@/types/emotion.dto";

export function getStartAndEndOfDay(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function calculateWeekDates(currentDate: Date) {
  const day = currentDate.getDay(); // 0 = Sunday

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - day);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
}

export function generateWeekData(
  startDate: Date,
  records: EmotionRecord[] = []
): WeeklyEmotionItem[] {
  return Array.from({ length: 7 }).map((_, i) => {
    const dateObj = new Date(startDate);
    dateObj.setDate(startDate.getDate() + i);
    const dateKey = formatDateYYYYMMDD(dateObj);

    const record = records.find((r) => formatDateYYYYMMDD(r.date) === dateKey);

    return {
      dayOfWeek: WEEK_DAYS[i],
      date: formatDateMMDD(dateObj),
      fullDate: formatDateYYYYMMDD(dateObj),
      emotion: record?.emotion || null,
    };
  });
}
