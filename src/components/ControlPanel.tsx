import { Center, Flex, type FlexProps, useBreakpointValue } from "@chakra-ui/react";
import { type PanInfo, motion, useDragControls } from "framer-motion";
import { type PropsWithChildren, useMemo, useState } from "react";
import useMeasure from "react-use-measure";

export default function ControlPanel({ children, ...props }: PropsWithChildren<FlexProps>) {
  const [expanded, setExpanded] = useState(false);
  const mobile = useBreakpointValue({ base: true, lg: false });
  const [bodyRef, bodyBounds] = useMeasure();
  const [handleRef, handleBounds] = useMeasure();
  const dragControls = useDragControls();
  const handleDragEnd = (_: never, info: PanInfo) => {
    setExpanded(info.offset.y > 100 ? false : info.offset.y < -100 ? true : expanded);
  };

  const variants = useMemo(
    () => ({
      expanded: { top: `calc(100vh - ${bodyBounds.bottom - handleBounds.top + 8}px)` },
      collapsed: { top: "calc(100vh - 85px)" },
    }),
    [bodyBounds, handleBounds],
  );

  return (
    <>
      {mobile ? (
        <motion.div
          style={{
            width: "100%",
            top: 0,
            left: 0,
            height: 0,
            position: "absolute",
            willChange: "transform",
            padding: 0,
          }}
          variants={variants}
          initial="collapsed"
          animate={expanded ? "expanded" : "collapsed"}
          drag="y"
          dragControls={dragControls}
          dragListener={true}
          dragConstraints={{ bottom: 0, top: 0 }}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}>
          <Center
            bgColor={"gray.800"}
            flexDir={"column"}
            borderTopRadius={"xl"}
            boxShadow={"md"}
            ref={bodyRef}>
            <Flex bgColor={"gray"} minH={1} mt={2} borderRadius={4} minW={10} ref={handleRef} />
            {children}
          </Center>
        </motion.div>
      ) : (
        <Flex {...props}> {children} </Flex>
      )}
    </>
  );
}
