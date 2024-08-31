import { Center, Flex, type FlexProps, Portal, VStack } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { useInteractionStore } from "@stores";
import { type PanInfo, motion, useDragControls } from "framer-motion";
import { Children, type ReactNode, createContext, isValidElement, useMemo } from "react";
import useMeasure from "react-use-measure";

interface ControlPanelProps extends FlexProps {
  children: ReactNode;
}

const ControlPanelContext = createContext(false);

export function ControlPanelNavigator({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ControlPanelContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function useControlPanel() {
  const expanded = useInteractionStore(state => state.drawerExpanded);
  const setExpanded = useInteractionStore(state => state.setDrawerExpanded);
  const { mobile } = useLayout();
  const dragControls = useDragControls();
  const [bodyRef, bodyBounds] = useMeasure();
  const [handleRef, handleBounds] = useMeasure();
  const [navigatorRef, navigatorBounds] = useMeasure();

  const variants = useMemo(
    () => ({
      expanded: {
        top: `calc(100dvh - ${navigatorBounds.height + handleBounds.height + bodyBounds.height}px)`,
      },
      collapsed: {
        top: `calc(100dvh - ${navigatorBounds.height + handleBounds.height + 16}px)`,
      },
    }),
    [bodyBounds, handleBounds],
  );

  const handleDragEnd = (_: never, info: PanInfo) => {
    setExpanded(info.offset.y > 100 ? false : info.offset.y < -100 ? true : expanded);
  };

  return {
    expanded,
    dragControls,
    handleDragEnd,
    bodyRef,
    handleRef,
    navigatorRef,
    navigatorBounds,
    variants,
    navigator,
    mobile,
  };
}

export function ControlPanel({ children, ...props }: ControlPanelProps) {
  const {
    expanded,
    dragControls,
    handleDragEnd,
    bodyRef,
    handleRef,
    navigatorRef,
    navigatorBounds,
    variants,
    mobile,
  } = useControlPanel();

  const { drawerBgColor } = useLayout();

  const [navigator, content] = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const navigator = childrenArray.find(
      child => isValidElement(child) && child.type.toString() === ControlPanelNavigator.toString(),
    );
    const content = childrenArray.find(
      child => isValidElement(child) && child.type.toString() === ControlPanelContent.toString(),
    );
    return [navigator, content];
  }, [children]);

  return (
    <ControlPanelContext.Provider value={expanded}>
      {mobile ? (
        <motion.div
          dragControls={dragControls}
          style={{
            width: "100%",
            left: 0,
            position: "fixed",
          }}
          variants={variants}
          initial="collapsed"
          animate={expanded ? "expanded" : "collapsed"}
          drag="y"
          dragListener={true}
          dragConstraints={{ bottom: 0, top: 0 }}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}>
          <Center
            h="fit-content"
            flexDir={"column"}
            gap={0}
            borderRadius={"xl"}
            boxShadow={"md"}
            bgColor={drawerBgColor}>
            <Flex bgColor={"gray"} minH={1} mt={2} borderRadius={4} minW={10} ref={handleRef} />
            <Flex w={"full"} ref={bodyRef} p={4} flexDir={"column"}>
              {content}
            </Flex>
            <Flex minH={"100dvh"} />
          </Center>
          <Portal>
            <Flex
              bgColor={drawerBgColor}
              ref={navigatorRef}
              position={"absolute"}
              top={`calc(100dvh - ${navigatorBounds.height}px)`}
              p={4}
              pb={8}
              left={0}
              zIndex={500}
              w={"full"}>
              {navigator}
            </Flex>
          </Portal>
        </motion.div>
      ) : (
        <Flex {...props}>
          <VStack
            w={"full"}
            h={"fit-content"}
            gap={4}
            rounded="lg"
            p={4}
            align={"start"}
            minH="full">
            {navigator}
            {content}
          </VStack>
        </Flex>
      )}
    </ControlPanelContext.Provider>
  );
}
