import { DetailedEmotion } from "./types";

export const emotionColorVariants: Record<
  DetailedEmotion,
  {
    base: string;
    active: string;
  }
> = {
  joy: {
    base: "text-emotion-joy hover:bg-emotion-joy hover:text-white active:bg-emotion-joy active:text-white",
    active: "bg-emotion-joy text-white",
  },
  calm: {
    base: "text-emotion-calm hover:bg-emotion-calm hover:text-white active:bg-emotion-calm active:text-white",
    active: "bg-emotion-calm text-white",
  },
  depression: {
    base: "text-emotion-depression hover:bg-emotion-depression hover:text-white active:bg-emotion-depression active:text-white",
    active: "bg-emotion-depression text-white",
  },
  anxiety: {
    base: "text-emotion-anxiety hover:bg-emotion-anxiety hover:text-white active:bg-emotion-anxiety active:text-white",
    active: "bg-emotion-anxiety text-white",
  },
  anger: {
    base: "text-emotion-anger hover:bg-emotion-anger hover:text-white active:bg-emotion-anger active:text-white",
    active: "bg-emotion-anger text-white",
  },
  fatigue: {
    base: "text-emotion-fatigue hover:bg-emotion-fatigue hover:text-white active:bg-emotion-fatigue active:text-white",
    active: "bg-emotion-fatigue text-white",
  },
  mixed: {
    base: "text-emotion-mixed hover:bg-emotion-mixed hover:text-white active:bg-emotion-mixed active:text-white",
    active: "bg-emotion-mixed text-white",
  },
};
