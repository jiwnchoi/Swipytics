export const koreanLocaleConfig = {
  number: {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["₩", ""],
  },
  time: {
    dateTime: "%Y년 %m월 %d일 %A %X",
    date: "%Y년 %m월 %d일",
    time: "%H시 %M분 %S초",
    periods: ["오전", "오후"],
    days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    shortDays: ["일", "월", "화", "수", "목", "금", "토"],
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    shortMonths: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
  },
};

const koreanAggregateTerms: Record<string, string> = {
  count: "항목 수",
  sum: "합계",
  mean: "평균",
  average: "평균",
  median: "중앙값",
  min: "최소값",
  max: "최대값",
  variance: "분산",
  stdev: "표준편차",
  first: "첫번째",
  last: "마지막",
  ci0: "신뢰구간 하한",
  ci1: "신뢰구간 상한",
  missing: "결측값",
  valid: "유효값",
  distinct: "고유값",
};

const koreanTimeUnits: Record<string, string> = {
  year: "년",
  quarter: "분기",
  month: "월",
  week: "주",
  day: "일",
  date: "일",
  hours: "시",
  minutes: "분",
  seconds: "초",
  milliseconds: "밀리초",
  yearquarter: "년분기",
  yearquartermonth: "년분기월",
  yearmonth: "년월",
  yearmonthdate: "년월일",
  yearmonthdatehours: "년월일시",
  yearmonthdatehoursminutes: "년월일시분",
  yearmonthdatehoursminutesseconds: "년월일시분초",
  monthdate: "월일",
  hoursminutes: "시분",
  hoursminutesseconds: "시분초",
  minutesseconds: "분초",
  secondsmilliseconds: "초밀리초",
};

export function getKorean(word: string) {
  return koreanAggregateTerms[word] || koreanTimeUnits[word] || word;
}
