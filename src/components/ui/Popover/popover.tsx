import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import type { Placement } from "@popperjs/core";
import cn from "classnames";
import {
  ElementType,
  ForwardedRef,
  forwardRef,
  Fragment,
  memo,
  ReactNode,
  useRef,
  useState,
} from "react";
import { usePopper } from "react-popper";

import { focus as focusStyle } from "../../../styles";
import {
  getPopoverContainerStyles,
  getPopoverFullScreenContainerStyles,
  getPopoverFullScreenHeaderStyles,
  getPopoverFullScreenStyles,
} from "../../../styles/groups";
import { CrossIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { keyboardEvent } from "../../../utils/internal/keyboardEvent";
import { mergeRefs } from "../../../utils/internal/mergeRefs";
import type { ButtonProps, IconButtonProps } from "../Button";
import { Button, IconButton } from "../Button";

export type PopoverProps = {
  content: ReactNode;
  buttonProps?: ButtonProps | IconButtonProps;
  buttonAs?: ElementType<any>;
  buttonComponent?: ReactNode;
  size?: keyof Sizes;
  trigger?: "click" | "hover";
  placement?: Placement;
  disabled?: boolean;
  focus?: boolean;
  panelClassName?: string;
  fullScreenOnMobile?: boolean;
};

interface ExtendedButton extends HTMLButtonElement {
  click(): any;
  dispatchEvent: any;
}

export const Popover = forwardRef<HTMLButtonElement, PopoverProps>(
  (
    {
      content,
      buttonProps,
      buttonAs,
      buttonComponent,
      size = "md",
      trigger = "click",
      placement = "bottom",
      disabled,
      focus = false,
      panelClassName,
      fullScreenOnMobile = false,
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const buttonRef = useRef<ExtendedButton>(null);
    const [referenceElement, setReferenceElement] =
      useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(
      null
    );
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement,
    });

    const timeoutDuration: number = 250;
    let timeout: ReturnType<typeof setTimeout>;

    const onMouseEnter = (open: boolean) => {
      clearTimeout(timeout);
      if (open) return;
      return buttonRef.current?.click();
    };

    const onMouseLeave = (open: boolean) => {
      if (!open) return;
      timeout = setTimeout(() => closePopover(), timeoutDuration);
    };

    const closePopover = () =>
      buttonRef.current?.dispatchEvent(keyboardEvent("Escape"));

    return (
      <HeadlessPopover className="relative">
        {({ open }) => (
          <div
            onMouseEnter={
              trigger === "hover" ? onMouseEnter.bind(null, open) : () => {}
            }
            onMouseLeave={
              trigger === "hover" ? onMouseLeave.bind(null, open) : () => {}
            }
          >
            {!buttonComponent ? (
              <HeadlessPopover.Button
                className={cn(focusStyle.accent)}
                ref={mergeRefs([buttonRef, ref, setReferenceElement])}
                as={buttonAs || Button}
                disabled={disabled}
                {...buttonProps}
              />
            ) : (
              <HeadlessPopover.Button
                aria-disabled={disabled}
                as="span"
                ref={mergeRefs([buttonRef, ref, setReferenceElement])}
              >
                {buttonComponent}
              </HeadlessPopover.Button>
            )}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <HeadlessPopover.Panel as="span" focus={focus}>
                <div
                  ref={setPopperElement}
                  className={cn(
                    !fullScreenOnMobile ? "block" : "hidden md:block",
                    getPopoverContainerStyles({ size }),
                    panelClassName
                  )}
                  style={styles.popper}
                  {...attributes.popper}
                >
                  {content}
                </div>
                <div
                  className={cn(
                    fullScreenOnMobile ? "block md:hidden" : "hidden",
                    getPopoverFullScreenStyles(),
                    panelClassName
                  )}
                >
                  <div className={cn(getPopoverFullScreenHeaderStyles())}>
                    <PopoverButton
                      as={IconButton}
                      icon={CrossIcon}
                      variant="ghost"
                    />
                  </div>
                  <div className={cn(getPopoverFullScreenContainerStyles())}>
                    {content}
                  </div>
                </div>
              </HeadlessPopover.Panel>
            </Transition>
          </div>
        )}
      </HeadlessPopover>
    );
  }
);

export default memo(Popover);

Popover.defaultProps = {
  size: "md",
  focus: false,
  buttonProps: undefined,
  buttonAs: undefined,
  buttonComponent: undefined,
  trigger: "click",
  placement: "bottom",
  disabled: undefined,
  panelClassName: undefined,
  fullScreenOnMobile: false,
};
Popover.displayName = "Popover";

export const PopoverButton = forwardRef<Element, any>((props, ref) => (
  <HeadlessPopover.Button ref={ref} {...props} />
));

PopoverButton.displayName = "Popover Button";
