import { EmptyState, VStack } from "@chakra-ui/react";
import { TbError404Off } from "react-icons/tb";

export function EmptyError({ description = "Error inesperado" }) {
    return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <TbError404Off />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>ERROR</EmptyState.Title>
                    <EmptyState.Description>
                        {description}
                    </EmptyState.Description>
                </VStack>
            </EmptyState.Content>
        </EmptyState.Root>
    );
}
