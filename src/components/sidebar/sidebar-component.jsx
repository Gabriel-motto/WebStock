import "./sidebar-component.css";
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
        <>
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
                            <div className="button-content">
                                <div className="icon">
                                    <IoHomeOutline />
                                </div>
                                <CustomLink
                                    className="link"
                                    to="/">
                                    Home
                                </CustomLink>
                            </div>
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
                            <div className="button-content">
                                <div className="icon">
                                    <PiFactory />
                                </div>
                                <CustomLink
                                    className="link"
                                    to="/machines">
                                    Máquinas
                                </CustomLink>
                            </div>
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
                            <div className="button-content">
                                <div className="icon">
                                    <HiOutlineWrenchScrewdriver />
                                </div>
                                <CustomLink
                                    className="link"
                                    to="/pieces">
                                    Piezas
                                </CustomLink>
                            </div>
                        </Button>
                    </Tooltip>
                </IconContext.Provider>
            </div>
        </>
    );
}

export default Sidebar;
