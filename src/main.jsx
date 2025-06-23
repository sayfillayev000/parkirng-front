import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WebsocketContextProvider } from "./context/WebsocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <WebsocketContextProvider>
    <App />
  </WebsocketContextProvider>
);
