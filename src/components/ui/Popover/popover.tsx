import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import cn from "classnames";
import {
  Fragment,
  memo,
  ReactNode,
  useState,
  forwardRef,
  useRef,
  ForwardedRef,
} from "react";
import { usePopper } from "react-popper";
import type { Placement } from "@popperjs/core";
import { mergeRefs } from "../../../utils/internal/mergeRefs";
import { keyboardEvent } from "../../../utils/internal/keyboardEvent";

import { focus as focusStyle } from "../../../styles";
import { Sizes } from "../../../types";
import type { ButtonProps } from "../Button";
import { Button } from "../Button";
import { getPopoverContainerStyles } from "../../../styles/groups";

export type PopoverProps = {
  content: ReactNode;
  buttonProps?: ButtonProps;
  buttonAs?: Element;
  buttonComponent?: ReactNode;
  size?: keyof Sizes;
  trigger?: "click" | "hover";
  placement?: Placement;
  disabled?: boolean;
  focus?: boolean;
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
      placement = "bottom-start",
      disabled,
      focus = false,
    },
    ref: ForwardedRef<Element>
  ) => {
    const buttonRef = useRef<ExtendedButton>(null);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
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

    const closePopover = () => {
      return buttonRef.current?.dispatchEvent(keyboardEvent("Escape"));
    };

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
              <HeadlessPopover.Panel
                focus={focus}
                ref={setPopperElement}
                className={cn(getPopoverContainerStyles({ size }))}
                style={styles.popper}
                {...attributes.popper}
              >
                {content}
              </HeadlessPopover.Panel>
            </Transition>
          </div>
        )}
      </HeadlessPopover>
    );
  }
);

export default memo(Popover);

Popover.defaultProps = { size: "md", focus: false };
Popover.displayName = "Popover";

export const PopoverButton = forwardRef<any, Element>((props, ref) => (
  <HeadlessPopover.Button ref={ref} {...props} />
));

PopoverButton.displayName = "Popover Button";
