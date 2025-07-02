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
import "./Pieces.css";

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

function handleSubmit({ formData }) {
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

const CardComponent = lazy(() => import("../../components/card/Card.jsx"));

function PiecesPage() {
    const [workshop, setWorkshop] = useState({ value: "all" });
    const [pieces, setPieces] = useState([]);
    const [filteredPieces, setFilteredPieces] = useState([]);
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [selectedCardData, setSelectedCardData] = useState();

    useEffect(() => {
        async function getPieces() {
            const { data: pieces } = await supabase.from("Pieces").select();
            setPieces(pieces);
        }
        getPieces();
    }, []);

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

    useEffect(() => {
        workshop.value === "all"
            ? setFilteredPieces(pieces)
            : setFilteredPieces(
                  pieces.filter((piece) => piece.workshop === workshop.value)
              );
    }, [pieces]);

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
                    {filteredPieces.map((piece, index) => (
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
