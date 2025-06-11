import { useState } from "react";
import { TabComponent } from "../components/ui/tab-component.jsx";
import { Card, Button, Image, Text } from "@chakra-ui/react"
import DialogComponent from "../components/dialog/dialog-component.jsx"
import "./Pieces.css";

const contentData = [
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

function CardComponent({ workshop }) {
    let contentDataFiltered;
    if (workshop.value === "all") {
        contentDataFiltered = contentData;
    } else {
        contentDataFiltered = contentData.filter(
            (content) => content.workshop === workshop.value
        );
    }

    return (
        <div className="grid-container">
            {contentDataFiltered.map((content, index) => (
                <Card.Root
                    className="content-card"
                    key={index}>
                    <Image
                        src={content.image}
                        alt={`Producto con referencia: ${content.title}`}
                        padding="10px"
                    />
                    <Card.Body
                        gap="2"
                        className="body">
                        <Card.Title className="title">
                            {content.title}
                        </Card.Title>
                        <Card.Description
                            className="description"
                            lineClamp="3">
                            {content.description}
                        </Card.Description>
                        <Text
                            className="brand"
                            textStyle="2xl"
                            letterSpacing="tight"
                            mt="2">
                            {content.brand}
                        </Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            variant="solid"
                            colorPalette="blue">
                            Añadir
                        </Button>
                        <Button
                            variant="ghost"
                            colorPalette="red">
                            Eliminar
                        </Button>
                    </Card.Footer>
                </Card.Root>
            ))}
        </div>
    );
}

function PiecesPage() {
    const [workshop, setWorkshop] = useState({ value: "all" });
    
    const handleWorkshopChange = (value) => {
        setWorkshop(value);
    };


    return (
        <>
            <div className="container">
                <DialogComponent 
                    textButton="Nueva pieza"
                    title="Añadir una nueva pieza"
                    content=""/>
                <TabComponent
                    tabContent={tabData}
                    defaultValue={"all"}
                    dataFromChild={handleWorkshopChange}
                />
                <CardComponent workshop={workshop}/>
            </div>
        </>
    );
}

export default PiecesPage;
