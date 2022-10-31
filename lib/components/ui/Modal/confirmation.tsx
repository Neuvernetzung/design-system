import cn from "classnames";
import { ElementType, ReactNode, useRef } from "react";

import { gaps, gapsSmall } from "../../../styles";
import { Colors } from "../../../types";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Heading } from "../Typography";
import { Modal } from "./modal";

export type ConfirmationModalProps = {
  open: boolean;
  setOpen: Function;
  icon?: ElementType<SVGElement>;
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

export const ConfirmationModal = ({
  open,
  setOpen,
  icon,
  heading,
  content,
  color = "primary",
  cancelButton,
  confirmButton,
}: ConfirmationModalProps) => {
  const confirmBtnRef = useRef(null);
  const cancelBtnRef = useRef(null);

  const handleCancel = () => {
    cancelButton?.onClick?.();
    setOpen(false);
  };

  const handleConfirm = () => {
    confirmButton?.onClick?.();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
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

export default ConfirmationModal;

ConfirmationModal.defaultProps = {
  icon: undefined,
  content: undefined,
  color: "primary",
};
