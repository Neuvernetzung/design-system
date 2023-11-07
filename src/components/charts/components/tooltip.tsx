import { TooltipInPortalProps } from "@visx/tooltip/lib/hooks/useTooltipInPortal";
import cn from "classnames";
import { FC, HTMLAttributes, ReactNode } from "react";

import {
  durationFast,
  extendedTextColors,
  fillColors,
  textColors,
} from "../../../styles";
import { TooltipInner } from "../../ui/Tooltip";
import { getChartColor } from "../utils/colors";

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
}: ChartTooltipProps) =>
  tooltipData !== undefined ? (
    <TooltipInPortal
      left={tooltipLeft}
      top={tooltipTop}
      style={{}}
      className={cn("absolute pointer-events-none transition-transform")}
    >
      <TooltipInner label={tooltipLabel} />
    </TooltipInPortal>
  ) : null;

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
  hoverLineProps?: HTMLAttributes<SVGLineElement>;
  hoverLineHorizontalProps?: HTMLAttributes<SVGLineElement>;
  hoverLineVerticalProps?: HTMLAttributes<SVGLineElement>;
  hoverCircleProps?: HTMLAttributes<SVGCircleElement>;
  color?: string;
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
  color = getChartColor(0),
}: ChartTooltipHoverOwnProps & ChartTooltipHoverProps) =>
  tooltipData !== undefined ? (
    <g>
      {!disableVerticalHoverLine && (
        <path
          key="line-vertical"
          d={`M ${tooltipLeft},${0} L ${tooltipLeft},${height}`}
          stroke="currentColor"
          strokeWidth={2}
          style={{ pointerEvents: "none" }}
          className={cn(
            extendedTextColors.subtile,
            durationFast,
            "transition-[d]"
          )}
          strokeDasharray="4,4"
          {...hoverLineProps}
          {...hoverLineVerticalProps}
        />
      )}
      {!disableHorizontalHoverLine && (
        <path
          key="line-horizontal"
          d={`M ${0},${tooltipTop} L ${width},${tooltipTop}`}
          stroke="currentColor"
          strokeWidth={2}
          style={{ pointerEvents: "none" }}
          className={cn(
            extendedTextColors.subtile,
            durationFast,
            "transition-[d]"
          )}
          strokeDasharray="4,4"
          {...hoverLineProps}
          {...hoverLineHorizontalProps}
        />
      )}
      {!disableHoverCircle && (
        <circle
          key="circle"
          cx={tooltipLeft}
          cy={tooltipTop}
          r={4}
          stroke={color}
          strokeWidth={2}
          pointerEvents="none"
          className={cn(
            textColors.primary,
            fillColors.white,
            durationFast,
            "transition-[cx_cy]"
          )}
          {...hoverCircleProps}
        />
      )}
    </g>
  ) : null;
