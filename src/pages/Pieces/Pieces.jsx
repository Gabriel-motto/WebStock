import { useState, useEffect, lazy, Suspense } from "react";
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
    Spinner,
} from "@chakra-ui/react";
import supabase from "../../utils/supabase";
import { TabComponent } from "../../components/ui/tab-component.jsx";
import DialogComponent from "../../components/dialog/Dialog.jsx";
import { usePieces, useSelectedPiece } from "../../hooks/usePieces";
import "./Pieces.css";

const tabData = [
    {
        id: "all",
        title: "Todas",
    },
    {
        id: "Mecánica",
        title: "Mecánica",
    },
    {
        id: "Electrónica",
        title: "Electrónica",
    },
];

function DetailsDialog({ data }) {
    return (
        <>
            <div className="container-box">
                <Image
                    className="image-dialog"
                    src={"assets/GNK_logo_azul.png"}
                    alt={`Producto con referencia: ${data.name}`}
                />
                <div className="content-box">
                    <div className="title-dialog">
                        <Text
                            fontWeight="medium"
                            color="fg">
                            {data.name}
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
                    {data.workshop !== null && (
                        <Badge
                            colorPalette="teal"
                            variant="solid"
                            className="workshop-badge"
                            size="lg">
                            {data.workshop === "mechanics"
                                ? "Mecánica"
                                : "Electrónica"}
                        </Badge>
                    )}
                </div>
            </div>
            <Separator
                className="separator-dialog"
                size="md"
            />
        </>
    );
}

function NewPiece({ handleCancel }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        console.log(formData);
    };
    // useEffect(() => {
    //     async function insertPiece() {
    //         const { data, error } = await supabase
    //             .from("Pieces")
    //             .insert([{
    //                 name: formData.get("name"),
    //                 description: formData.get("description"),
    //                 type: formData.get("type"),
    //                 brand: formData.get("brand"),
    //                 workshop: formData.get("workshop"),
    //             }])
    //             .select()
    //     }
    //     insertPiece();
    // }, []);

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

const CardComponent = lazy(() => import("../../components/card/Card.jsx"));

function PiecesPage() {
    const [workshop, setWorkshop] = useState({value: "all"});
    const [search, setSearch] = useState("");
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [selectedCardData, setSelectedCardData] = useState([]);
    const pieces = usePieces(workshop.value, search);
    const selectedPiece = useSelectedPiece(selectedCardData.name);

    const handleCloseDialog = () => {
        setShowNewDialog(false);
        setShowDetailsDialog(false);
    };

    const handleWorkshopChange = (value) => {
        setWorkshop(value);
    };

    const handleOnClickCard = (data) => {
        setSelectedCardData(data);
        setShowDetailsDialog(true);
    };

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
            <Suspense fallback={<Spinner />}>
                <div className="grid-container">
                    {pieces.map((piece, index) => (
                        <CardComponent
                            className="card"
                            onClick={() => handleOnClickCard(piece)}
                            key={index}
                            title={piece.name}
                            image="assets/GNK_logo_azul.png"
                            description={piece.description}
                            footer={piece.brand}
                            haveImage
                        />
                    ))}
                </div>
            </Suspense>
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
