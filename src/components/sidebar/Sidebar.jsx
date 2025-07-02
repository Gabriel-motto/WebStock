import "./Sidebar.css";
import { Button } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { IconContext } from "react-icons";
import { PiFactory } from "react-icons/pi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { COLOR } from "@/utils/consts";
import { CustomLink } from "@/utils/Link.jsx";

function Sidebar() {
    return (
        <div className="nav">
            <IconContext.Provider value={{ color: COLOR.CORPYELLOW }}>
                <Tooltip
                    openDelay="500"
                    closeDelay="250"
                    content="Home"
                    positioning={{ placement: "right" }}>
                    <Button
                        className="item"
                        variant="ghost"
                        colorPalette="blue"
                        asChild>
                        <CustomLink to="/">
                            <IoHomeOutline className="button-icon" />
                            <span className="button-text">Home</span>
                        </CustomLink>
                    </Button>
                </Tooltip>
                <Tooltip
                    openDelay="500"
                    closeDelay="250"
                    content="Máquinas"
                    positioning={{ placement: "right" }}>
                    <Button
                        className="item"
                        variant="ghost"
                        colorPalette="blue"
                        asChild>
                        <CustomLink to="/machines">
                            <PiFactory className="button-icon" />
                            <span className="button-text">Máquinas</span>
                        </CustomLink>
                    </Button>
                </Tooltip>
                <Tooltip
                    openDelay="500"
                    closeDelay="250"
                    content="Piezas"
                    positioning={{ placement: "right" }}>
                    <Button
                        className="item"
                        variant="ghost"
                        colorPalette="blue"
                        asChild>
                        <CustomLink to="/pieces">
                            <HiOutlineWrenchScrewdriver className="button-icon" />
                            <span className="button-text">Piezas</span>
                        </CustomLink>
                    </Button>
                </Tooltip>
            </IconContext.Provider>
        </div>
    );
}

export default Sidebar;
