import { useLayout } from "@hooks";
import { EXPANDING_THRESHOLD } from "@shared/constants";
import { useInteractionStore } from "@stores";
import { type PanInfo, useDragControls } from "framer-motion";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";

export default function useControlPanel() {
  const expanded = useInteractionStore(state => state.drawerExpanded);
  const setExpanded = useInteractionStore(state => state.setDrawerExpanded);
  const { mobile } = useLayout();
  const dragControls = useDragControls();
  const [bodyRef, bodyBounds] = useMeasure();
  const [handleRef, handleBounds] = useMeasure();
  const [navigatorRef, navigatorBounds] = useMeasure();
  const [initialized, setInitialized] = useState(false);

  const variants = useMemo(
    () => ({
      expanded: {
        top: `calc(100dvh - ${navigatorBounds.height + handleBounds.height + bodyBounds.height}px)`,
      },
      collapsed: {
        top: `calc(100dvh - ${navigatorBounds.height + handleBounds.height + 16}px)`,
      },
      loadExpanded: {
        top: `calc(100dvh - ${navigatorBounds.height + handleBounds.height + bodyBounds.height - 200}px)`,
      },
    }),
    [bodyBounds, handleBounds],
  );

  const handleDragEnd = (_: never, info: PanInfo) => {
    if (!initialized) setInitialized(true);
    setExpanded(
      info.offset.y > EXPANDING_THRESHOLD
        ? false
        : info.offset.y < -EXPANDING_THRESHOLD
          ? true
          : expanded,
    );
  };

  const animate = !initialized ? "loadExpanded" : expanded ? "expanded" : "collapsed";

  return {
    animate,
    dragControls,
    handleDragEnd,
    bodyRef,
    handleRef,
    navigatorRef,
    navigatorBounds,
    variants,
    mobile,
  };
}
