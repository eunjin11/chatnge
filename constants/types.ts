export type PrifleUpdateStep =
  | "닉네임"
  | "생일"
  | "계기"
  | "복용 여부"
  | "확인";

export type SignUpStep = "정보 입력" | "비밀번호 입력";

export type MedicationStatus = "YES" | "NO" | "UNKNOWN";

export interface ProfileUpdateData {
  nickname?: string;
  birthdate?: Date;
  motivation?: string[];
  medicationStatus?: MedicationStatus;
}

export interface UserData {
  email: string;
  name: string;
}

export interface UserResponse {
  user?: UserData;
  error?: string;
}
