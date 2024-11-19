import {
  Root,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
  type TooltipContentProps,
} from "@radix-ui/react-tooltip";
import { cn } from "@/utils";
import { ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";
import isString from "lodash/isString";

import {
  bgColors,
  extendedTextColors,
  paddingsSmall,
  roundings,
  shadows,
  tooltipAnimation,
  zIndexes,
} from "../../../styles";
import { offsetSizes } from "../../../styles/popper/offset";
import type { Size } from "../../../types";
import { Text } from "../Typography";

export type TooltipProps = {
  children: ReactElement;
  label?: ReactNode;
  size?: Size;
  side?: TooltipContentProps["side"];
  align?: TooltipContentProps["align"];
  delay?: number;
};

export const Tooltip = ({
  label,
  children,
  size = "sm",
  side = "top",
  align = "center",
  delay = 0,
}: TooltipProps) => {
  if (!label) return children;

  return (
    <TooltipProvider delayDuration={delay}>
      <Root>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side={side}
            align={align}
            sideOffset={offsetSizes[size]}
            className={cn(
              "pointer-events-none will-change-[transform,opacity]",
              zIndexes.tooltip,
              tooltipAnimation
            )}
          >
            <TooltipInner size={size} label={label} />
          </TooltipContent>
        </TooltipPortal>
      </Root>
    </TooltipProvider>
  );
};

type TooltipInnerT = {
  styles?: object;
  attributes?: object;
  size?: Size;
  label: ReactNode;
  className?: string;
};

export const TooltipInner = forwardRef<HTMLSpanElement, TooltipInnerT>(
  (
    { styles, attributes, size = "sm", label, className },
    ref: ForwardedRef<HTMLSpanElement>
  ) => (
    <span
      ref={ref}
      role="tooltip"
      className={cn(
        "flex",
        paddingsSmall[size],
        roundings[size],
        extendedTextColors.filled,
        bgColors.black,
        shadows.sm,
        zIndexes.tooltip,
        className
      )}
      style={styles}
      {...attributes}
    >
      {isString(label) ? (
        <Text size={size} color="inherit">
          {label}
        </Text>
      ) : (
        label
      )}
    </span>
  )
);

TooltipInner.displayName = "TooltipInner";
