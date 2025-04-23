import { DetailedFeeling } from "./types";

export const EmotionSelection = [
  {
    id: 1,
    text: "매우 좋아요",
    emoji: "😊",
    details: [
      "친구랑 너무 즐거운 시간을 보냈어요",
      "좋은 일이 연달아 생겼어요",
      "하고 싶은 걸 마음껏 했어요",
      "기대했던 일이 잘 풀렸어요",
      "오늘 하루가 그냥 완벽했어요",
      "🖊️ 직접 쓸래요",
    ],
  },
  {
    id: 2,
    text: "좋아요",
    emoji: "🙂",
    details: [
      "소소하지만 기분 좋은 일이 있었어요",
      "마음이 편안했어요",
      "하고 싶었던 걸 해냈어요",
      "주변 사람들 덕분에 기분이 좋았어요",
      "오늘은 별일 없지만 괜찮았어요",
      "🖊️ 직접 쓸래요",
    ],
  },
  {
    id: 3,
    text: "그저 그래요",
    emoji: "😐",
    details: [
      "별다른 일 없이 지나갔어요",
      "뭔가 애매한 기분이었어요",
      "나쁘진 않은데 딱히 좋지도 않았어요",
      "하루가 너무 빨리 지나갔어요",
      "몸은 괜찮은데 마음이 심심했어요",
      "🖊️ 직접 쓸래요",
    ],
  },
  {
    id: 4,
    text: "속상해요",
    emoji: "😔",
    details: [
      "해야 할 일이 너무 많았어요",
      "몸이 지치고 피곤했어요",
      "마음이 복잡했어요",
      "누군가와의 관계에서 힘들었어요",
      "스스로에게 실망했어요",
      "🖊️ 직접 쓸래요",
    ],
  },
  {
    id: 5,
    text: "힘들어요",
    emoji: "😔",
    details: [
      "친구랑 다퉜어요",
      "혼자 있는 시간이 힘들었어요",
      "기대했던 일이 어긋났어요",
      "내가 뭘 잘못했는지 모르겠어요",
      "작은 말에 상처받았어요",
      "🖊️ 직접 쓸래요",
    ],
  },
];

export const feelingSelections = [
  "하루 종일 비슷했어요",
  "중간에 감정이 바뀌었어요",
  "다양한 감정이 섞였어요",
  "잘 모르겠어요",
];

export const detailedFeelingOptions: DetailedFeeling[] = [
  { text: "기쁨", emotion: "joy" },
  { text: "자신감", emotion: "joy" },
  { text: "설렘", emotion: "joy" },
  { text: "불안", emotion: "anxiety" },
  { text: "걱정", emotion: "anxiety" },
  { text: "차분함", emotion: "calm" },
  { text: "편안함", emotion: "calm" },
  { text: "분노", emotion: "anger" },
  { text: "짜증", emotion: "anger" },
  { text: "피곤함", emotion: "fatigue" },
  { text: "무기력", emotion: "fatigue" },
  { text: "복잡함", emotion: "mixed" },
  { text: "답답", emotion: "mixed" },
  { text: "외로움", emotion: "depression" },
  { text: "슬픔", emotion: "depression" },
];
