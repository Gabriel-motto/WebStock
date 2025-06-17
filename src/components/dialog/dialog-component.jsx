import { Dialog, Portal, CloseButton } from "@chakra-ui/react";

export default function DialogComponent({ title, content, close, ...props }) {
    return (
        <Dialog.Root
            {...props}
            onInteractOutside={close}
            onEscapeKeyDown={close}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title fontSize="2xl" fontWeight="medium">{title}</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="md" onClick={close}/>
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>{content}</Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
