import { ResizeObserver } from "@juggle/resize-observer";
import { Axis } from "@visx/axis";
import { localPoint } from "@visx/event";
import { GridColumns, GridRows } from "@visx/grid";
import { AreaClosed, Line, LinePath } from "@visx/shape";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { bisector, extent, max, min } from "@visx/vendor/d3-array";
import compact from "lodash/compact";
import isFunction from "lodash/isFunction";
import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactNode,
  TouchEvent,
  useRef,
} from "react";

import { useRefDimensions } from "@/hooks";
import { cn } from "@/utils";

import { extendedTextColors, textSizes } from "../../../styles";
import { mergeRefs } from "../../../utils/internal";
import { ChartTickXComponent, ChartTickYComponent } from "../components/ticks";
import { ChartTooltip, ChartTooltipHover } from "../components/tooltip";
import {
  ChartAreaWrapper,
  ChartMargin,
  ChartWrapper,
  ChartXAxisWrapper,
  ChartYAxisWrapper,
} from "../components/wrapper";
import {
  chartScales,
  filterMissingChartData,
  getInnerDimensions,
} from "../utils";
import { getChartColor } from "../utils/colors";
import {
  LinechartDataFieldProps,
  LinechartDataProps,
  LinechartProps,
} from "./linechart";

export type LineSerieschartDataProps = (LinechartDataProps & {
  formatTooltip?: (d?: LinechartDataFieldProps) => ReactNode;
  name?: string;
})[];

export type LineSerieschartProps = {
  series: LineSerieschartDataProps;
} & Omit<LinechartProps, "data"> & {
    normalized?: boolean;
    tooltipDataType?: "single" | "multiple";
  };

export type LinechartIndexedDataFieldProps = LinechartDataFieldProps & {
  i: number;
};

