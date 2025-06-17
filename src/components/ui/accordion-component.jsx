import { Accordion } from "@chakra-ui/react";

export function AccordionComponent({ content, component, ...props }) {
    return (
        <Accordion.Root
            collapsible
            {...props}>
            {content.map((item, index) => (
                <Accordion.Item
                    key={index}
                    value={item}>
                    <Accordion.ItemTrigger>
                        {item}
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>{component}</Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
}
