import { Text, type TextProps } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { type TChart } from "@shared/models";
import { josa } from "es-hangul";
import { useTranslation } from "react-i18next";
interface ChartTitleProps extends TextProps {
  chart: TChart;
}

function getOnlyKorean(text: string) {
  return text.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
}

export default function ChartTitle({ chart, ...props }: ChartTitleProps) {
  const fields = chart.fields;
  const { accentSelectedHover } = useLayout();
  const { i18n } = useTranslation();
  return (
    <Text as="p" fontSize={"md"} {...props}>
      <Text as={"span"} fontWeight={600} color={accentSelectedHover}>
        {fields[0].name}
      </Text>
      {fields.length > 1 && (
        <Text as={"span"} fontWeight={400}>
          {i18n.language === "ko"
            ? `${josa.pick(getOnlyKorean(fields[0].name), "와/과")} `
            : " and "}
        </Text>
      )}
      {fields.length > 1 && (
        <Text as={"span"} fontWeight={600} color={accentSelectedHover}>
          {fields[1].name}
        </Text>
      )}
      {fields.length > 2 && (
        <>
          <Text as={"span"} fontWeight={400}>
            {i18n.language === "ko" ? `, ` : `, colored by `}
          </Text>
          <Text as={"span"} fontWeight={600} color={accentSelectedHover}>
            {fields[2].name}
          </Text>
          <Text as={"span"} fontWeight={400}>
            {i18n.language === "ko" ? `에 따라 색칠` : ``}
          </Text>
        </>
      )}
    </Text>
  );
}
