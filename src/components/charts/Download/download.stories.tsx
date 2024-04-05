import type { Meta, StoryObj } from "@storybook/react";
import { format } from "date-fns";
import { useRef } from "react";

import { cn } from "@/utils";

import { borders } from "../../../styles";
import { Button } from "../../ui/Button";
import { Linechart } from "../Linechart";
import { downloadChart } from ".";

const meta: Meta<typeof Linechart> = {
  title: "CHARTS/Download",
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
  render: function Render({ data: argsData, ...args }) {
    const ref = useRef<SVGSVGElement>(null);
    const id = "Test-Id";

    return (
      <div className="flex flex-col gap-4">
        <div
          className={cn("w-full h-64 border rounded-lg p-4", borders.accent)}
        >
          <Linechart
            id={id}
            ref={ref}
            data={argsData || data}
            xScaleType="time"
            xAxisProps={{ tickFormat: (value) => format(value, "d. MMMM") }}
            {...args}
          />
        </div>
        <Button onClick={() => downloadChart({ id, title: "Id-SVG" })}>
          Download by Id
        </Button>
        <Button onClick={() => downloadChart({ ref, title: "Ref-SVG" })}>
          Download by Ref
        </Button>
        <Button
          onClick={() => downloadChart({ ref, title: "Ref", type: "png" })}
        >
          Download as PNG
        </Button>
      </div>
    );
  },
};
