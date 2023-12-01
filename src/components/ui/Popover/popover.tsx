import type {
  PopoverAnchorProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverPortalProps,
  PopoverProps as PopoverRootProps,
  PopoverTriggerProps,
} from "@radix-ui/react-popover";
import {
  Close as PopoverClose,
  Content as PopoverContent,
  PopoverAnchor,
  PopperContentProps,
  Portal as PopoverPortal,
  Root as PopoverRoot,
  Trigger as PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/utils";
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useState,
} from "react";

import { focus as focusStyle } from "../../../styles";
import { popoverAnimation } from "../../../styles/animation";
import { getPopoverContainerStyles } from "../../../styles/groups";
import { offsetSizes } from "../../../styles/popper/offset";
import type { Size } from "../../../types";
import type { ButtonProps } from "../Button";
import { Button } from "../Button";

export type UsePopoverProps = { defaultValue?: boolean };

export type ControlledPopoverProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  close: () => void;
};

export const usePopover = (props?: UsePopoverProps): ControlledPopoverProps => {
  const [open, setOpen] = useState<boolean>(props?.defaultValue ?? false);

  const close = () => setOpen(false);

  return { open, close, setOpen };
};

export type PopoverProps = {
  content: ReactNode;
  controller?: ControlledPopoverProps;
  size?: Size;
  align?: PopperContentProps["align"];
  side?: PopperContentProps["side"];
  disabled?: boolean;
  panelClassName?: string;
  positionAgainstRelativeParent?: boolean;
  fullWidth?: boolean;
  popoverRootProps?: PopoverRootProps;
  popoverAnchorProps?: PopoverAnchorProps;
  popoverTriggerProps?: PopoverTriggerProps;
  popoverContentProps?: PopoverContentProps;
  popoverPortalProps?: PopoverPortalProps;
} & PopoverOwnTriggerProps;

export type PopoverOwnTriggerProps =
  | { buttonProps?: ButtonProps; buttonComponent?: never }
  | { buttonProps?: never; buttonComponent: ReactNode };

export const Popover = forwardRef(
  (
    {
      content,
      controller,
      buttonProps,
      buttonComponent,
      size = "md",
      align = "center",
      side = "bottom",
      disabled,
      panelClassName,
      positionAgainstRelativeParent,
      fullWidth,
      popoverRootProps,
      popoverAnchorProps,
      popoverTriggerProps,
      popoverContentProps,
      popoverPortalProps,
    }: PopoverProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <PopoverRoot
      open={controller?.open}
      onOpenChange={controller?.setOpen}
      {...popoverRootProps}
    >
      {positionAgainstRelativeParent && (
        <PopoverAnchor asChild {...popoverAnchorProps}>
          <div className="absolute w-full h-full inset-0 pointer-events-none" />
        </PopoverAnchor>
      )}
      <PopoverTrigger
        aria-disabled={disabled}
        disabled={disabled}
        ref={ref}
        asChild
        {...popoverTriggerProps}
      >
        {buttonComponent || <Button {...buttonProps} />}
      </PopoverTrigger>
      <PopoverPortal {...popoverPortalProps}>
        <PopoverContent
          align={align}
          side={side}
          sideOffset={offsetSizes[size]}
          asChild
          {...popoverContentProps}
        >
          <div
            className={cn(
              getPopoverContainerStyles({ size, fullWidth }),
              focusStyle,
              popoverAnimation,
              panelClassName
            )}
          >
            {content}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  )
);

Popover.displayName = "Popover";

export type PopoverButtonProps = {
  children: ReactElement;
} & PopoverCloseProps;

export const PopoverButton = forwardRef(
  (
    { children, ...props }: PopoverButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <PopoverClose ref={ref} asChild {...props}>
      {children}
    </PopoverClose>
  )
);

PopoverButton.displayName = "Popover Button";
