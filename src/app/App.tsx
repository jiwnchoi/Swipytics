import { useLayout, useStoresLogging } from "@hooks";
import AppBase from "./AppBase";
import AppLarge from "./AppLarge";

export default function App() {
  const { mobile } = useLayout();
  useStoresLogging();
  return mobile ? <AppBase /> : <AppLarge />;
}
