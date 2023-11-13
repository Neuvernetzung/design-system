import { TickRendererProps } from "@visx/axis";
import { cn } from "@/utils";

import { extendedTextColors, textSizes } from "../../../styles";

export const ChartTickXComponent = ({
  x,
  formattedValue,
}: TickRendererProps) => (
  <text
    x={x}
    y={15}
    textAnchor="middle"
    alignmentBaseline="middle"
    fill="currentColor"
    className={cn(textSizes.xs, extendedTextColors.subtile, "font-body")}
  >
    {formattedValue}
  </text>
);

export const ChartTickYComponent = ({
  y,
  formattedValue,
}: TickRendererProps) => (
  <text
    key={y}
    y={y}
    x={-5}
    alignmentBaseline="middle"
    textAnchor="end"
    className={cn(textSizes.xs, extendedTextColors.subtile, "font-body")}
    fill="currentColor"
  >
    {formattedValue}
  </text>
);
