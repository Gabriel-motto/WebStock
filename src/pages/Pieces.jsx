import { Button, Card, Image, Text } from "@chakra-ui/react";
import { TabComponent } from "../components/ui/tab-component.jsx";

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
        id: "mechanics",
        title: "Mecánica",
        Content: "a",
    },
    {
        id: "electronics",
        title: "Electrónica",
        Content: "b",
    },
    {
        id: "all",
        title: "Todas",
        Content: "c",
    },
];

function CardContent({ workshop }) {
    const contentDataFiltered = contentData.filter(
        (content) => content.workshop === workshop
    );

    return (
        <div className="grid-container">
            {contentDataFiltered.map((content, index) => (
                <Card.Root
                    className=".content-card"
                    key={index}>
                    <Image
                        src={content.image}
                        alt={`Producto con referencia: ${content.title}`}
                        padding="10px"
                    />
                    <Card.Body gap="2">
                        <Card.Title>{content.title}</Card.Title>
                        <Card.Description>
                            {content.description}
                        </Card.Description>
                        <Text
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
    return (
        <>
            <div className="content">
                <TabComponent
                    tabContent={tabData}
                    defaultValue="mechanics"
                />
            </div>
        </>
    );
}

export default PiecesPage;
