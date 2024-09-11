import { Flex, type FlexProps, Icon, IconButton } from "@chakra-ui/react";
import { useController } from "@hooks";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Exchange01Icon,
  HeartAddIcon,
  HeartCheckIcon,
} from "hugeicons-react";

function Controller(props: FlexProps) {
  const {
    sessionInitialized,
    chartDisplaying,
    currentChartPreferred,
    handleNextChart,
    handlePrevChart,
    handleRenewChart,
    handlePreferChart,
  } = useController();

  return (
    <Flex {...props}>
      <IconButton
        size="lg"
        w="full"
        aria-label="Previous chart"
        icon={<Icon as={ArrowLeft01Icon} />}
        onClick={handlePrevChart}
        isDisabled={!sessionInitialized || !chartDisplaying}
      />
      <IconButton
        size="lg"
        w="full"
        aria-label="Next chart"
        icon={<Icon as={ArrowRight01Icon} />}
        onClick={handleNextChart}
        isDisabled={!sessionInitialized}
      />
      <IconButton
        size="lg"
        w="full"
        aria-label="Renew current chart"
        icon={<Icon as={Exchange01Icon} />}
        onClick={handleRenewChart}
        isDisabled={!sessionInitialized || !chartDisplaying}
      />
      <IconButton
        size="lg"
        w="full"
        aria-label="Bookmark current chart"
        icon={<Icon as={currentChartPreferred ? HeartCheckIcon : HeartAddIcon} />}
        onClick={handlePreferChart}
        colorScheme={currentChartPreferred ? "red" : "gray"}
        isDisabled={!sessionInitialized || !chartDisplaying}
      />
    </Flex>
  );
}

export default Controller;
