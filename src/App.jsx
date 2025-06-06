import "./App.css";
import Header from "./components/header/header-component.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
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
                    <Router routes={ROUTES} />
                </div>
            </div>
        </>
    );
}

export default App;
