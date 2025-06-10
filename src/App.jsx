import "./App.css";
import Header from "./components/header/header-component.jsx";
import Sidebar from "./components/sidebar/sidebar-component.jsx";
import Router from "./Router.jsx";
import { ROUTES } from "./utils/consts";

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
        </>
    );
}

export default App;
