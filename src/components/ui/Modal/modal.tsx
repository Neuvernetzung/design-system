import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  Root as DialogRoot,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { cn } from "@/utils";
import isString from "lodash/isString";
import type { FC, ReactElement, ReactNode, RefObject } from "react";
import { Fragment } from "react";

import {
  bgColors,
  borders,
  extendedBgColors,
  paddingsEvenly,
  pagePaddings,
  roundings,
  roundingsTop,
  shadows,
  transition,
  zIndexes,
} from "../../../styles";
import { useThemeStateValue } from "../../../theme/useThemeState";
import { ExtendedSize } from "../../../types";
import { Backdrop } from "../Backdrop";
import { Heading } from "../Typography/Heading";
import { Text } from "../Typography/Text";

export type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  header?: string | ReactNode;
  content?: string | ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  initialFocus?: RefObject<HTMLElement>;
  wrapper?: FC;
  forbidCancellation?: boolean;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  wrapperClassName?: string;
  children?: ReactElement;
};

export type ModalSize = Exclude<ExtendedSize, "4xl" | "5xl" | "6xl"> | "full";

const sizes: Record<ModalSize, string> = {
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
  forbidCancellation,
  headerClassName,
  contentClassName,
  footerClassName,
  wrapperClassName,
  children,
}: ModalProps) => {
  const pagePadding = useThemeStateValue((state) => state.pagePadding);

  const sectionStyles = cn("w-full flex", paddingsEvenly.lg);

  if (!open) return null;

  const Wrapper = wrapper || Fragment;

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogPortal>
        <DialogOverlay>
          <Backdrop isOpen={open} className={zIndexes.modal} />
          <div
            className={cn(
              "fixed inset-0 h-full overflow-y-auto",
              zIndexes.modal
            )}
          >
            <div
              className={cn(
                "flex min-h-full items-center justify-center",
                pagePaddings[pagePadding]
              )}
            >
              <DialogContent
                className={cn(
                  "w-full flex flex-col border h-full",
                  transition,
                  sizes[size],
                  roundings.lg,
                  shadows.xl,
                  bgColors.white,
                  borders.accent,
                  wrapperClassName
                )}
                onOpenAutoFocus={
                  initialFocus
                    ? (e) => {
                        e.preventDefault();
                        initialFocus.current?.focus();
                      }
                    : undefined
                }
                onPointerDownOutside={
                  forbidCancellation
                    ? (e) => {
                        e.preventDefault();
                      }
                    : undefined
                }
                onInteractOutside={
                  forbidCancellation
                    ? (e) => {
                        e.preventDefault();
                      }
                    : undefined
                }
                onEscapeKeyDown={
                  forbidCancellation
                    ? (e) => {
                        e.preventDefault();
                      }
                    : undefined
                }
              >
                <Wrapper>
                  {header && (
                    <DialogTitle asChild>
                      <div
                        className={cn(
                          sectionStyles,
                          extendedBgColors.subtile,
                          roundingsTop.lg,
                          headerClassName
                        )}
                      >
                        {isString(header) ? (
                          <Heading>{header}</Heading>
                        ) : (
                          header
                        )}
                      </div>
                    </DialogTitle>
                  )}
                  {content && (
                    <DialogDescription asChild>
                      <div className={cn(sectionStyles, contentClassName)}>
                        {isString(content) ? <Text>{content}</Text> : content}
                      </div>
                    </DialogDescription>
                  )}
                  {footer && (
                    <div className={cn(sectionStyles, footerClassName)}>
                      {footer}
                    </div>
                  )}
                </Wrapper>
              </DialogContent>
            </div>
          </div>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
};

export default Modal;
