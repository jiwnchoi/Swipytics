import type { TDemo } from "@shared/models";
import { useState } from "react";
import useLoadData from "./useLoadData";

export default function useDemo() {
  const { loading, initializeSessionWithURL } = useLoadData();
  const [selectedDemo, setSelectedDemo] = useState<TDemo | null>(null);

  const handleDemoSelect = (demo: TDemo | null) => {
    setSelectedDemo(demo);
  };

  const handleSubmit = async () => {
    if (selectedDemo?.href) {
      initializeSessionWithURL(selectedDemo.href);
    }
  };

  return {
    loading,
    selectedDemo,
    handleSubmit,
    handleDemoSelect,
  };
}
