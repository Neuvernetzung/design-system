import { ResizeObserver } from "@juggle/resize-observer";
import { Axis, AxisScale } from "@visx/axis";
import type { AxisProps } from "@visx/axis/lib/axis/Axis";
import { GridColumns, GridRows } from "@visx/grid";
import type { AllGridColumnsProps } from "@visx/grid/lib/grids/GridColumns";
import type { AllGridRowsProps } from "@visx/grid/lib/grids/GridRows";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { Bar } from "@visx/shape";
import { BarProps } from "@visx/shape/lib/shapes/Bar";
import { AddSVGProps, AnyScaleBand } from "@visx/shape/lib/types";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { max, min } from "@visx/vendor/d3-array";
import type { ScaleLinear, ScaleTime } from "@visx/vendor/d3-scale";
import { isFunction } from "lodash";
import { ForwardedRef, forwardRef, ReactNode, useRef } from "react";

import { cn } from "@/utils";

import { extendedTextColors } from "../../../styles";
import { mergeRefs, useRefDimensions } from "../../../utils/internal";
import { ChartTickXComponent, ChartTickYComponent } from "../components/ticks";
import {
  ChartTooltip,
  ChartTooltipHover,
  ChartTooltipHoverProps,
} from "../components/tooltip";
import {
  ChartAreaWrapper,
  ChartMargin,
  ChartWrapper,
  ChartXAxisWrapper,
  ChartYAxisWrapper,
} from "../components/wrapper";
import {
  ChartScale,
  chartScales,
  filterMissingChartData,
  getInnerDimensions,
  MissingValueBehaviour,
} from "../utils";
import { getChartColor } from "../utils/colors";

export type BarchartDataFieldProps = { x: number | Date; y: number | null };

export type BarchartDataProps = {
  data: BarchartDataFieldProps[];
  color?: string;
};

export type BarchartProps = BarchartDataProps & {
  margin?: ChartMargin;
  id?: string;
  missingValueBehaviour?: MissingValueBehaviour;
  showGridColumns?: boolean;
  gridColumnProps?: AllGridColumnsProps<AxisScale>;
  showGridRows?: boolean;
  gridRowProps?: AllGridRowsProps<AxisScale>;
  hoverProps?: ChartTooltipHoverProps;
  allowTooltip?: boolean;
  allowTooltipHover?: boolean;
  xAxisProps?: Partial<AxisProps<AxisScale>>;
  yAxisProps?: Partial<AxisProps<AxisScale>>;
  xScaleType?: ChartScale;
  yScaleType?: ChartScale;
  barProps?: AddSVGProps<BarProps, SVGRectElement>;
  formatTooltip?: (d?: BarchartDataFieldProps) => ReactNode;
  children?:
    | ReactNode
    | (({
        width,
        innerWidth,
        height,
        innerHeight,
        yScale,
        xScale,
        margin,
      }: {
        width: number;
        innerWidth: number;
        height: number;
        innerHeight: number;
        yScale:
          | ScaleLinear<number, number, never>
          | ScaleTime<number, number, never>;
        xScale: AnyScaleBand;
        margin: ChartMargin;
      }) => ReactNode);
};

