import { Placement } from "@popperjs/core";
import cn from "classnames";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { bgColors, paddingsSmall, roundings, shadows } from "../../../styles";
import { popperOffset } from "../../../styles/popper/offset";
import { Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Text } from "../Typography";

export type TooltipProps = {
  children: ReactElement;
  label?: ReactNode;
  size?: keyof Sizes;
  placement?: Placement;
  delay?: number;
};

export const Tooltip = ({
  label,
  children,
  size = "sm",
  placement = "top",
  delay = 0,
}: TooltipProps) => {
  const [hover, setHover] = useState<boolean>(false);
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
    <>
      <span
        onMouseEnter={() => setTimeout(() => setHover(true), delay)}
        onMouseLeave={() => setHover(false)}
        ref={setReferenceElement}
      >
        {children}
      </span>
      <LazyMotion features={domAnimation}>
        {createPortal(
          <AnimatePresence>
            {hover && (
              <TooltipInner
                ref={setPopperElement}
                styles={styles.popper}
                attributes={attributes.popper}
                size={size}
                label={label}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
      </LazyMotion>
    </>
  );
};

export default typedMemo(Tooltip);

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
      <m.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
        role="tooltip"
        ref={ref || setInnerPopperElement}
        className={cn(
          "pointer-events-none bg-opacity-75 flex",
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
      </m.span>
    );
  }
);

TooltipInner.displayName = "TooltipInner";
