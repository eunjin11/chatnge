// MM.DD 형식으로 포맷팅
export const formatDateMMDD = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}.${day}`;
};

// YYYY-MM-DD 형식으로 포맷팅
export const formatDateYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// YYYY년 MM월 DD일 형식으로 포맷팅
export function formatKoreanDate(dateString: string): string {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}년 ${month}월 ${day}일`;
}
