import { Card, Button, Image, Text } from "@chakra-ui/react";
import "./card-component.css";

export function CardComponent({ title, description, footer }) {
    return (
        <Card.Root className="content-card">
            <Card.Body
                gap="2"
                className="body">
                <Card.Title className="title">{title}</Card.Title>
                <Card.Description
                    className="description"
                    lineClamp="3">
                    {description}
                </Card.Description>
            </Card.Body>
            <Card.Footer>
                <Text
                    className="footer"
                    textStyle="2xl"
                    letterSpacing="tight"
                    mt="2">
                    {footer}
                </Text>
            </Card.Footer>
        </Card.Root>
    );
}

export function CardComponentImage({
    title,
    image,
    description,
    footer,
    ...props
}) {
    return (
        <Card.Root
            className="content-card"
            {...props}>
            <Image
                src={image}
                alt={`Producto con referencia: ${title}`}
                padding="10px"
            />
            <Card.Body
                gap="2"
                className="body">
                <Card.Title className="title" fontWeight="medium">{title}</Card.Title>
                <Card.Description
                    className="description"
                    lineClamp="3">
                    {description}
                </Card.Description>
            </Card.Body>
            <Card.Footer>
                <Text
                    className="brand"
                    textStyle="2xl"
                    letterSpacing="tight"
                    mt="2">
                    {footer}
                </Text>
            </Card.Footer>
        </Card.Root>
    );
}
