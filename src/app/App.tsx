import { Box, Card, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Chart, Controller, FileForm } from "@components";
import { useSession } from "@hooks";
import { Drawer } from "vaul";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, scrollToChart, renewCurrentChart } =
    useSession("dummy-session");
  const cardHeight = useBreakpointValue({ base: "100vh", md: "80vh" });
  const cardPadding = useBreakpointValue({ base: 0, md: 2 });
  const isDrawerVisible = useBreakpointValue({ base: true, md: false });
  // const [snap, setSnap] = useState<number | string | null>("196px");

  return (
    <Flex
      w={{ base: "full", md: "container.xl" }}
      h={cardHeight}
      flexDir={{ base: "column", md: "row" }}>
      <Flex w="full" flexDir={"column"} gap={4} minH={"100lvh"}>
        <Flex
          p={cardPadding}
          ref={scrollContainerRef}
          flexDir={"column"}
          w={"full"}
          maxH={cardHeight}
          gap={{ base: 0, md: 4 }}
          scrollSnapType={"y mandatory"}
          overflowY={"auto"}
          style={{
            WebkitOverflowScrolling: "touch",
          }}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}>
          {charts.map(chart => (
            <Chart
              key={chart.key}
              p={cardPadding}
              chart={chart}
              minH={cardHeight}
              chartWidth={{
                base: 300,
                lg: 500,
              }}
              chartHeight={{
                base: 300,
                lg: 500,
              }}
            />
          ))}
        </Flex>
      </Flex>
      {!isDrawerVisible && (
        <Flex w={{ base: "full", md: "md" }} p={cardPadding}>
          <Card
            flexDir={"column"}
            h={"full"}
            justifyContent={"space-between"}
            rounded="lg"
            padding={4}
            bottom={0}>
            <FileForm />
            <Controller
              scrollToChart={scrollToChart}
              renewCurrentChart={renewCurrentChart}
              currentChartIndex={currentChartIndex}
            />
          </Card>
        </Flex>
      )}
      <Drawer.Root
        open={isDrawerVisible}
        modal={false}
        // activeSnapPoint={snap}
        // setActiveSnapPoint={setSnap}
        // snapPoints={["196px", "90vh", 1]}
        closeThreshold={0.5}>
        <Drawer.Portal>
          <Drawer.Content
            onOpenAutoFocus={(event: Event) => {}}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: "90vh",
            }}>
            <Flex
              w="full"
              h="full"
              flexDir={"column"}
              as={Card}
              rounded={"2xl"}
              boxShadow={
                " 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)"
              }>
              <Box
                className="handle"
                h="4px"
                w="40px"
                bg="gray.300"
                mx="auto"
                my={2}
                borderRadius="full"
              />
              <Card
                flexDir={"column"}
                h={"full"}
                justifyContent={"space-between"}
                rounded="lg"
                padding={4}
                gap={4}
                bottom={0}>
                <Controller
                  scrollToChart={scrollToChart}
                  renewCurrentChart={renewCurrentChart}
                  currentChartIndex={currentChartIndex}
                />
                <FileForm />
              </Card>
            </Flex>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Flex>
  );
}
