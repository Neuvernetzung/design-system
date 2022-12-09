import { Placement } from "@popperjs/core";
import cn from "classnames";
import {
  ForwardedRef,
  forwardRef,
  memo,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { usePopper } from "react-popper";

import { bgColors, paddingsSmall, roundings, shadows } from "../../../styles";
import { Sizes } from "../../../types";
import { Text } from "../Typography";

export type TooltipProps = {
  children: ReactElement;
  label?: ReactNode;
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

  if (!label) return children;

  return (
    <span ref={setReferenceElement} className="relative group-tooltip">
      {children}
      <TooltipInner
        ref={setPopperElement}
        styles={styles.popper}
        attributes={attributes.popper}
        size={size}
        label={label}
      />
    </span>
  );
};

export default memo(Tooltip);

type TooltipInnerT = {
  styles?: object;
  attributes?: object;
  size?: keyof Sizes;
  label: ReactNode;
};

export const TooltipInner = forwardRef<HTMLSpanElement, TooltipInnerT>(
  (
    { styles, attributes, size = "md", label },
    ref: ForwardedRef<HTMLSpanElement>
  ) => (
    <span
      role="tooltip"
      ref={ref}
      className={cn(
        "absolute invisible [.group-tooltip:hover_&]:visible pointer-events-none my-2 bg-opacity-75",
        paddingsSmall[size],
        roundings[size],
        bgColors.black,
        shadows.sm
      )}
      style={styles}
      {...attributes}
    >
      <Text size={size} color="filled">
        {label}
      </Text>
    </span>
  )
);

TooltipInner.displayName = "TooltipInner";
