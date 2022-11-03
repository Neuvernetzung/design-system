import { Dialog, Transition } from "@headlessui/react";
import cn from "classnames";
import isString from "lodash/isString.js";
import { Fragment, MutableRefObject, ReactNode } from "react";

import {
  bgColors,
  paddings,
  paddingsEvenly,
  pagePaddings,
  roundings,
  shadows,
  transition,
  zIndexes,
} from "../../../styles";
import { Sizes } from "../../../types";
import { Heading, Text } from "../Typography";

export type ModalProps = {
  open: boolean;
  setOpen: Function;
  header?: string | ReactNode;
  content?: string | ReactNode;
  footer?: ReactNode;
  size?: keyof Sizes;
  initialFocus?: MutableRefObject<Element>;
};

const sizes: Sizes = {
  xs: "max-w-md",
  sm: "max-w-lg",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

export const Modal = ({
  open,
  setOpen,
  header,
  content,
  footer,
  size = "md",
  initialFocus,
}: ModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const sectionStyles = cn("w-full flex", paddings[size]);

  if (!open) return null;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={initialFocus}
        className={cn("relative", zIndexes.modal)}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={cn(
              "fixed inset-0 bg-opacity-25 bg-black backdrop-blur-sm"
            )}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={cn(
              "flex min-h-full items-center justify-center text-center",
              pagePaddings
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
                  "w-full flex flex-col max-h-[80vh]",
                  transition,
                  sizes[size],
                  roundings.lg,
                  shadows.xl,
                  bgColors.white,
                  paddingsEvenly.md
                )}
              >
                {header && (
                  <div className={sectionStyles}>
                    {isString(header) ? <Heading>{header}</Heading> : header}
                  </div>
                )}
                {content && (
                  <div className={cn(sectionStyles, "overflow-y-scroll")}>
                    {isString(content) ? <Text>{content}</Text> : content}
                  </div>
                )}
                {footer && <div className={sectionStyles}>{footer}</div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

Modal.defaultProps = {
  header: undefined,
  content: undefined,
  footer: undefined,
  size: "md",
  initialFocus: undefined,
};
