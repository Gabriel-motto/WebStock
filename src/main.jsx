import { Provider } from "./components/ui/provider";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider>
            <ThemeProvider enableSystem={false}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
