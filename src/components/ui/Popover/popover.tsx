import {
  Close as PopoverClose,
  Content as PopoverContent,
  PopperContentProps,
  Portal as PopoverPortal,
  Root as PopoverRoot,
  Trigger as PopoverTrigger,
  PopoverAnchor,
} from "@radix-ui/react-popover";
import cn from "classnames";
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useState,
} from "react";

import { focus as focusStyle } from "../../../styles";
import { getPopoverContainerStyles } from "../../../styles/groups";
import { offsetSizes } from "../../../styles/popper/offset";
import type { Size } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import type { ButtonProps } from "../Button";
import { Button } from "../Button";
import { popoverAnimation } from "../../../styles/animation";

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
} & PopoverTriggerProps;

export type PopoverTriggerProps =
  | { buttonProps?: ButtonProps; buttonComponent?: never }
  | { buttonProps?: never; buttonComponent: ReactNode };

export const Popover = forwardRef<HTMLButtonElement, PopoverProps>(
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
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <PopoverRoot open={controller?.open} onOpenChange={controller?.setOpen}>
      {positionAgainstRelativeParent && (
        <PopoverAnchor asChild>
          <div className="absolute w-full h-full inset-0 pointer-events-none" />
        </PopoverAnchor>
      )}
      <PopoverTrigger
        aria-disabled={disabled}
        disabled={disabled}
        ref={ref}
        asChild
      >
        {buttonComponent || <Button {...buttonProps} />}
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          align={align}
          side={side}
          sideOffset={offsetSizes[size]}
          asChild
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

export default typedMemo(Popover);

Popover.displayName = "Popover";

export type PopoverButtonProps = {
  children: ReactElement;
};

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
