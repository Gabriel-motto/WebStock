import "./PiecesDetails.css";
import { Image, Text, Badge, Separator } from "@chakra-ui/react";

export default function PiecesDetails({ data }) {
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
                            color="fg"
                        >
                            {data.name}
                        </Text>
                        <Text
                            fontWeight="medium"
                            color="fg.muted"
                        >
                            {data.brand}
                        </Text>
                    </div>
                    <Text
                        className="description-box"
                        fontSize="18px"
                        letterSpacing="wide"
                    >
                        {data.description}
                    </Text>
                    {data.workshop !== null && (
                        <Badge
                            colorPalette="teal"
                            variant="solid"
                            className="workshop-badge"
                            size="lg"
                        >
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
