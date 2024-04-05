import type { Meta, StoryObj } from "@storybook/react";
import { format } from "date-fns";

import { cn } from "@/utils";

import { borders } from "../../../styles";
import { Bargroupchart } from ".";

const meta: Meta<typeof Bargroupchart> = {
  title: "CHARTS/Bargroupchart",
  component: Bargroupchart,
};

export default meta;

type Story = StoryObj<typeof Bargroupchart>;

const sales = [
  { x: "2023-04-29T12:00:00.00+00:00", test: 1 },
  { x: "2023-04-30T12:00:00.00+00:00", test: 5 },
  { x: "2023-05-01T12:00:00.00+00:00", test: 6 },
  { x: "2023-05-02T12:00:00.00+00:00", test: 8 },
  { x: "2023-05-03T12:00:00.00+00:00", test: 7 },
  { x: "2023-05-04T12:00:00.00+00:00", test: 10 },
  { x: "2023-05-05T12:00:00.00+00:00", test: null },
  { x: "2023-05-06T12:00:00.00+00:00", test: 12 },
  { x: "2023-05-07T12:00:00.00+00:00", test: 4 },
  { x: "2023-05-08T12:00:00.00+00:00", test: 7 },
];
const data = sales.map((d) => ({
  ...d,
  x: new Date(d.x),
  new: (d.test || 0 * 1.5) + 2,
}));

export const Default: Story = {
  render: ({ data: argsData, ...args }) => (
    <div className={cn("w-full h-64 border rounded-lg p-4", borders.accent)}>
      <Bargroupchart
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
      <Bargroupchart
        data={argsData || []}
        xScaleType="time"
        xAxisProps={{ tickFormat: (value) => format(value, "d. MMMM") }}
        {...args}
      />
    </div>
  ),
};
