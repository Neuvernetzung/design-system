import { scaleLinear, scaleTime } from "@visx/scale";

export const chartScales = {
  linear: scaleLinear,
  time: scaleTime,
} as const;

export type ChartScale = keyof typeof chartScales;
