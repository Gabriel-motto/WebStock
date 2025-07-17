import { ChakraProvider, defaultSystem  } from "@chakra-ui/react"
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ColorModeProvider } from "./components/ui/color-mode";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider forcedTheme="light">
                <App />
            </ColorModeProvider>
        </ChakraProvider>
    </React.StrictMode>
);
