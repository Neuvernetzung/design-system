import { ResizeObserver } from "@juggle/resize-observer";
import { Axis, AxisScale } from "@visx/axis";
import type { AxisProps } from "@visx/axis/lib/axis/Axis";
import { localPoint } from "@visx/event";
import { GridColumns, GridRows } from "@visx/grid";
import type { AllGridColumnsProps } from "@visx/grid/lib/grids/GridColumns";
import type { AllGridRowsProps } from "@visx/grid/lib/grids/GridRows";
import { AreaClosed, Line, LinePath } from "@visx/shape";
import type { AreaClosedProps } from "@visx/shape/lib/shapes/AreaClosed";
import type { LinePathProps } from "@visx/shape/lib/shapes/LinePath";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { bisector, extent, max, min } from "@visx/vendor/d3-array";
import type { ScaleLinear, ScaleTime } from "@visx/vendor/d3-scale";
import type { CurveFactory } from "d3-shape";
import isFunction from "lodash/isFunction";
import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactNode,
  TouchEvent,
  useRef,
} from "react";

import { cn } from "@/utils";

import { extendedTextColors } from "../../../styles";
import { mergeRefs } from "../../../utils/internal";
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
import { useRefDimensions } from "@/hooks";

export type LinechartDataFieldProps = { x: number | Date; y: number | null };

export type LinechartDataProps = {
  data: LinechartDataFieldProps[];
  color?: string;
};

export type LinechartProps = LinechartDataProps & {
  id?: string;
  curve?: CurveFactory;
  hoverProps?: ChartTooltipHoverProps;
  showLineArea?: boolean;
  showGridColumns?: boolean;
  gridColumnProps?: AllGridColumnsProps<AxisScale>;
  showGridRows?: boolean;
  gridRowProps?: AllGridRowsProps<AxisScale>;
  showZeroLine?: boolean;
  allowTooltip?: boolean;
  allowTooltipHover?: boolean;
  xAxisProps?: Partial<AxisProps<AxisScale>>;
  yAxisProps?: Partial<AxisProps<AxisScale>>;
  margin?: ChartMargin;
  lineAreaProps?: AreaClosedProps<LinechartDataFieldProps>;
  lineProps?: LinePathProps<LinechartDataFieldProps>;
  missingValueBehaviour?: MissingValueBehaviour;
  xScaleType?: ChartScale;
  yScaleType?: ChartScale;
  formatTooltip?: (d?: LinechartDataFieldProps) => ReactNode;
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
        xScale:
          | ScaleLinear<number, number, never>
          | ScaleTime<number, number, never>;
        margin: ChartMargin;
      }) => ReactNode);
};

export const Linechart = forwardRef(
  (
    {
      id,
      data,
      color = getChartColor(0),
      curve,
      showLineArea = true,
      hoverProps = {
        disableHorizontalHoverLine: true,
      },
      allowTooltip = true,
      allowTooltipHover = true,
      xAxisProps,
      yAxisProps,
      margin: newMargin,
      lineAreaProps,
      lineProps,
      missingValueBehaviour = "undefined",
      xScaleType = "linear",
      yScaleType = "linear",
      showGridColumns = true,
      showGridRows,
      showZeroLine = true,
      gridColumnProps,
      gridRowProps,
      formatTooltip,
      children,
    }: LinechartProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    const wrapperRef = useRef(null);
    const { height, width } = useRefDimensions(wrapperRef);
    const xAxisRef = useRef(null);
    const { height: xAxisHeight } = useRefDimensions(xAxisRef);
    const yAxisRef = useRef(null);
    const { width: yAxisWidth } = useRefDimensions(yAxisRef);

    const getX = (d: LinechartDataFieldProps) => d.x;
    const getY = (d: LinechartDataFieldProps) => d.y;

    const allData = filterMissingChartData<LinechartDataFieldProps>({
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

    const xScale = chartScales[xScaleType]<number>({
      domain: extent(allData, getX) as [Date, Date],
      range: [0, innerWidth],
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
    } = useTooltip<LinechartDataFieldProps>();

    const { TooltipInPortal, containerRef } = useTooltipInPortal({
      detectBounds: true,
      scroll: true,
      polyfill: ResizeObserver,
    });
    const bisectDate = bisector((d: LinechartDataFieldProps) => getX(d)).left;

    const handleTooltip = (event: MouseEvent | TouchEvent) => {
      if (!allowTooltip && !allowTooltipHover) return;
      const { x } = localPoint(event) || { x: 0 };

      const x0 = xScale.invert(x);

      const index = bisectDate(allData, x0, 1);

      const d0 = allData[index - 1];
      const d1 = allData[index];
      let d = d0;
      // ist der vorherige Punkt verfügbar und wenn ja, welcher Punkt ist näher?
      if (d1 && getX(d1)) {
        d =
          x0.valueOf() - getX(d0).valueOf() > getX(d1).valueOf() - x0.valueOf()
            ? d1
            : d0;
      }
      const y = getY(d);
      if (missingValueBehaviour !== "zero" && y === null) return;

      showTooltip({
        tooltipData: { x: d.x, y: y || 0 },
        tooltipLeft: xScale(getX(d)),
        tooltipTop: yScale(y || 0),
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
          onTouchStart={(e) => handleTooltip(e)}
          onTouchMove={(e) => handleTooltip(e)}
          onMouseMove={(e) => handleTooltip(e)}
          onMouseLeave={() => hideTooltip()}
        >
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
          {showZeroLine && minValue < 0 && (
            <Line
              from={{ x: 0, y: yScale(0) }}
              to={{ x: innerWidth, y: yScale(0) }}
              stroke="currentColor"
              strokeWidth={2}
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
          <LinePath
            data={allData}
            x={(d: LinechartDataFieldProps) => xScale(getX(d)) ?? 0}
            y={(d: LinechartDataFieldProps) => yScale(getY(d) || 0) ?? 0}
            stroke={color}
            fill="none"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            curve={curve}
            defined={(d) => {
              if (missingValueBehaviour === "zero") return true;
              return getY(d) !== null;
            }}
            {...lineProps}
          />
          {showLineArea && (
            <AreaClosed
              data={allData}
              x={(d) => xScale(getX(d))}
              y={(d) => yScale(getY(d) || 0)}
              y0={yScale(0)}
              yScale={yScale}
              curve={curve}
              fill={color}
              opacity={0.1}
              defined={(d) => {
                if (missingValueBehaviour === "zero") return true;
                return getY(d) !== null;
              }}
              {...lineAreaProps}
            />
          )}
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

Linechart.displayName = "Linechart";