export const Barchart = forwardRef(
  (
    {
      data,
      margin: newMargin,
      id,
      missingValueBehaviour = "undefined",
      yScaleType = "linear",
      showGridColumns = true,
      showGridRows,
      gridColumnProps,
      gridRowProps,
      formatTooltip,
      children,
      hoverProps = {
        disableHorizontalHoverLine: true,
      },
      allowTooltip = true,
      allowTooltipHover = true,
      color = getChartColor(0),
      xAxisProps,
      yAxisProps,
      barProps,
    }: BarchartProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    const wrapperRef = useRef(null);
    const { height, width } = useRefDimensions(wrapperRef);
    const xAxisRef = useRef(null);
    const { height: xAxisHeight } = useRefDimensions(xAxisRef);
    const yAxisRef = useRef(null);
    const { width: yAxisWidth } = useRefDimensions(yAxisRef);

    const getX = (d: BarchartDataFieldProps) => d.x;
    const getY = (d: BarchartDataFieldProps) => d.y;

    const allData = filterMissingChartData<BarchartDataFieldProps>({
      data,
      getY,
      missingValueBehaviour,
    });

    const margin: ChartMargin = newMargin || {
      top: 0,
      right: 0,
      bottom: xAxisHeight,
      left: yAxisWidth,
    };

    const { innerHeight, innerWidth } = getInnerDimensions({
      margin,
      width,
      height,
    });

    const xScale = scaleBand<number | Date>({
      domain: data.map(getX) as [number | Date, number | Date],
      range: [0, innerWidth],
      round: true,
      padding: 0.2,
    });

    const minValue = min(allData, getY) || 0;

    const yScale = chartScales[yScaleType]<number>({
      domain: [minValue > 0 ? 0 : minValue, max(allData, getY) as number],
      range: [innerHeight, 0],
    });

    const {
      tooltipData,
      tooltipLeft = 0,
      tooltipTop = 0,
      showTooltip,
      hideTooltip,
    } = useTooltip<BarchartDataFieldProps>();

    const { TooltipInPortal, containerRef } = useTooltipInPortal({
      detectBounds: true,
      scroll: true,
      polyfill: ResizeObserver,
    });

    const handleTooltip = (bar: BarchartDataFieldProps) => {
      if (!allowTooltip && !allowTooltipHover) return;
      const left = (xScale(getX(bar)) ?? 0) + xScale.bandwidth() / 2;

      const y = getY(bar);
      if (y === null) return;

      showTooltip({
        tooltipData: bar,
        tooltipLeft: left,
        tooltipTop: yScale(y),
      });
    };

    return (
      <ChartWrapper ref={wrapperRef}>
        <ChartAreaWrapper
          ref={mergeRefs([ref, containerRef])}
          id={id}
          height={innerHeight}
          width={innerWidth}
          margin={margin}
        >
          <ChartXAxisWrapper ref={xAxisRef}>
            <Axis
              hideAxisLine
              hideTicks
              top={innerHeight}
              scale={xScale}
              orientation="bottom"
              tickComponent={ChartTickXComponent}
              {...xAxisProps}
            />
          </ChartXAxisWrapper>
          <ChartYAxisWrapper ref={yAxisRef}>
            <Axis
              hideAxisLine
              hideTicks
              scale={yScale}
              orientation="left"
              tickComponent={ChartTickYComponent}
              numTicks={10}
              {...yAxisProps}
            />
          </ChartYAxisWrapper>
          <Group>
            {data.map((d) => {
              const x = getX(d);
              const barWidth = xScale.bandwidth();
              const barHeight = innerHeight - yScale(getY(d) ?? 0);
              const barX = xScale(x);
              const barY = innerHeight - barHeight;
              return (
                <Bar
                  key={`bar-${x}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  onTouchStart={() => handleTooltip(d)}
                  onTouchMove={() => handleTooltip(d)}
                  onMouseMove={() => handleTooltip(d)}
                  onMouseLeave={() => hideTooltip()}
                  {...barProps}
                />
              );
            })}
          </Group>
          {allowTooltipHover && (
            <ChartTooltipHover
              width={width}
              height={innerHeight}
              tooltipData={tooltipData}
              tooltipLeft={tooltipLeft}
              tooltipTop={tooltipTop}
              {...hoverProps}
            />
          )}
          {showGridRows && (
            <GridRows
              scale={yScale}
              width={innerWidth}
              stroke="currentColor"
              className={cn(extendedTextColors.subtile)}
              strokeDasharray="1,3"
              strokeOpacity={0.2}
              pointerEvents="none"
              {...gridRowProps}
            />
          )}
          {showGridColumns && (
            <GridColumns
              scale={xScale}
              height={innerHeight}
              strokeDasharray="1,3"
              stroke="currentColor"
              className={cn(extendedTextColors.subtile)}
              strokeOpacity={0.2}
              pointerEvents="none"
              {...gridColumnProps}
            />
          )}
          {children &&
            (isFunction(children)
              ? children({
                  height,
                  innerHeight,
                  innerWidth,
                  margin,
                  width,
                  xScale,
                  yScale,
                })
              : children)}
        </ChartAreaWrapper>
        {allowTooltip && (
          <ChartTooltip
            tooltipLabel={
              isFunction(formatTooltip)
                ? formatTooltip(tooltipData)
                : tooltipData?.y
            }
            tooltipLeft={tooltipLeft}
            tooltipTop={tooltipTop}
            tooltipData={tooltipData}
            TooltipInPortal={TooltipInPortal}
          />
        )}
      </ChartWrapper>
    );
  }
);

Barchart.displayName = "Barchart";
