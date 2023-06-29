import { Dialog, Transition } from "@headlessui/react";
import cn from "classnames";
import isString from "lodash/isString";
import { FC, Fragment, MutableRefObject, ReactNode } from "react";

import {
  bgColors,
  borders,
  extendedBgColors,
  paddingsEvenly,
  paddingsY,
  pagePaddings,
  roundings,
  roundingsTop,
  shadows,
  transition,
  zIndexes,
} from "../../../styles";
import { ExtendedSizes, Sizes } from "../../../types";
import { Backdrop } from "../Backdrop";
import { Heading, Text } from "../Typography";

export type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  header?: string | ReactNode;
  content?: string | ReactNode;
  footer?: ReactNode;
  size?: keyof ModalSizes;
  initialFocus?: MutableRefObject<HTMLElement | null>;
  wrapper?: FC;
  onClose?: Function;
  forbidCancellation?: boolean;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  wrapperClassName?: string;
};

export interface ModalSizes extends Sizes, Pick<ExtendedSizes, "2xl" | "3xl"> {
  full: any;
}

const sizes: ModalSizes = {
  xs: "max-w-md",
  sm: "max-w-lg",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
  "2xl": "max-w-4xl",
  "3xl": "max-w-5xl",
  full: "max-w-none",
};

export const Modal = ({
  open,
  setOpen,
  header,
  content,
  footer,
  size = "md",
  initialFocus,
  wrapper,
  onClose,
  forbidCancellation,
  headerClassName,
  contentClassName,
  footerClassName,
  wrapperClassName,
}: ModalProps) => {
  const handleClose = () => {
    if (forbidCancellation) return;
    onClose?.();
    setOpen(false);
  };

  const sectionStyles = cn("w-full flex", paddingsEvenly.lg);

  if (!open) return null;

  const Wrapper = wrapper || Fragment;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={initialFocus}
        className={cn("relative", zIndexes.modal)}
        onClose={handleClose}
      >
        <Backdrop />

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={cn(
              "flex min-h-full items-center justify-center",
              pagePaddings.md,
              paddingsY.lg
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  "w-full flex flex-col border",
                  transition,
                  sizes[size],
                  roundings.lg,
                  shadows.xl,
                  bgColors.white,
                  borders.accent,
                  wrapperClassName
                )}
              >
                <Wrapper>
                  {header && (
                    <div
                      className={cn(
                        sectionStyles,
                        extendedBgColors.subtile,
                        roundingsTop.lg,
                        headerClassName
                      )}
                    >
                      {isString(header) ? <Heading>{header}</Heading> : header}
                    </div>
                  )}
                  {content && (
                    <div className={cn(sectionStyles, contentClassName)}>
                      {isString(content) ? <Text>{content}</Text> : content}
                    </div>
                  )}
                  {footer && (
                    <div className={cn(sectionStyles, footerClassName)}>
                      {footer}
                    </div>
                  )}
                </Wrapper>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
