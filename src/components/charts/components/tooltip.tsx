import { TooltipInPortalProps } from "@visx/tooltip/lib/hooks/useTooltipInPortal";
import cn from "classnames";
import { AnimatePresence, m, SVGMotionProps } from "framer-motion";
import { FC, ReactNode } from "react";

import { extendedTextColors, fillColors, textColors } from "../../../styles";
import { TooltipInner } from "../../ui/Tooltip";

export type ChartTooltipProps = {
  tooltipLeft: number;
  tooltipTop: number;
  tooltipData?: unknown;
  tooltipLabel: ReactNode;
  TooltipInPortal: FC<TooltipInPortalProps>;
};

export const ChartTooltip = ({
  tooltipLeft,
  tooltipTop,
  tooltipData,
  tooltipLabel,
  TooltipInPortal,
}: ChartTooltipProps) => (
  <AnimatePresence>
    {tooltipData !== undefined ? (
      <TooltipInPortal
        // key={Math.random()}
        left={tooltipLeft}
        top={tooltipTop}
        style={{}}
        className={cn("absolute pointer-events-none")}
      >
        <TooltipInner label={tooltipLabel} />
      </TooltipInPortal>
    ) : null}
  </AnimatePresence>
);

export type ChartTooltipHoverOwnProps = {
  width: number;
  height: number;
  tooltipLeft: number;
  tooltipTop: number;
  tooltipData: unknown;
};

export type ChartTooltipHoverProps = {
  disableHorizontalHoverLine?: boolean;
  disableVerticalHoverLine?: boolean;
  disableHoverCircle?: boolean;
  hoverLineProps?: SVGMotionProps<SVGLineElement>;
  hoverLineHorizontalProps?: SVGMotionProps<SVGLineElement>;
  hoverLineVerticalProps?: SVGMotionProps<SVGLineElement>;
  hoverCircleProps?: SVGMotionProps<SVGCircleElement>;
};

export const ChartTooltipHover = ({
  width,
  height,
  tooltipLeft,
  tooltipTop,
  tooltipData,
  disableHorizontalHoverLine,
  disableVerticalHoverLine,
  disableHoverCircle,
  hoverLineProps,
  hoverLineHorizontalProps,
  hoverLineVerticalProps,
  hoverCircleProps,
}: ChartTooltipHoverOwnProps & ChartTooltipHoverProps) => (
  <AnimatePresence>
    {tooltipData !== undefined ? (
      <g>
        {!disableVerticalHoverLine && (
          <m.line
            key={`${tooltipLeft}-${tooltipTop}-line-vertical`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.2 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            x1={tooltipLeft}
            x2={tooltipLeft}
            y1={0}
            y2={height}
            stroke="currentColor"
            strokeWidth={2}
            style={{ pointerEvents: "none" }}
            className={cn(extendedTextColors.subtile)}
            strokeDasharray="4,4"
            {...hoverLineProps}
            {...hoverLineVerticalProps}
          />
        )}
        {!disableHorizontalHoverLine && (
          <m.line
            key={`${tooltipLeft}-${tooltipTop}-line-horizontal`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.2 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            x1={0}
            x2={width}
            y1={tooltipTop}
            y2={tooltipTop}
            stroke="currentColor"
            strokeWidth={2}
            style={{ pointerEvents: "none" }}
            className={cn(extendedTextColors.subtile)}
            strokeDasharray="4,4"
            {...hoverLineProps}
            {...hoverLineHorizontalProps}
          />
        )}
        {!disableHoverCircle && (
          <m.circle
            key={`${tooltipLeft}-${tooltipTop}-circle`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.2 },
            }}
            exit={{
              opacity: 0,
              scale: 0.6,
              transition: { duration: 0.2 },
            }}
            cx={tooltipLeft}
            cy={tooltipTop}
            r={4}
            stroke="currentColor"
            strokeWidth={2}
            pointerEvents="none"
            className={cn(textColors.primary, fillColors.white)}
            {...hoverCircleProps}
          />
        )}
      </g>
    ) : null}
  </AnimatePresence>
);
