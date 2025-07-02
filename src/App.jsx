import "./App.css";
import Header from "./components/header/Header.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Router from "./Router.jsx";
import { ROUTES } from "./utils/consts";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
    return (
        <>
            <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                <div className="main-panel">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="content">
                        <Router routes={ROUTES} />
                    </div>
                </div>
            </div>
            <Analytics />
            <SpeedInsights />
        </>
    );
}

export default App;
