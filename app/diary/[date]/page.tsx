"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Search, ChevronRight } from "lucide-react";
import FormButton from "@/components/form/FormButton";
import { createEmotionRecord, getAiSummary } from "@/app/api/fetchEmotion";
import {
  DetailedEmotion,
  DetailedFeeling,
  EmotionResponse,
} from "@/constants/types";
import MindReport from "./MindReport";

// 타입 정의
interface Emotion {
  id: number;
  text: string;
  emoji: string;
  details?: string[];
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  emoji?: string;
}

enum EmotionSelectiomStep {
  SELECTING_EMOTION = "SELECTING_EMOTION",
  SELECTING_DETAIL = "SELECTING_DETAIL",
  SELECTING_FEELING = "SELECTING_FEELING",
  SELECTING_DETAILED_EMOTIONS = "SELECTING_DETAILED_EMOTIONS",
  INPUT_ONE_LINE_RECORD = "INPUT_ONE_LINE_RECORD",
  MIND_REPORT = "MIND_REPORT",
}

const emotionColorVariants: Record<
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

const DiaryDatePage = () => {
  const params = useParams();
  const router = useRouter();
  const { date } = params;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ========== 상태(State) 그룹 ==========
  const [formattedDate, setFormattedDate] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "오늘 하루 어땠나요?",
      isUser: false,
    },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [oneLineRecord, setOneLineRecord] = useState("");
  const [finalEmotionRecord, setFinalEmotionRecord] =
    useState<EmotionResponse | null>(null);
  const [messagesAfterDetailedFeelings, setMessagesAfterDetailedFeelings] =
    useState<Message[]>([]);
  const [selectionStep, setSelectionStep] = useState<EmotionSelectiomStep>(
    EmotionSelectiomStep.SELECTING_EMOTION
  );
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string>();
  const [selectedFeeling, setSelectedFeeling] = useState<string>();
  const [userDetailedFeelings, setUserDetailedFeelings] = useState<
    DetailedFeeling[]
  >([]);

  // 상수 데이터
  const [userEmotions] = useState<Emotion[]>([
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
  ]);

  const feelingSelections = [
    "하루 종일 비슷했어요",
    "중간에 감정이 바뀌었어요",
    "다양한 감정이 섞였어요",
    "잘 모르겠어요",
  ];

  const detailedFeelingOptions: DetailedFeeling[] = [
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

  // ========== 함수 그룹 ==========
  // API 함수
  const saveAiSummaryAndRecord = async () => {
    const summary = await getAiSummary({
      emotion: selectedEmotion?.text || "",
      date: typeof date === "string" ? new Date(date) : new Date(),
      reason: selectedDetail || "",
      feeling: selectedFeeling || "",
      detailedEmotions: userDetailedFeelings.map(
        (feeling) => feeling.text || ""
      ),
      oneLineRecord: oneLineRecord,
    });

    const newEmotionRecord = await createEmotionRecord({
      emotion: selectedEmotion?.text || "",
      date: typeof date === "string" ? new Date(date) : new Date(),
      reason: selectedDetail || "",
      feeling: selectedFeeling || "",
      detailedEmotions: userDetailedFeelings.map(
        (feeling) => feeling.text || ""
      ),
      oneLineRecord: oneLineRecord,
      aiSummary: summary,
    });

    setFinalEmotionRecord(newEmotionRecord);
  };

  // 이벤트 핸들러 함수
  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: emotion.text,
        isUser: true,
        emoji: emotion.emoji || "",
      },
      {
        id: Date.now() + 1,
        text: "그렇게 느낀 이유가 있다면,\n들려줄 수 있을까요?",
        isUser: false,
      },
    ]);
    setSelectionStep(EmotionSelectiomStep.SELECTING_DETAIL);
  };

  const handleDetailSelect = (detail: string) => {
    setSelectedDetail(detail);
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: detail,
        isUser: true,
        emoji: "",
      },
      {
        id: Date.now() + 1,
        text: "감정이 계속 이어졌나요,\n아니면 중간에 바뀌었나요?",
        isUser: false,
      },
    ]);
    setSelectionStep(EmotionSelectiomStep.SELECTING_FEELING);
  };

  const handleFeelingSelect = (feeling: string) => {
    setSelectedFeeling(feeling);
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: feeling,
        isUser: true,
        emoji: "",
      },
      {
        id: Date.now() + 1,
        text: "함께 느낀 감정들을 모두 골라볼까요?\n최대 3개까지 선택 가능해요!",
        isUser: false,
      },
      {
        id: Date.now() + 2,
        text: "1개 이상 선택해주세요!",
        isUser: false,
      },
    ]);
    setSelectionStep(EmotionSelectiomStep.SELECTING_DETAILED_EMOTIONS);
  };

  const toggleDetailedFeeling = (feeling: DetailedFeeling) => {
    const isSelected = userDetailedFeelings.some(
      (f) => f.text === feeling.text && f.emotion === feeling.emotion
    );
    if (isSelected) {
      setUserDetailedFeelings((prev) =>
        prev.filter((f) => f.text !== feeling.text)
      );
    } else {
      setUserDetailedFeelings((prev) => [...prev, feeling]);
    }
  };

  const handleInputOneLineRecord = (selection: string) => {
    if (selection === "🖊️ 직접 작성하기") {
      setIsDrawerOpen(true);
    } else {
      goToNextStep();
    }
  };

  const handleSaveOneLineRecord = () => {
    setIsDrawerOpen(false);
    setMessagesAfterDetailedFeelings([
      ...messagesAfterDetailedFeelings,
      {
        id: Date.now(),
        text: oneLineRecord,
        isUser: true,
      },
      {
        id: Date.now() + 1,
        text: "오늘 하루도 고생많았어요!\n오늘의 감정일기를 보여줄게요",
        isUser: false,
      },
    ]);
  };

  // 내비게이션 함수
  const isNextStepEnabled = () => {
    switch (selectionStep) {
      case EmotionSelectiomStep.SELECTING_EMOTION:
        return !!selectedEmotion;
      case EmotionSelectiomStep.SELECTING_DETAIL:
        return !!selectedDetail;
      case EmotionSelectiomStep.SELECTING_FEELING:
        return !!selectedFeeling;
      case EmotionSelectiomStep.SELECTING_DETAILED_EMOTIONS:
        return userDetailedFeelings.length >= 1;
      case EmotionSelectiomStep.INPUT_ONE_LINE_RECORD:
        return true;
      default:
        return false;
    }
  };

  const goToPrevStep = () => {
    switch (selectionStep) {
      case EmotionSelectiomStep.SELECTING_DETAIL:
        setSelectionStep(EmotionSelectiomStep.SELECTING_EMOTION);
        break;
      case EmotionSelectiomStep.SELECTING_FEELING:
        setSelectionStep(EmotionSelectiomStep.SELECTING_DETAIL);
        break;
      case EmotionSelectiomStep.SELECTING_DETAILED_EMOTIONS:
        setSelectionStep(EmotionSelectiomStep.SELECTING_FEELING);
        break;
      case EmotionSelectiomStep.INPUT_ONE_LINE_RECORD:
        setSelectionStep(EmotionSelectiomStep.SELECTING_DETAILED_EMOTIONS);
        break;
      case EmotionSelectiomStep.MIND_REPORT:
        setSelectionStep(EmotionSelectiomStep.INPUT_ONE_LINE_RECORD);
        break;
      default:
        break;
    }
  };

  const goToNextStep = async () => {
    switch (selectionStep) {
      case EmotionSelectiomStep.SELECTING_EMOTION:
        setSelectionStep(EmotionSelectiomStep.SELECTING_DETAIL);
        break;
      case EmotionSelectiomStep.SELECTING_DETAIL:
        setSelectionStep(EmotionSelectiomStep.SELECTING_FEELING);
        break;
      case EmotionSelectiomStep.SELECTING_FEELING:
        setSelectionStep(EmotionSelectiomStep.SELECTING_DETAILED_EMOTIONS);
        break;
      case EmotionSelectiomStep.SELECTING_DETAILED_EMOTIONS:
        setMessagesAfterDetailedFeelings([
          {
            id: 1,
            text: "마지막 질문이에요!\n오늘 하루를 한 줄로 남긴다면?",
            isUser: false,
          },
        ]);
        setSelectionStep(EmotionSelectiomStep.INPUT_ONE_LINE_RECORD);
        break;
      case EmotionSelectiomStep.INPUT_ONE_LINE_RECORD:
        await saveAiSummaryAndRecord();
        setSelectionStep(EmotionSelectiomStep.MIND_REPORT);
        break;
      default:
        break;
    }
  };

  // ========== useEffect 훅 ==========
  // 날짜 포맷팅
  useEffect(() => {
    if (typeof date === "string") {
      // YYYY-MM-DD 형식에서 YYYY년 M월 D일 형식으로 변환
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      setFormattedDate(`${year}년 ${month}월 ${day}일`);
    }
  }, [date]);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로 내리기
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, messagesAfterDetailedFeelings]);

  // ========== 렌더링 로직 ==========
  // MindReport 페이지로 전환
  if (selectionStep === EmotionSelectiomStep.MIND_REPORT && finalEmotionRecord)
    return <MindReport emotionRecord={finalEmotionRecord} />;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 */}
      <header className="flex items-center p-4 border-gray-200 shadow-xs">
        <button onClick={() => router.back()} className="mr-auto">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">감정기록</h1>
        <button className="ml-auto">
          <Search size={24} />
        </button>
      </header>

      {/* 날짜 표시 */}
      <div className="text-center py-4 border-b border-gray-200">
        <p className="text-sm">{formattedDate}</p>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 채팅 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!message.isUser && (
                <div className="chat-bubble chat-bubble-bot">
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              )}

              {message.isUser && (
                <div className="chat-bubble chat-bubble-user">
                  <div className="flex items-center">
                    <p className="text-sm">{message.text}</p>
                    <span className="ml-2 text-sm">{message.emoji}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {selectionStep === EmotionSelectiomStep.INPUT_ONE_LINE_RECORD && (
            <div className="w-full flex justify-end">
              <div className="flex flex-wrap gap-2 w-[90%] justify-end">
                {userDetailedFeelings.map((detailedFeeling, index) => {
                  return (
                    <div
                      key={index}
                      className={`text-sm border border-gray-200 rounded-[15px] rounded-br-none px-4 py-2 shadow-sm ${
                        emotionColorVariants[detailedFeeling.emotion].active
                      }`}
                    >
                      <span>#{detailedFeeling.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {selectionStep === EmotionSelectiomStep.INPUT_ONE_LINE_RECORD && (
            <div>
              {messagesAfterDetailedFeelings.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!message.isUser && (
                    <div className="chat-bubble chat-bubble-bot">
                      <p className="text-sm whitespace-pre-line">
                        {message.text}
                      </p>
                    </div>
                  )}

                  {message.isUser && (
                    <div className="chat-bubble chat-bubble-user">
                      <div className="flex items-center">
                        <p className="text-sm">{message.text}</p>
                        <span className="ml-2 text-sm">{message.emoji}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 사용자 선택 영역 */}
        <div className="p-4 mb-14" ref={chatContainerRef}>
          {selectionStep === EmotionSelectiomStep.SELECTING_EMOTION && (
            <div className="flex flex-col items-end space-y-2">
              {userEmotions.map((emotion) => (
                <button
                  key={emotion.id}
                  onClick={() => handleEmotionSelect(emotion)}
                  className="border border-gray-200 rounded-[15px] rounded-br-none px-4 py-2 shadow-sm"
                >
                  <span className="mr-2 text-sm">{emotion.emoji}</span>
                  <span className="text-sm">{emotion.text}</span>
                </button>
              ))}
            </div>
          )}
          {selectionStep === EmotionSelectiomStep.SELECTING_DETAIL && (
            <div className="flex flex-col items-end space-y-2">
              {selectedEmotion?.details?.map((detail, index) => (
                <button
                  key={index}
                  onClick={() => handleDetailSelect(detail)}
                  className="border border-gray-200 rounded-[15px] rounded-br-none px-4 py-2 shadow-sm"
                >
                  <span className="text-sm">{detail}</span>
                </button>
              ))}
            </div>
          )}
          {selectionStep === EmotionSelectiomStep.SELECTING_FEELING && (
            <div className="flex flex-col items-end space-y-2">
              {feelingSelections.map((feeling, index) => (
                <button
                  key={index}
                  onClick={() => handleFeelingSelect(feeling)}
                  className="border border-gray-200 rounded-[15px] rounded-br-none px-4 py-2 shadow-sm"
                >
                  <span className="text-sm">{feeling}</span>
                </button>
              ))}
            </div>
          )}
          {selectionStep ===
            EmotionSelectiomStep.SELECTING_DETAILED_EMOTIONS && (
            <div className="w-full flex justify-end">
              <div className="flex flex-wrap gap-2 w-[90%] justify-end">
                {detailedFeelingOptions.map((detailedFeeling, index) => {
                  const isSelected = userDetailedFeelings.some(
                    (f) => f.text === detailedFeeling.text
                  );
                  const isMaxSelected = userDetailedFeelings.length >= 3;
                  return (
                    <button
                      key={index}
                      onClick={() => toggleDetailedFeeling(detailedFeeling)}
                      disabled={isMaxSelected && !isSelected}
                      className={`text-sm border border-gray-200 rounded-[15px] px-4 py-2 shadow-sm ${
                        emotionColorVariants[detailedFeeling.emotion].base
                      } ${
                        isSelected
                          ? emotionColorVariants[detailedFeeling.emotion].active
                          : ""
                      } ${
                        isMaxSelected && !isSelected
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <span>#{detailedFeeling.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {selectionStep === EmotionSelectiomStep.INPUT_ONE_LINE_RECORD &&
            oneLineRecord === "" && (
              <div className="flex flex-col items-end space-y-2">
                {["🖊️ 직접 작성하기", "SKIP"].map((selection, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputOneLineRecord(selection)}
                    className="border border-gray-200 rounded-[15px] rounded-br-none px-4 py-2 shadow-sm"
                  >
                    <span className="text-sm">{selection}</span>
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto flex justify-between p-4 rounded-t-[20px] border-t border-gray-200 bg-white shadow-lg">
        <button className="text-primary" onClick={goToPrevStep}>
          <ChevronLeft size={24} />
        </button>
        <button
          className={`text-primary ${
            !isNextStepEnabled() ? "opacity-30 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (isNextStepEnabled()) goToNextStep();
          }}
          disabled={!isNextStepEnabled()}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* 드로어 */}
      {isDrawerOpen && (
        <div
          className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto h-[60%] bg-white shadow-lg p-6 rounded-t-[20px] border-t border-gray-200 transition-transform duration-500 ease-out ${
            isDrawerOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            className="mt-2 text-sm text-gray-500"
            onClick={() => setIsDrawerOpen(false)}
          >
            X
          </button>
          <textarea
            value={oneLineRecord}
            onChange={(e) => setOneLineRecord(e.target.value)}
            placeholder="기분이 복잡했지만 나름 잘 버틴 하루"
            className="w-full mx-auto my-4 border border-primary focus:ring-primary rounded px-3 py-2 text-sm h-[180px] resize-none placeholder:align-top"
          />
          <div className="text-xs text-gray-500 mb-8">
            텍스트 입력은 200자 제한으로 제한돼요!
          </div>
          <FormButton
            isValid={
              oneLineRecord.trim().length > 0 && oneLineRecord.length <= 200
            }
            text={"저장"}
            onClick={handleSaveOneLineRecord}
          />
        </div>
      )}
    </div>
  );
};

export default DiaryDatePage;
