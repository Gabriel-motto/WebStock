import { useState } from "react";
import {
    Button,
    Image,
    Text,
    Badge,
    Separator,
    Fieldset,
    Field,
    Input,
    ButtonGroup,
} from "@chakra-ui/react";
import { TabComponent } from "../components/ui/tab-component.jsx";
import DialogComponent from "../components/dialog/dialog-component.jsx";
import { CardComponentImage } from "../components/card/card-component.jsx";
import "./Pieces.css";

const dataPieces = [
    {
        title: "6FC 5357-0BB33-0AE0",
        description:
            "840D/DE NCU 573.2 5 ACHSEN/SPINDELN MAX. 31 SPEICHER NC 1,5MB PLC 64KB (MAX. 288KB), 8MB BIS 32MB D-RAM, STANDARD ODER",
        image: "assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "mechanics",
    },
    {
        title: "6FC 5270-5BX30-3AH0",
        description: "SOFTWARE NCU 573.2",
        image: "assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "mechanics",
    },
    {
        title: "6FC 5252-0AD00-0AA0",
        description:
            "SINUMERIK 810D/840D I/O connection via PROFIBUS DP, software option only Certificate of License",
        image: "assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "mechanics",
    },
    {
        title: "6FC 5252-0AX21-0AB0",
        description: '840D-TOOLBOX, DISK 3,5" LICENCIA',
        image: "assets/GNK_logo_azul.png",
        brand: "Siemens",
        workshop: "electronics",
    },
    {
        title: "6ES 7153-1AA03-0XB0",
        description:
            "IM 153-1 ET 200M PERIFERIA DESCENTRALIZADA FUER MAXIMAL 8 S7-300 BAUGRUPPEN",
        image: "assets/GNK_logo_azul.png",
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

function DetailsDialog({ data }) {
    return (
        <>
            <div className="container-box">
                <Image
                    className="image-dialog"
                    src={data.image}
                    alt={`Producto con referencia: ${data.title}`}
                />
                <div className="content-box">
                    <div className="title-dialog">
                        <Text
                            fontWeight="medium"
                            color="fg">
                            {data.title}
                        </Text>
                        <Text
                            fontWeight="medium"
                            color="fg.muted">
                            {data.brand}
                        </Text>
                    </div>
                    <Text
                        className="description-box"
                        fontSize="18px"
                        letterSpacing="wide">
                        {data.description}
                    </Text>
                    <Badge
                        colorPalette="teal"
                        variant="solid"
                        className="workshop-badge"
                        size="lg">
                        {data.workshop === "mechanics"
                            ? "Mecánica"
                            : "Electrónica"}
                    </Badge>
                </div>
            </div>
            <Separator
                className="separator-dialog"
                size="md"
            />
        </>
    );
}

function handleSubmit(formData) {
    const data = formData;
    console.log(
        formData.get("name") +
            " " +
            formData.get("type") +
            " " +
            formData.get("brand") +
            " " +
            formData.get("description") +
            " " +
            formData.get("workshop") +
            " " +
            formData.get("amount") +
            " " +
            formData.get("location") +
            " " +
            formData.get("machine")
    );

    // useEffect(() => {
    //     async function insertPiece() {
    //         const { data, error } = await supabase
    //             .from("Pieces")
    //             .insert([{
    //                 name: formData.get("name"),
    //                 type: formData.get("type"),
    //                 brand: formData.get("brand"),
    //                 description: formData.get("description"),
    //                 workshop: formData.get("workshop"),
    //                 amount: formData.get("amount"),
    //                 location: formData.get("location"),
    //                 machine: formData.get("machine"),
    //             }])
    //             .select()
    //     }
    //     insertPiece();
    // }, []);
}

function NewPiece({ handleCancel }) {
    return (
        <form action={handleSubmit}>
            <Fieldset.Root>
                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Referencia</Field.Label>
                        <Input
                            name="name"
                            className="input-form name-form"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Tipo</Field.Label>
                        <Input
                            name="type"
                            className="input-form type-form"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Marca</Field.Label>
                        <Input
                            name="brand"
                            className="input-form brand-form"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Descripcion</Field.Label>
                        <Input
                            name="description"
                            className="input-form description-form"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Tipo de repuesto</Field.Label>
                        <Input
                            name="workshop"
                            className="input-form workshop-form"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Cantidad</Field.Label>
                        <Input
                            name="amount"
                            className="input-form amount-form"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Localizacion</Field.Label>
                        <Input
                            name="location"
                            className="input-form location-form"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Máquina</Field.Label>
                        <Input
                            name="machine"
                            className="input-form machine-form"
                        />
                    </Field.Root>
                </Fieldset.Content>

                <ButtonGroup
                    variant="outline"
                    className="buttons-form">
                    <Button
                        className="btn btn-add"
                        colorPalette="blue"
                        type="submit">
                        Añadir
                    </Button>
                    <Button
                        className="btn btn-cancel"
                        colorPalette="red"
                        onClick={handleCancel}>
                        Cancelar
                    </Button>
                </ButtonGroup>
            </Fieldset.Root>
        </form>
    );
}

function PiecesPage() {
    const [workshop, setWorkshop] = useState({ value: "all" });
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [selectedCardData, setSelectedCardData] = useState();

    const handleCloseDialog = () => {
        setShowNewDialog(false);
        setShowDetailsDialog(false);
    };

    const handleWorkshopChange = (value) => {
        setWorkshop(value);
    };

    const handleOnClickCard = (data, index) => {
        setSelectedCardData(data);
        setShowDetailsDialog(true);
        console.log(index);
    };

    let contentDataFiltered = dataPieces;
    if (workshop.value !== "all") {
        contentDataFiltered = dataPieces.filter(
            (content) => content.workshop === workshop.value
        );
    }

    return (
        <div className="container">
            <DialogComponent
                size="xl"
                title="Añadir pieza"
                content={<NewPiece handleCancel={handleCloseDialog} />}
                open={showNewDialog}
                close={handleCloseDialog}
                lazyMount
                placement="center"
                motionPreset="slide-in-bottom"
            />
            <Button
                className="dialog-button"
                variant="ghost"
                size="sm"
                onClick={setShowNewDialog}>
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
                        className="card"
                        onClick={() => handleOnClickCard(data, index)}
                        key={index}
                        title={data.title}
                        image={data.image}
                        description={data.description}
                        footer={data.brand}
                    />
                ))}
            </div>
            <DialogComponent
                size="cover"
                title="Detalles de la pieza"
                content={
                    selectedCardData && (
                        <DetailsDialog data={selectedCardData} />
                    )
                }
                open={showDetailsDialog}
                close={handleCloseDialog}
                lazyMount
                placement="center"
                motionPreset="slide-in-bottom"
            />
        </div>
    );
}

export default PiecesPage;
