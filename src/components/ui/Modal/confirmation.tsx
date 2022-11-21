import cn from "classnames";
import { FC, memo, MutableRefObject, ReactNode, SVGProps, useRef } from "react";
import create from "zustand";

import { gaps, gapsSmall } from "../../../styles";
import { Colors } from "../../../types";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Heading } from "../Typography";
import { Modal } from "./modal";

type ConfirmationState = {
  confirmation?: ConfirmationModalProps;
};

const useConfirmationState = create<ConfirmationState>(() => ({
  confirmation: undefined,
}));

export const requestConfirmation = (confirmation?: ConfirmationModalProps) => {
  useConfirmationState.setState({ confirmation });
};

export type ConfirmationModalProps = {
  icon?: FC<SVGProps<SVGSVGElement>>;
  heading: string;
  content?: string | ReactNode;
  color?: keyof Colors;
  cancelButton: ButtonProps;
  confirmButton: ButtonProps;
};

type ButtonProps = {
  onClick?: Function;
  children: ReactNode;
};

export const ConfirmationModal = () => {
  const confirmation = useConfirmationState((state) => state.confirmation);

  const confirmBtnRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const cancelBtnRef = useRef() as MutableRefObject<HTMLButtonElement>;

  if (!confirmation) return null;

  const reset = () => requestConfirmation();

  const {
    icon,
    heading,
    content,
    color = "primary",
    cancelButton,
    confirmButton,
  }: ConfirmationModalProps = confirmation;

  const handleCancel = () => {
    cancelButton?.onClick?.();
    reset();
  };

  const handleConfirm = () => {
    confirmButton?.onClick?.();
    reset();
  };

  return (
    <Modal
      open={!!confirmation}
      setOpen={reset}
      size="sm"
      initialFocus={
        color !== "danger" && color !== "warn" ? confirmBtnRef : cancelBtnRef
      }
      header={
        <div className={cn("flex flex-row", gapsSmall.md)}>
          {icon && <Icon color={color} icon={icon} />}
          <Heading>{heading}</Heading>
        </div>
      }
      content={content}
      footer={
        <div className={cn("flex flex-row w-full mt-4", gaps.md)}>
          <Button
            ref={cancelBtnRef}
            variant="outline"
            onClick={handleCancel}
            fullWidth
          >
            {cancelButton?.children}
          </Button>
          <Button
            ref={confirmBtnRef}
            onClick={handleConfirm}
            fullWidth
            color={color}
          >
            {confirmButton?.children}
          </Button>
        </div>
      }
    />
  );
};

export default memo(ConfirmationModal);

ConfirmationModal.defaultProps = {
  icon: undefined,
  content: undefined,
  color: "primary",
};
