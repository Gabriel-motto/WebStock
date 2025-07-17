import { Provider } from "./components/ui/provider";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ColorModeProvider } from "./components/ui/color-mode";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider>
            <ColorModeProvider forcedTheme="light">
                <App />
            </ColorModeProvider>
        </Provider>
    </React.StrictMode>
);
