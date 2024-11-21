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
import { getKorean } from "./koSpecLocale";

function containsKorean(text: string) {
  const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
  return koreanRegex.test(text);
}
export function compileWithKoreanTitle(vlSpec: TopLevelSpec) {
  return vegaLite.compile(vlSpec, {
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
          return `${field}의 ${getKorean(aggregate)}값`;
        }
      }
      return String(field);
    },
  }).spec;
}
