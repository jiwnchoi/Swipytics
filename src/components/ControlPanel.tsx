import { Center, Flex, type FlexProps, Portal, Spacer, VStack } from "@chakra-ui/react";
import { useControlPanel, useLayout } from "@hooks";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ControlPanelProps extends FlexProps {
  children: ReactNode;
  controller: ReactNode;
}

function MobilePanel({ children, controller, ...props }: ControlPanelProps) {
  const {
    animate,
    dragControls,
    handleDragEnd,
    bodyRef,
    handleRef,
    navigatorRef,
    navigatorBounds,
    variants,
  } = useControlPanel();

  const { drawerBgColor, borderColor } = useLayout();

  return (
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
        border={"1px solid"}
        borderColor={borderColor}
        borderRadius={"xl"}
        boxShadow={"0px -4px 10px rgba(0, 0, 0, 0.1)"}
        bgColor={drawerBgColor}
        {...props}>
        <Flex bgColor={"gray"} minH={1} mt={2} borderRadius={4} minW={10} ref={handleRef} />
        <Flex w={"full"} ref={bodyRef} p={4} flexDir={"column"}>
          {children}
        </Flex>
        <Flex minH={"100dvh"} />
      </Center>
      <Portal>
        <Flex
          borderX={"1px solid"}
          borderBottom={"1px solid"}
          borderColor={borderColor}
          onPointerDown={(e) => dragControls.start(e)}
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
  );
}

function DesktopPanel({ children, ...props }: FlexProps) {
  const { tabPanelHeight } = useLayout();
  return (
    <Flex {...props}>
      <VStack w={"full"} h={tabPanelHeight} gap={4} rounded="lg" p={4} align={"start"} minH="full">
        {children}
      </VStack>
    </Flex>
  );
}

export default function ControlPanel({ children, controller, ...props }: ControlPanelProps) {
  const { mobile } = useLayout();

  return mobile ? (
    <MobilePanel {...props} controller={controller}>
      {children}
    </MobilePanel>
  ) : (
    <DesktopPanel {...props}>
      {children}
      <Spacer />
      {controller}
    </DesktopPanel>
  );
}
