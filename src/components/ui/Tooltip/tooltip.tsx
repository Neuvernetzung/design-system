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
import { popperOffset } from "../../../styles/popper/offset";
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
    modifiers: [
      {
        name: "offset",
        options: {
          offset: popperOffset,
        },
      },
    ],
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
        className="invisible [.group-tooltip:hover_&]:visible"
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
  className?: string;
};

export const TooltipInner = forwardRef<HTMLSpanElement, TooltipInnerT>(
  (
    { styles, attributes, size = "sm", label, className },
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    const [innerPopperElement, setInnerPopperElement] =
      useState<HTMLElement | null>(null);
    const { styles: innerStyles, attributes: innerAttributes } = usePopper(
      undefined,
      innerPopperElement
    );

    return (
      <span
        role="tooltip"
        ref={ref || setInnerPopperElement}
        className={cn(
          "absolute pointer-events-none bg-opacity-75",
          paddingsSmall[size],
          roundings[size],
          bgColors.black,
          shadows.sm,
          className
        )}
        style={styles || innerStyles}
        {...(attributes || innerAttributes)}
      >
        <Text size={size} color="filled">
          {label}
        </Text>
      </span>
    );
  }
);

TooltipInner.displayName = "TooltipInner";
