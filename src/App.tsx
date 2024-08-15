import { Center, Flex, useBreakpointValue } from "@chakra-ui/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  BookmarkAdd01Icon,
  Exchange01Icon,
  LinkForwardIcon,
} from "hugeicons-react";
import { Chart, ResponsiveButton } from "./components";
import { useScrollCharts } from "./hooks";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, handleNextChart, handlePreviousChart } =
    useScrollCharts();

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      w={{ base: "full", md: "container.xl" }}
      flexDir={{ base: "column", md: "row" }}
      gap={4}
      p={2}>
      <Flex w="full" flexDir={"column"} gap={4}>
        <Flex
          ref={scrollContainerRef}
          // border={"4px solid"}
          // borderColor={"blue.50"}
          flexDir={"column"}
          w={"full"}
          h={"min(100vh, 700px)"}
          gap={4}
          rounded="md"
          scrollSnapType={"y mandatory"}
          overflowY={"auto"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}>
          {charts.map(spec => (
            <Chart
              flexDir={"column"}
              alignContent={"center"}
              alignItems={"center"}
              gap={4}
              spec={spec}
              minW="full"
              minH={"min(100vh, 700px)"}
              chartWidth={{
                base: 300,
                lg: 600,
              }}
              chartHeight={{
                base: 300,
                lg: 500,
              }}
              scrollSnapAlign={"start"}
              key={spec.key}
            />
          ))}
        </Flex>
      </Flex>
      {isMobile ? (
        <BottomDrawer>
          <Controller
            handlePreviousChart={handlePreviousChart}
            handleNextChart={handleNextChart}
            currentChartIndex={currentChartIndex}
          />
        </BottomDrawer>
      ) : (
        <Flex
          flexDir={"column"}
          w={{ base: "full", md: "md" }}
          p={4}
          rounded="md"
          bgColor="blue.50"
          position={{ base: "absolute", md: "static" }}
          bottom={0}>
          <Controller
            handlePreviousChart={handlePreviousChart}
            handleNextChart={handleNextChart}
            currentChartIndex={currentChartIndex}
          />
          This Chart contains ...
        </Flex>
      )}
    </Flex>
  );
}

import { Box, VStack } from "@chakra-ui/react";
import { type PropsWithChildren, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface ControllerProps {
  handlePreviousChart: () => void;
  handleNextChart: () => void;
  currentChartIndex: number;
}

const Controller = (props: ControllerProps) => {
  const { handlePreviousChart, handleNextChart, currentChartIndex } = props;
  return (
    <Flex w="full" gap={2}>
      <ResponsiveButton
        w="full"
        colorScheme="blue"
        label="이전 시각화"
        icon={ArrowUp01Icon}
        onClick={handlePreviousChart}
        isDisabled={currentChartIndex === 0}
      />
      <ResponsiveButton
        w="full"
        colorScheme="blue"
        label="다음 시각화"
        icon={ArrowDown01Icon}
        onClick={handleNextChart}
      />
      <ResponsiveButton w="full" colorScheme="blue" label="다른 속성" icon={LinkForwardIcon} />
      <ResponsiveButton w="full" colorScheme="blue" label="다른 시각화" icon={Exchange01Icon} />
      <ResponsiveButton w="full" colorScheme="blue" label="저장 하기" icon={BookmarkAdd01Icon} />
    </Flex>
  );
};

const BottomDrawer = ({ children }: PropsWithChildren<object>) => {
  const [open, setOpen] = useState(false);

  const handlers = useSwipeable({
    onSwipedUp: () => setOpen(true),
    onSwipedDown: () => setOpen(false),
    delta: 50, // min distance(px) before a swipe starts
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      height={open ? "400px" : "100px"}
      bg="blue.50"
      borderTopRadius={10}
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      transition="height 0.3s ease-in-out"
      {...handlers}>
      <Center h="20px" w="100%" borderTopRadius="md" cursor="grab" _active={{ cursor: "grabbing" }}>
        <Box w="40px" h="4px" bg="blue.400" mx="auto" mt="8px" borderRadius="full" />
      </Center>
      <VStack p={4} align="stretch" spacing={4}>
        {children}
      </VStack>
    </Box>
  );
};
