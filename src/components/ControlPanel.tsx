import { Center, Flex, type FlexProps, Portal, VStack } from "@chakra-ui/react";
import { useControlPanel, useLayout } from "@hooks";
import { motion } from "framer-motion";
import { Children, type ReactNode, isValidElement, useMemo } from "react";

interface ControlPanelProps extends FlexProps {
  children: ReactNode;
}

export function ControlPanelNavigator({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ControlPanelContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ControlPanel({ children, ...props }: ControlPanelProps) {
  const {
    animate,
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

  const [controller, content] = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const controller = childrenArray.find(
      child => isValidElement(child) && child.type.toString() === ControlPanelNavigator.toString(),
    );
    const content = childrenArray.find(
      child => isValidElement(child) && child.type.toString() === ControlPanelContent.toString(),
    );
    return [controller, content];
  }, [children]);

  return (
    <>
      {mobile ? (
        <motion.div
          dragControls={dragControls}
          style={{
            width: "100%",
            left: 0,
            position: "fixed",
          }}
          variants={variants}
          initial={animate}
          animate={animate}
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
            boxShadow={"0px -4px 10px rgba(0, 0, 0, 0.1)"}
            bgColor={drawerBgColor}>
            <Flex bgColor={"gray"} minH={1} mt={2} borderRadius={4} minW={10} ref={handleRef} />
            <Flex w={"full"} ref={bodyRef} p={4} flexDir={"column"}>
              {content}
            </Flex>
            <Flex minH={"100dvh"} />
          </Center>
          <Portal>
            <Flex
              onPointerDown={e => dragControls.start(e)}
              bgColor={drawerBgColor}
              ref={navigatorRef}
              position={"absolute"}
              top={`calc(100dvh - ${navigatorBounds.height}px)`}
              p={4}
              pb={8}
              left={0}
              zIndex={500}
              w={"full"}>
              {controller}
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
            {controller}
            {content}
          </VStack>
        </Flex>
      )}
    </>
  );
}
