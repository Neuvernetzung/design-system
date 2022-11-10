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
import { mergeRefs } from "../../../utils/internal/mergeRefs";
import { keyboardEvent } from "../../../utils/internal/keyboardEvent";

import {
  bgColors,
  paddingsEvenly,
  roundings,
  shadows,
  zIndexes,
} from "../../../styles";
import { Sizes } from "../../../types";
import type { ButtonProps } from "../Button";
import { Button } from "../Button";

export type PopoverProps = {
  content: ReactNode;
  buttonProps: ButtonProps;
  size?: keyof Sizes;
  trigger?: "click" | "hover";
};

const maxSizes: Sizes = {
  xs: "max-w-xs",
  sm: "max-w-xs sm:max-w-sm",
  md: "max-w-xs sm:max-w-sm lg:max-w-md",
  lg: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
  xl: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl",
};

interface ExtendedButton extends HTMLButtonElement {
  click(): any;
  dispatchEvent: any;
}

export const Popover = forwardRef<HTMLButtonElement, PopoverProps>(
  (
    { content, buttonProps, size = "md", trigger = "click" },
    ref: ForwardedRef<Element>
  ) => {
    const buttonRef = useRef<ExtendedButton>(null);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: "bottom-start",
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
            <HeadlessPopover.Button
              ref={mergeRefs([buttonRef, ref, setReferenceElement])}
              as={Button}
              {...buttonProps}
            />
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
                ref={setPopperElement}
                className={cn(
                  "absolute left-0 md:-mx-4 mt-3 w-screen overflow-hidden",
                  bgColors.white,
                  zIndexes.dropdown,
                  shadows.lg,
                  roundings.lg,
                  paddingsEvenly.xl,
                  maxSizes[size]
                )}
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

Popover.defaultProps = { size: "md" };
Popover.displayName = "Popover";

// export const PopoverButton = forwardRef<any, Element>((props, ref) => (
//   <HeadlessPopover.Button ref={ref} {...props} />
// ));

// PopoverButton.displayName = "Popover Button";
