import { Text, type TextProps } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { type TChart } from "@shared/models";

interface ChartTitleProps extends TextProps {
  chart: TChart;
}

export default function ChartTitle({ chart, ...props }: ChartTitleProps) {
  const fields = chart.fields;
  const { accentSelectedHover } = useLayout();
  return (
    <Text as="p" fontSize={"md"} {...props}>
      {/* Check field name is 3, 2, 1 */}
      <Text as={"span"} fontWeight={600} color={accentSelectedHover}>
        {fields[0].name}
      </Text>
      {fields.length > 1 && (
        <Text as={"span"} fontWeight={400}>
          {" and "}
        </Text>
      )}
      {fields.length > 1 && (
        <Text as={"span"} fontWeight={600} color={accentSelectedHover}>
          {fields[1].name}
        </Text>
      )}
      {fields.length > 2 && (
        <Text as={"span"} fontWeight={400}>
          {" colored by "}
        </Text>
      )}
      {fields.length > 2 && (
        <Text as={"span"} fontWeight={600} color={accentSelectedHover}>
          {fields[2].name}
        </Text>
      )}
    </Text>
  );
}
