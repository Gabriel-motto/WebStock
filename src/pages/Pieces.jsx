import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { TabComponent } from "../components/ui/tab-component.jsx";
import { DialogComponentEx } from "../components/dialog/dialog-component.jsx";
import { CardComponentImage } from "../components/card/card-component.jsx";
import "./Pieces.css";

const dataPieces = [
    {
        title: "6FC 5357-0BB33-0AE0",
        description:
            "840D/DE NCU 573.2 5 ACHSEN/SPINDELN MAX. 31 SPEICHER NC 1,5MB PLC 64KB (MAX. 288KB), 8MB BIS 32MB D-RAM, STANDARD ODER",
        image: "src/assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "mechanics",
    },
    {
        title: "6FC 5270-5BX30-3AH0",
        description: "SOFTWARE NCU 573.2",
        image: "src/assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "mechanics",
    },
    {
        title: "6FC 5252-0AD00-0AA0",
        description:
            "SINUMERIK 810D/840D I/O connection via PROFIBUS DP, software option only Certificate of License",
        image: "src/assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "mechanics",
    },
    {
        title: "6FC 5252-0AX21-0AB0",
        description: '840D-TOOLBOX, DISK 3,5" LICENCIA',
        image: "src/assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "electronics",
    },
    {
        title: "6ES 7153-1AA03-0XB0",
        description:
            "IM 153-1 ET 200M PERIFERIA DESCENTRALIZADA FUER MAXIMAL 8 S7-300 BAUGRUPPEN",
        image: "src/assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "electronics",
    },
];

const tabData = [
    {
        id: "all",
        title: "Todas",
    },
    {
        id: "mechanics",
        title: "Mecánica",
    },
    {
        id: "electronics",
        title: "Electrónica",
    },
];

function PiecesPage() {
    const [workshop, setWorkshop] = useState({ value: "all" });
    const [showDialog, setShowDialog] = useState(false);

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleWorkshopChange = (value) => {
        setWorkshop(value);
    };

    let contentDataFiltered = dataPieces;
    if (workshop.value !== "all") {
        contentDataFiltered = dataPieces.filter(
            (content) => content.workshop === workshop.value
        );
    }

    return (
        <>
            <div className="container">
                <DialogComponentEx
                    title="Añadir una nueva pieza"
                    content=""
                    show={showDialog}
                    close={handleCloseDialog}
                />
                <Button
                    className="dialog-button"
                    variant="ghost"
                    size="sm"
                    onClick={setShowDialog}>
                    Añadir pieza
                </Button>
                <TabComponent
                    tabContent={tabData}
                    defaultValue={"all"}
                    dataFromChild={handleWorkshopChange}
                />
                <div className="grid-container">
                    {contentDataFiltered.map((data, index) => (
                        <CardComponentImage
                            key={index}
                            title={data.title}
                            image={data.image}
                            description={data.description}
                            footer={data.brand}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default PiecesPage;
