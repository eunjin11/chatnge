export interface WeeklyEmotionItem {
  dayOfWeek: string; // ex: '월'
  date: string; // ex: '04.29'
  fullDate: string; // ex: '2024-04-29'
  emotion: string | null;
}

export interface WeeklyEmotionSummary {
  weekRange: {
    sunday: string; // ex: '04.27'
    saturday: string; // ex: '05.03'
  };
  weekData: WeeklyEmotionItem[];
}
