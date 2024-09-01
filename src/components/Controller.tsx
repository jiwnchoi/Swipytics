import { Flex, type FlexProps, Icon, IconButton } from "@chakra-ui/react";
import { useController } from "@hooks";
import { ArrowDown01Icon, ArrowUp01Icon, Exchange01Icon, FavouriteIcon } from "hugeicons-react";

function Controller(props: FlexProps) {
  const {
    disabled,
    currentChartPreferred,
    handleNextChart,
    handlePrevChart,
    handleRenewChart,
    handlePreferChart,
  } = useController();
  return (
    <Flex {...props}>
      {[
        {
          label: "Previous chart",
          icon: ArrowUp01Icon,
          onClick: handlePrevChart,
        },
        {
          label: "Next chart",
          icon: ArrowDown01Icon,
          onClick: handleNextChart,
        },
        {
          label: "Renew current chart",
          icon: Exchange01Icon,
          onClick: handleRenewChart,
        },
        {
          label: "Bookmark current chart",
          icon: FavouriteIcon,
          onClick: handlePreferChart,
          color: currentChartPreferred ? "red" : "gray",
        },
      ].map(({ label, icon, onClick, color: colorScheme }, index) => (
        <IconButton
          key={index}
          size="lg"
          w="full"
          aria-label={label}
          icon={<Icon as={icon} />}
          onClick={onClick}
          isDisabled={disabled}
          colorScheme={colorScheme}
        />
      ))}
    </Flex>
  );
}

export default Controller;
