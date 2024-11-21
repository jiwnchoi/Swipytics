import { vegaLite } from "vega-embed";
import { type Config, type TopLevelSpec } from "vega-lite";
import { isArgmaxDef, isArgminDef } from "vega-lite/build/src/aggregate";
import { isBinning } from "vega-lite/build/src/bin";
import type { FieldDefBase } from "vega-lite/build/src/channeldef";
import {
  getTimeUnitParts,
  isBinnedTimeUnit,
  normalizeTimeUnit,
} from "vega-lite/build/src/timeunit";

const koreanAggregateTerms: Record<string, string> = {
  count: "항목 수",
  sum: "합",
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

function containsKorean(text: string) {
  const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
  return koreanRegex.test(text);
}
export default function getKoreanVegaLite(vlSpec: TopLevelSpec) {
  return vegaLite.compile(vlSpec, {
    config: {
      axis: {
        labelExpr: `
      isValid(datum.value) && isNumber(datum.value) ? (
      datum.value == 0 ? '0' :
      datum.value >= 1e15 ? format(datum.value/1e15, ',.1f') + '천조' :
      datum.value >= 1e14 ? format(datum.value/1e14, ',.1f') + '백조' :
      datum.value >= 1e13 ? format(datum.value/1e13, ',.1f') + '십조' :
      datum.value >= 1e12 ? format(datum.value/1e12, ',.1f') + '조' :
      datum.value >= 1e11 ? format(datum.value/1e11, ',.1f') + '천억' :
      datum.value >= 1e10 ? format(datum.value/1e10, ',.1f') + '백억' :
      datum.value >= 1e9 ? format(datum.value/1e9, ',.1f') + '십억' :
      datum.value >= 1e8 ? format(datum.value/1e8, ',.1f') + '억' :
      datum.value >= 1e7 ? format(datum.value/1e7, ',.1f') + '천만' :
      datum.value >= 1e6 ? format(datum.value/1e6, ',.1f') + '백만' :
      datum.value >= 1e5 ? format(datum.value/1e5, ',.1f') + '십만' :
      datum.value >= 1e4 ? format(datum.value/1e4, ',.1f') + '만' :
      datum.value >= 1e3 ? format(datum.value/1e3, ',.1f') + '천' :
      format(datum.value, ',.0f')
    ) : datum.label
     `,
      },
    },
    fieldTitle: (fieldDef: FieldDefBase<string>, config: Config) => {
      const { field, aggregate, timeUnit, bin } = fieldDef;
      if (aggregate === "count") {
        return config.countTitle && containsKorean(config.countTitle)
          ? config.countTitle
          : getKorean("count");
      } else if (bin && isBinning(bin)) {
        return `${field} (구간화)`;
      } else if (timeUnit && !isBinnedTimeUnit(timeUnit)) {
        const unit = normalizeTimeUnit(timeUnit)?.unit;
        if (unit) {
          return `${field} (${getTimeUnitParts(unit).map(getKorean).join(" ")})`;
        }
      } else if (aggregate) {
        if (isArgmaxDef(aggregate)) {
          return `${aggregate.argmax}가 최대일 때의 ${field}`;
        } else if (isArgminDef(aggregate)) {
          return `${aggregate.argmin}가 최소일 때의 ${field}`;
        } else {
          return `${field}의 ${getKorean(aggregate)}`;
        }
      }
      return String(field);
    },
  }).spec;
}
