import type { Meta, StoryObj } from "@storybook/react";
import { format } from "date-fns";

import { cn } from "@/utils";

import { borders } from "../../../styles";
import { Linechart } from ".";

const meta: Meta<typeof Linechart> = {
  title: "CHARTS/Linechart",
  component: Linechart,
};

export default meta;

type Story = StoryObj<typeof Linechart>;

const sales = [
  { x: "2023-04-29T12:00:00.00+00:00", y: 1 },
  { x: "2023-04-30T12:00:00.00+00:00", y: 5 },
  { x: "2023-05-01T12:00:00.00+00:00", y: 6 },
  { x: "2023-05-02T12:00:00.00+00:00", y: 8 },
  { x: "2023-05-03T12:00:00.00+00:00", y: 7 },
  { x: "2023-05-04T12:00:00.00+00:00", y: 10 },
  { x: "2023-05-05T12:00:00.00+00:00", y: null },
  { x: "2023-05-06T12:00:00.00+00:00", y: 12 },
  { x: "2023-05-07T12:00:00.00+00:00", y: 4 },
  { x: "2023-05-08T12:00:00.00+00:00", y: 7 },
];
const data = sales.map((d) => ({ ...d, x: new Date(d.x) }));

export const Default: Story = {
  render: ({ data: argsData, ...args }) => (
    <div className={cn("w-full h-64 border rounded-lg p-4", borders.accent)}>
      <Linechart
        data={argsData || data}
        xScaleType="time"
        xAxisProps={{ tickFormat: (value) => format(value, "d. MMMM") }}
        {...args}
      />
    </div>
  ),
};

export const Empty: Story = {
  render: ({ data: argsData, ...args }) => (
    <div className={cn("w-full h-64 border rounded-lg p-4", borders.accent)}>
      <Linechart
        data={argsData || []}
        xScaleType="time"
        xAxisProps={{ tickFormat: (value) => format(value, "d. MMMM") }}
        {...args}
      />
    </div>
  ),
};

export const TooltipHeader: Story = {
  render: ({ data: argsData, ...args }) => (
    <div className={cn("w-full h-64 border rounded-lg p-4", borders.accent)}>
      <Linechart
        data={argsData || data}
        xScaleType="time"
        xAxisProps={{ tickFormat: (value) => format(value, "d. MMMM") }}
        formatTooltip={(v) => `${v?.y} Aufrufe`}
        allowTooltipHeader
        formatTooltipHeader={(v) =>
          Intl.DateTimeFormat(undefined, {}).format(v?.x)
        }
        {...args}
      />
    </div>
  ),
};
