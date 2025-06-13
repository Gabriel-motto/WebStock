import { Dialog, Portal, CloseButton, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function DialogComponent({ textButton, title, content }) {
    return (
        <Dialog.Root
            size="cover"
            placement="center"
            motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
                <Button
                    className="dialog-button"
                    variant="ghost"
                    size="sm">
                    {textButton}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>{content}</Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export function DialogComponentEx({ title, content, show, close }) {
    return (
        <Dialog.Root
            lazyMount
            open={show}
            size="cover"
            placement="center"
            motionPreset="slide-in-bottom">
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" onClick={close}/>
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>{content}</Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
