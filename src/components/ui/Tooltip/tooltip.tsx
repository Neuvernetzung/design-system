import {
  PopperContentProps,
  Root,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { cn } from "@/utils";
import { ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";

import {
  bgColors,
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
  side?: PopperContentProps["side"];
  align?: PopperContentProps["align"];
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

        bgColors.black,
        shadows.sm,
        zIndexes.tooltip,
        className
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
