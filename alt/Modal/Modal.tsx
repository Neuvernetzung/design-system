import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import { Button } from "../Button";
import { Stack } from "../Containers";

type ModalProps = {
  open: boolean;
  setOpen: Function;
  onCancel?: Function;
  onSubmit?: Function;
  title: string;
  content?: ReactNode;
  size?: string;
  type?: "primary" | "warning" | "danger";
};

export const Modal = ({
  open,
  setOpen,
  onCancel,
  onSubmit,
  title,
  content,
  size = "2xl",
  type = "primary",
}: ModalProps) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
    setOpen(false);
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit();
    setOpen(false);
  };

  const typeColors = {
    primary: "primary",
    warning: "yellow",
    danger: "red",
  };

  return (
    <ChakraModal onClose={handleCancel} isOpen={open} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Stack direction="row" width="full">
            <Button onClick={handleCancel} width="full">
              Abbrechen
            </Button>
            <Button
              colorScheme={typeColors[type]}
              width="full"
              onClick={handleSubmit}
            >
              Bestätigen
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

Modal.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
  content: undefined,
  size: "2xl",
  type: "primary",
};
