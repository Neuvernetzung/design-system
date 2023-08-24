import { ResizeObserver } from "@juggle/resize-observer";
import { Axis, AxisScale } from "@visx/axis";
import type { AxisProps } from "@visx/axis/lib/axis/Axis";
import { GridColumns, GridRows } from "@visx/grid";
import type { AllGridColumnsProps } from "@visx/grid/lib/grids/GridColumns";
import type { AllGridRowsProps } from "@visx/grid/lib/grids/GridRows";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { BarGroup } from "@visx/shape";
import { BarProps } from "@visx/shape/lib/shapes/Bar";
import { AddSVGProps, AnyScaleBand, DatumObject } from "@visx/shape/lib/types";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { max, min } from "@visx/vendor/d3-array";
import type { ScaleLinear, ScaleTime } from "@visx/vendor/d3-scale";
import cn from "classnames";
import { domAnimation, LazyMotion } from "framer-motion";
import { isFunction } from "lodash";
import { ForwardedRef, forwardRef, ReactNode, useRef } from "react";

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
import { BarchartDataFieldProps } from "./barchart";

export type BargroupchartDataFieldProps = DatumObject;

export type BargroupchartDataProps = {
  data: BargroupchartDataFieldProps[];
};

export type BargroupchartProps = BargroupchartDataProps & {
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

export const Bargroupchart = forwardRef(
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
      xAxisProps,
      yAxisProps,
      barProps,
    }: BargroupchartProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    const wrapperRef = useRef(null);
    const { height, width } = useRefDimensions(wrapperRef);
    const xAxisRef = useRef(null);
    const { height: xAxisHeight } = useRefDimensions(xAxisRef);
    const yAxisRef = useRef(null);
    const { width: yAxisWidth } = useRefDimensions(yAxisRef);

    const getX = (d: BargroupchartDataFieldProps) => d.x;
    const getMaxY = (d: BargroupchartDataFieldProps) =>
      keys
        .map((key) => d[key])
        .reduce((prev, next) => ((prev ?? 0) > (next ?? 0) ? prev : next), 0);

    const keys = Object.keys(data[0] || {}).filter((d) => d !== "x");

    const allData = filterMissingChartData<BargroupchartDataFieldProps>({
      data,
      getY: getMaxY,
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
      domain: allData.map(getX) as [number | Date, number | Date],
      range: [0, innerWidth],
      round: true,
      padding: 0.2,
    });

    const keysScale = scaleBand<string>({
      domain: keys,
      range: [0, xScale.bandwidth()],
      padding: 0.1,
    });

    const minValue = min(allData, getMaxY) || 0;

    const yScale = chartScales[yScaleType]<number>({
      domain: [minValue > 0 ? 0 : minValue, max(allData, getMaxY) as number],
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

    const handleTooltip = (bar: { x: number; y: number | null }) => {
      if (!allowTooltip && !allowTooltipHover) return;
      const left = bar.x + keysScale.bandwidth() / 2;

      const y = bar.y;
      if (y === null) return;

      showTooltip({
        tooltipData: bar,
        tooltipLeft: left,
        tooltipTop: yScale(y),
      });
    };

    return (
      <LazyMotion features={domAnimation}>
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
            <BarGroup
              data={data}
              keys={keys}
              height={innerHeight}
              x0={getX}
              x0Scale={xScale}
              x1Scale={keysScale}
              yScale={yScale}
              color={(_, i) => getChartColor(i)}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => (
                      <rect
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        x={bar.x}
                        y={bar.value === null ? innerHeight : bar.y}
                        width={bar.width}
                        height={bar.value === null ? 0 : bar.height}
                        fill={bar.color}
                        onTouchStart={() =>
                          handleTooltip({
                            x: barGroup.x0 + bar.x,
                            y: bar.value,
                          })
                        }
                        onTouchMove={() =>
                          handleTooltip({
                            x: barGroup.x0 + bar.x,
                            y: bar.value,
                          })
                        }
                        onMouseMove={() =>
                          handleTooltip({
                            x: barGroup.x0 + bar.x,
                            y: bar.value,
                          })
                        }
                        onMouseLeave={() => hideTooltip()}
                        {...barProps}
                      />
                    ))}
                  </Group>
                ))
              }
            </BarGroup>
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
      </LazyMotion>
    );
  }
);

Bargroupchart.displayName = "Bargroupchart";
