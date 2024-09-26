import { Button, ButtonGroup, type ButtonGroupProps, Icon, Text, VStack } from "@chakra-ui/react";
import { useController } from "@hooks";
import { ArrowLeft01Icon, ArrowRight01Icon, HeartAddIcon, HeartCheckIcon } from "hugeicons-react";
import { useTranslation } from "react-i18next";

function Controller(props: ButtonGroupProps) {
  const {
    sessionInitialized,
    chartDisplaying,
    currentChartPreferred,
    handleNextChart,
    handlePrevChart,
    // handleRenewChart,
    handlePreferChart,
  } = useController();
  const { t } = useTranslation();

  return (
    <ButtonGroup {...props}>
      <Button
        py={8}
        size="lg"
        w="full"
        aria-label="Previous chart"
        onClick={handlePrevChart}
        isDisabled={!sessionInitialized || !chartDisplaying}
        variant="ghost">
        <VStack spacing={2}>
          <Icon as={ArrowLeft01Icon} boxSize={6} />
          <Text fontSize="sm">{t("navigator.prev")}</Text>
        </VStack>
      </Button>
      <Button
        py={8}
        size="lg"
        w="full"
        aria-label="Next chart"
        onClick={handleNextChart}
        isDisabled={!sessionInitialized}
        variant="ghost">
        <VStack spacing={2}>
          <Icon as={ArrowRight01Icon} boxSize={6} />
          <Text fontSize="sm">{t("navigator.next")}</Text>
        </VStack>
      </Button>
      {/* <Button
        py={8}
        size="lg"
        w="full"
        aria-label="Renew current chart"
        onClick={handleRenewChart}
        isDisabled={!sessionInitialized || !chartDisplaying}
        variant="ghost">
        <VStack spacing={2}>
          <Icon as={Exchange01Icon} boxSize={6} />
          <Text fontSize="sm">Redesign</Text>
        </VStack>
      </Button> */}
      <Button
        py={8}
        size="lg"
        w="full"
        aria-label="Bookmark current chart"
        onClick={handlePreferChart}
        colorScheme={currentChartPreferred ? "red" : "gray"}
        isDisabled={!sessionInitialized || !chartDisplaying}
        variant={currentChartPreferred ? "solid" : "ghost"}>
        <VStack spacing={2}>
          <Icon as={currentChartPreferred ? HeartCheckIcon : HeartAddIcon} boxSize={6} />
          <Text fontSize="sm">{t("bookmarks.action")}</Text>
        </VStack>
      </Button>
    </ButtonGroup>
  );
}

export default Controller;
