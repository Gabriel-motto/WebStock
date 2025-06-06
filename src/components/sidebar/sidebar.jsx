import "./sidebar.css";
import { Button } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { PiFactory } from "react-icons/pi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

function Sidebar() {
    return (
        <>
            <div className="nav">
                <IconContext.Provider value={{ color: "white" }}>
                    <Button
                        className="item"
                        variant="ghost">
                        <PiFactory />
                    </Button>
                    <Button
                        className="item"
                        variant="ghost">
                        <HiOutlineWrenchScrewdriver />
                    </Button>
                </IconContext.Provider>
            </div>
        </>
    );
}

export default Sidebar;
