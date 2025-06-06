
export const EVENTS = {
    PUSHSTATE: 'pushstate',
    POPSTATE: 'popstate'
}


import HomePage from "../pages/Home.jsx";
import MachinesPage from "../pages/Machines.jsx";
import PiecesPage from "../pages/Pieces.jsx";
import SummaryPage from "../pages/Summary.jsx";
export const ROUTES = [
    {
        path: "/",
        Component: HomePage
    },
    {
        path: "/machines",
        Component: MachinesPage
    },
    {
        path: "/pieces",
        Component: PiecesPage
    },
    {
        path: "/summary",
        Component: SummaryPage
    }
]