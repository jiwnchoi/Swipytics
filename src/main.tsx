import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(<StrictMode>{"Hello World"}</StrictMode>);
