export type ProfileUpdateStep =
  | "닉네임"
  | "생일"
  | "상태"
  | "계기"
  | "복용 여부"
  | "확인";

export type SignUpStep = "정보 입력" | "비밀번호 입력";

export type MedicationStatus = "YES" | "NO" | "UNKNOWN";

export enum EmotionSelectiomStep {
  SELECTING_EMOTION = "SELECTING_EMOTION",
  SELECTING_DETAIL = "SELECTING_DETAIL",
  SELECTING_FEELING = "SELECTING_FEELING",
  SELECTING_DETAILED_EMOTIONS = "SELECTING_DETAILED_EMOTIONS",
  INPUT_ONE_LINE_RECORD = "INPUT_ONE_LINE_RECORD",
  MIND_REPORT = "MIND_REPORT",
}

export interface ProfileUpdateData {
  nickname: string;
  birthdate: Date;
  status: string;
  motivation: string[];
  medicationStatus: MedicationStatus;
}

export interface UserData {
  email: string;
  name: string;
}

export interface UserResponse {
  user?: UserData;
  error?: string;
}

export interface Profile {
  email: string;
  name: string;
  nickname: string | null;
  birthdate: Date;
  status: string | null;
  motivation: string[];
  medicationStatus: string;
}

export interface ProfileResponse {
  user?: Profile;
  error?: string;
}

export type DetailedEmotion =
  | "joy"
  | "calm"
  | "depression"
  | "anxiety"
  | "anger"
  | "fatigue"
  | "mixed";

export interface DetailedFeeling {
  text: string;
  emotion: DetailedEmotion;
}

export interface EmotionData {
  emotion: string;
  date: Date;
  reason: string;
  feeling: string;
  detailedEmotions: string[];
  oneLineRecord: string;
  aiSummary?: string;
}

export interface EmotionResponse {
  id: number;
  emotion: string;
  date: Date;
  reason: string | null;
  feeling: string | null;
  detailedEmotions: string[];
  oneLineRecord?: string | null;
  aiSummary?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
