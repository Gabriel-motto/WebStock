import { Button, Card, Image, Text } from "@chakra-ui/react"

function ContentCard({ title, description, image, brand }) {
    return (
        <Card.Root>
            <Image src={image} alt={`Producto con referencia: ${title}`} padding="10px"/>
            <Card.Body gap="2">
                <Card.Title>{title}</Card.Title>
                <Card.Description>{description}</Card.Description>
                <Text textStyle="2x1" letterSpacing="tight" mt="2">
                    {brand}
                </Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="solid" colorPalette="blue">
                    Añadir
                </Button>
                <Button variant="ghost" colorPalette="red">
                    Eliminar
                </Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default ContentCard