import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Clear any hash on load so we always ensure we are at the home view
if (window.location.hash) {
  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );
}

// Force scroll to top before mount
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
