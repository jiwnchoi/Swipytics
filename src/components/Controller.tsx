import { Flex, type FlexProps, Icon, IconButton } from "@chakra-ui/react";
import { useController } from "@hooks";
import { ArrowDown01Icon, ArrowUp01Icon, BookmarkAdd01Icon, Exchange01Icon } from "hugeicons-react";

function Controller(props: FlexProps) {
  const { handleNextChart, handlePrevChart, handleRenewChart, disabled, prevChartDisabled } =
    useController();
  return (
    <Flex {...props}>
      {[
        {
          label: "Previous chart",
          icon: ArrowUp01Icon,
          onClick: handlePrevChart,
          isDisabled: prevChartDisabled,
        },
        {
          label: "Next chart",
          icon: ArrowDown01Icon,
          onClick: handleNextChart,
          isDisabled: disabled,
        },
        {
          label: "Renew current chart",
          icon: Exchange01Icon,
          onClick: handleRenewChart,
          isDisabled: disabled,
        },
        { label: "Bookmark current chart", icon: BookmarkAdd01Icon, isDisabled: disabled },
      ].map(({ label, icon, onClick, isDisabled }, index) => (
        <IconButton
          key={index}
          size="lg"
          w="full"
          aria-label={label}
          icon={<Icon as={icon} />}
          onClick={onClick}
          isDisabled={isDisabled}
        />
      ))}
    </Flex>
  );
}

export default Controller;
