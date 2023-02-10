import cn from "classnames";
import { useRouter } from "next/router";
import { FC, memo, MutableRefObject, ReactNode, SVGProps, useRef } from "react";
import { create } from "zustand";

import { getText, Locales } from "../../../locales/getText";
import { gaps } from "../../../styles";
import { Colors } from "../../../types";
import { Button } from "../Button";
import { Tag } from "../Tag";
import { Heading } from "../Typography";
import { Modal } from "./modal";

type ConfirmationState = {
  confirmation?: ConfirmationModalProps;
};

const useConfirmationState = create<ConfirmationState>(() => ({
  confirmation: undefined,
}));

export const confirmation = (confirmation?: ConfirmationModalProps) => {
  useConfirmationState.setState({ confirmation });
};

export type ConfirmationModalProps = {
  icon?: FC<SVGProps<SVGSVGElement>>;
  heading: string;
  content?: string | ReactNode;
  color?: keyof Colors;
  confirm: Function;
  cancel?: Function;
  confirmButton?: ReactNode;
  cancelButton?: ReactNode;
  forbidCancellation?: boolean;
};

export const ConfirmationModal = () => {
  const locale = useRouter().locale as Locales;

  const confirmationState = useConfirmationState((state) => state.confirmation);

  const confirmBtnRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const cancelBtnRef = useRef() as MutableRefObject<HTMLButtonElement>;

  if (!confirmationState) return null;

  const reset = () => confirmation();

  const {
    icon,
    heading,
    content,
    color = "primary",
    confirm,
    cancel,
    confirmButton,
    cancelButton,
    forbidCancellation,
  }: ConfirmationModalProps = confirmationState;

  const handleConfirm = () => {
    confirm?.();
    reset();
  };

  const handleCancel = () => {
    cancel?.();
    reset();
  };

  return (
    <Modal
      open={!!confirmationState}
      onClose={handleCancel}
      setOpen={reset}
      size="sm"
      initialFocus={
        color !== "danger" && color !== "warn" ? confirmBtnRef : cancelBtnRef
      }
      forbidCancellation={forbidCancellation}
      header={
        <div className={cn("flex flex-row items-center", gaps.md)}>
          {icon && (
            <Tag color={color} variant="subtile" rounded leftIcon={icon} />
          )}
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
            {cancelButton || getText(locale).cancel}
          </Button>
          <Button
            ref={confirmBtnRef}
            onClick={handleConfirm}
            fullWidth
            color={color}
          >
            {confirmButton || getText(locale).confirm}
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
