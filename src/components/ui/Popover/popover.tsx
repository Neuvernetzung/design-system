import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import cn from "classnames";
import { Fragment, memo, ReactNode, useState } from "react";
import { usePopper } from "react-popper";

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
};

const maxSizes: Sizes = {
  xs: "max-w-xs",
  sm: "max-w-xs sm:max-w-sm",
  md: "max-w-xs sm:max-w-sm lg:max-w-md",
  lg: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
  xl: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl",
};

export const Popover = ({
  content,
  buttonProps,
  size = "md",
}: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
  });

  return (
    <HeadlessPopover className="relative">
      <HeadlessPopover.Button
        ref={setReferenceElement}
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
    </HeadlessPopover>
  );
};

export default memo(Popover);

Popover.defaultProps = { size: "md" };
