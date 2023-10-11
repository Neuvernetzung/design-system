import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import type { Placement } from "@popperjs/core";
import { IconX } from "@tabler/icons-react";
import cn from "classnames";
import isNil from "lodash/isNil";
import {
  ElementType,
  ForwardedRef,
  forwardRef,
  Fragment,
  MouseEvent,
  MutableRefObject,
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
import { popperOffset } from "../../../styles/popper/offset";
import type { Size } from "../../../types";
import { typedMemo, useOutsideClick } from "../../../utils/internal";
import { mergeRefs } from "../../../utils/internal/mergeRefs";
import type { ButtonProps, IconButtonProps } from "../Button";
import { Button, IconButton } from "../Button";

export type UsePopoverProps = { defaultValue?: boolean };

export type ControlledPopoverProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  close: () => void;
};

export const usePopover = ({
  defaultValue,
}: UsePopoverProps): ControlledPopoverProps => {
  const [open, setOpen] = useState<boolean>(defaultValue ?? false);

  const close = () => setOpen(false);

  return { open, close, setOpen };
};

export type PopoverProps = {
  content: ReactNode;
  controller?: ControlledPopoverProps;
  buttonProps?: ButtonProps | IconButtonProps;
  buttonAs?: ElementType;
  buttonComponent?: ReactNode;
  size?: Size;
  trigger?: "click" | "hover";
  placement?: Placement;
  disabled?: boolean;
  focus?: boolean;
  panelClassName?: string;
  fullScreenOnMobile?: boolean;
  referenceElement?: MutableRefObject<HTMLElement | null>;
  disabledOffset?: boolean;
};

export const Popover = forwardRef<HTMLButtonElement, PopoverProps>(
  (
    {
      content,
      controller,
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
      referenceElement: _referenceElement,
      disabledOffset = false,
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const buttonRef = useRef<HTMLButtonElement>();
    const panelRef = useRef<HTMLDivElement>(null);
    const [referenceElement, setReferenceElement] =
      useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(
      null
    );

    useOutsideClick(panelRef, () => {
      if (isControlled) controller.close();
    });

    const isControlled = !isNil(controller);

    const offset = popperOffset({ size });

    const { styles, attributes } = usePopper(
      _referenceElement?.current || referenceElement,
      popperElement,
      {
        placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: disabledOffset ? [0, 0] : offset,
            },
          },
        ],
      }
    );

    const timeoutDuration: number = 250;
    let timeout: ReturnType<typeof setTimeout>;

    const onMouseEnter = (open: boolean) => {
      clearTimeout(timeout);
      if (open) return;
      return buttonRef.current?.click();
    };

    const onMouseLeave = (
      open: boolean,
      close: (
        focusableElement?:
          | HTMLElement
          | MutableRefObject<HTMLElement | null>
          | MouseEvent<HTMLElement>
      ) => void
    ) => {
      if (!open) return;
      timeout = setTimeout(() => close(), timeoutDuration);
    };

    return (
      <HeadlessPopover className="relative">
        {({ open, close }) => (
          <div
            onMouseEnter={
              trigger === "hover"
                ? () => onMouseEnter(isControlled ? controller.open : open)
                : () => {}
            }
            onMouseLeave={
              trigger === "hover"
                ? () =>
                    onMouseLeave(
                      isControlled ? controller.open : open,
                      isControlled ? controller.close : close
                    )
                : () => {}
            }
          >
            {!buttonComponent ? (
              <HeadlessPopover.Button
                onClick={
                  isControlled ? () => controller.setOpen(true) : undefined
                }
                className={cn(focusStyle.accent)}
                ref={mergeRefs([
                  buttonRef,
                  ref,
                  ...(!_referenceElement ? [setReferenceElement] : []),
                ])}
                as={buttonAs || Button}
                disabled={disabled}
                {...buttonProps}
              />
            ) : (
              <HeadlessPopover.Button
                onClick={
                  isControlled ? () => controller.setOpen(true) : undefined
                }
                aria-disabled={disabled}
                disabled={disabled}
                as="span"
                ref={mergeRefs([buttonRef, ref, setReferenceElement])}
              >
                {buttonComponent}
              </HeadlessPopover.Button>
            )}
            <Transition
              as={Fragment}
              show={isControlled ? controller.open : open}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <HeadlessPopover.Panel
                as="span"
                focus={focus}
                static={isControlled}
                ref={panelRef}
              >
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
                    <IconButton
                      ariaLabel="close_popover"
                      icon={IconX}
                      variant="ghost"
                      onClick={() =>
                        isControlled ? controller.close() : close()
                      } // wenn hier ein PopoverButton verwendet wird, dann lässt sich Button nicht mehr per Klick schließen
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

export default typedMemo(Popover);

Popover.displayName = "Popover";

export const PopoverButton = forwardRef<Element, any>((props, ref) => (
  <HeadlessPopover.Button ref={ref} {...props} />
));

PopoverButton.displayName = "Popover Button";
