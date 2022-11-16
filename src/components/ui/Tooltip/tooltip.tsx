import { Placement } from "@popperjs/core";
import cn from "classnames";
import isString from "lodash/isString";
import { memo, ReactNode, useState } from "react";
import { usePopper } from "react-popper";

import { bgColors, paddingsSmall, roundings, shadows } from "../../../styles";
import { Sizes } from "../../../types";
import { Text } from "../Typography";

export type TooltipProps = {
  children: ReactNode;
  label: ReactNode;
  size?: keyof Sizes;
  placement?: Placement;
};

export const Tooltip = ({
  label,
  children,
  size = "sm",
  placement = "top",
}: TooltipProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  });

  return (
    <span ref={setReferenceElement} className="relative group">
      {children}
      <span
        role="tooltip"
        ref={setPopperElement}
        className={cn(
          "absolute invisible group-hover:visible pointer-events-none my-2 bg-opacity-75",
          paddingsSmall[size],
          roundings[size],
          bgColors.black,
          shadows.sm,
          isString(label) && label.length < 50 ? "max-w-[12rem]" : "w-64"
        )}
        style={styles.popper}
        {...attributes.popper}
      >
        <Text size={size} color="filled">
          {label}
        </Text>
      </span>
    </span>
  );
};

export default memo(Tooltip);

Tooltip.defaultProps = {
  size: "sm",
  placement: "top",
};
