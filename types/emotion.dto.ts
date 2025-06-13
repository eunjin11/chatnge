export interface EmotionRecord {
  date: Date;
  emotion: string | null;
}

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

export interface MonthlyEmotionItem {
  day: string; // ex: '01'
  fullDate: string; // ex: '2024-04-01'
  emotion: string | null;
}

export interface MonthlyEmotionSummary {
  monthRange: {
    firstDay: string; // ex: '04.01'
    lastDay: string; // ex: '04.30'
  };
  monthData: MonthlyEmotionItem[];
}
