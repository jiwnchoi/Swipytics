import type { TDemo } from "@shared/models";
import { useState } from "react";
import useLoadData from "./useLoadData";

export default function useDemo() {
  const { loading, initializeSession } = useLoadData();
  const [selectedDemo, setSelectedDemo] = useState<TDemo | null>(null);

  const handleDemoSelect = (demo: TDemo | null) => {
    setSelectedDemo(demo);
  };

  const handleSubmit = () => {
    if (selectedDemo?.href) {
      console.log(selectedDemo.href);
      initializeSession(selectedDemo.href);
    }
  };

  return {
    loading,
    selectedDemo,
    handleSubmit,
    handleDemoSelect,
  };
}