export const LineSerieschart = forwardRef(
  (
    {
      id,
      series,
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
      normalized,
      tooltipDataType = "single",
      allowTooltipHeader,
      formatTooltipHeader,
    }: LineSerieschartProps,
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
    const getNormalizedY = (
      d: LinechartDataFieldProps,
      max: number | undefined = 0
    ) => (1 / max) * (d.y || 0);

    const allData = filterMissingChartData<LinechartDataFieldProps>({
      data: series.map(({ data }) => data).flat(),
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
    const maxValue = max(allData, getY) || 0;

    const yScale = chartScales[yScaleType]<number>({
      domain: normalized
        ? [
            minValue > 0 ? 0 : getNormalizedY({ x: 0, y: minValue }, maxValue),
            1,
          ]
        : [minValue > 0 ? 0 : minValue, maxValue],
      range: [innerHeight, 0],
    });

    const firstSerieMaxValue = max(series[0]?.data, getY) || 0;
    const yScaleOriginal = chartScales[yScaleType]<number>({
      domain: [
        minValue > 0 ? 0 : firstSerieMaxValue * ((1 / maxValue) * minValue),
        firstSerieMaxValue,
      ],
      range: [innerHeight, 0],
    });

    const {
      tooltipData,
      tooltipLeft = 0,
      tooltipTop = 0,
      showTooltip,
      hideTooltip,
    } = useTooltip<LinechartIndexedDataFieldProps>();
    const { TooltipInPortal, containerRef } = useTooltipInPortal({
      detectBounds: true,
      scroll: true,
      polyfill: ResizeObserver,
    });
    const bisectDate = bisector((d: LinechartDataFieldProps) => getX(d)).left;

    const handleTooltip = (event: MouseEvent | TouchEvent) => {
      if (!allowTooltip && !allowTooltipHover) return;

      const { x, y } = localPoint(event) || { x: 0, y: 0 };

      const x0 = xScale.invert(x);
      const y0 = yScale.invert(y);

      const points = compact(
        series.map(({ data }, i) => {
          const index = bisectDate(data, x0, 1);

          const d0 = data[index - 1];
          const d1 = data[index];
          let d = d0;
          // ist der vorherige Punkt verfügbar und wenn ja, welcher Punkt ist näher?
          if (d1 && getX(d1)) {
            d =
              x0.valueOf() - getX(d0).valueOf() >
              getX(d1).valueOf() - x0.valueOf()
                ? d1
                : d0;
          }

          const maxY = max(data, getY);

          const realY = normalized ? getNormalizedY(d, maxY) : getY(d);
          if (missingValueBehaviour !== "zero" && realY === null) return;

          return { ...d, i, maxY };
        })
      );

      const distance = (
        d: LinechartIndexedDataFieldProps,
        maxY: number | undefined
      ) =>
        Math.sqrt(
          (xScale(x0) - xScale(getX(d))) ** 2 +
            (yScale(y0) -
              yScale(normalized ? getNormalizedY(d, maxY) : getY(d) || 0)) **
              2
        );

      const d = points.reduce((a, b) =>
        distance(a, a.maxY) < distance(b, b.maxY) ? a : b
      );

      showTooltip({
        tooltipData: { x: d.x, y: d.y || 0, i: d.i },
        tooltipLeft: xScale(getX(d)),
        tooltipTop: yScale(
          normalized ? getNormalizedY(d, d.maxY) : getY(d) || 0
        ),
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
              scale={normalized ? yScaleOriginal : yScale}
              orientation="left"
              tickComponent={ChartTickYComponent}
              numTicks={10}
              label={normalized ? series[0]?.name : undefined}
              labelOffset={-15}
              labelClassName={cn(textSizes.xs, "text-body text-current")}
              labelProps={{}} // DefaultStyles zurücksetzen
              {...yAxisProps}
            />
          </ChartYAxisWrapper>
          {series.map(({ data, color }, i) => {
            const maxY = max(data, (v) => v.y);

            return (
              <>
                <LinePath
                  key={`line-path-${i}`}
                  data={data}
                  x={(d: LinechartDataFieldProps) => xScale(getX(d)) ?? 0}
                  y={(d: LinechartDataFieldProps) =>
                    yScale(
                      normalized ? getNormalizedY(d, maxY) : getY(d) || 0
                    ) ?? 0
                  }
                  stroke={color || getChartColor(i)}
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
                    key={`area-closed-${i}`}
                    data={data}
                    x={(d) => xScale(getX(d))}
                    y={(d) =>
                      yScale(
                        normalized ? getNormalizedY(d, maxY) : getY(d) || 0 || 0
                      )
                    }
                    y0={yScale(0)}
                    yScale={yScale}
                    curve={curve}
                    fill={color || getChartColor(i)}
                    opacity={0.1}
                    defined={(d) => {
                      if (missingValueBehaviour === "zero") return true;
                      return getY(d) !== null;
                    }}
                    {...lineAreaProps}
                  />
                )}
              </>
            );
          })}
          {allowTooltipHover && (
            <ChartTooltipHover
              width={width}
              height={innerHeight}
              tooltipData={tooltipData}
              tooltipLeft={tooltipLeft}
              tooltipTop={tooltipTop}
              color={
                tooltipData?.i
                  ? series[tooltipData?.i].color ||
                    getChartColor(tooltipData?.i)
                  : getChartColor(0)
              }
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
          <>
            {tooltipDataType === "single" && (
              <ChartTooltip
                tooltipLabel={
                  tooltipData
                    ? series[tooltipData.i] &&
                      isFunction(series[tooltipData.i].formatTooltip)
                      ? series[tooltipData.i].formatTooltip?.(tooltipData)
                      : isFunction(formatTooltip)
                      ? formatTooltip(tooltipData)
                      : tooltipData?.y
                    : undefined
                }
                tooltipHeader={
                  allowTooltipHeader &&
                  (isFunction(formatTooltipHeader)
                    ? formatTooltipHeader(tooltipData)
                    : tooltipData?.x?.toString())
                }
                tooltipLeft={tooltipLeft}
                tooltipTop={tooltipTop}
                tooltipData={tooltipData}
                TooltipInPortal={TooltipInPortal}
              />
            )}
            {tooltipDataType === "multiple" && (
              <ChartTooltip
                tooltipLabel={
                  tooltipData ? (
                    <div className="flex flex-col">
                      {compact(
                        series.map((_, i) => {
                          const x = tooltipData.x;
                          const y =
                            series[i].data.find(
                              (v) => v.x?.toString() === x?.toString()
                            )?.y ?? null;

                          if (y === null) return;

                          return (
                            <span key={i}>
                              {isFunction(series[i].formatTooltip)
                                ? series[i].formatTooltip?.({ x, y })
                                : isFunction(formatTooltip)
                                ? formatTooltip({ x, y })
                                : y}
                            </span>
                          );
                        })
                      )}
                    </div>
                  ) : undefined
                }
                tooltipHeader={
                  allowTooltipHeader &&
                  (isFunction(formatTooltipHeader)
                    ? formatTooltipHeader(tooltipData)
                    : tooltipData?.x?.toString())
                }
                tooltipLeft={tooltipLeft}
                tooltipTop={tooltipTop}
                tooltipData={tooltipData}
                TooltipInPortal={TooltipInPortal}
              />
            )}
          </>
        )}
      </ChartWrapper>
    );
  }
);

LineSerieschart.displayName = "LineSerieschart";
