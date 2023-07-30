import { Meta } from "@storybook/react";
import cn from "classnames";
import React from "react";

import { borders } from "../../../styles";
import { LineSerieschart } from ".";
import { addHours, format } from "date-fns";

export default {
  title: "CHARTS/LineSerieschart",
  component: LineSerieschart,
  argTypes: {},
} as Meta;

const sales = [
  { x: "2023-04-29T12:00:00.00+00:00", y: 1 },
  { x: "2023-04-30T12:00:00.00+00:00", y: 5 },
  { x: "2023-05-01T12:00:00.00+00:00", y: 0 },
  { x: "2023-05-02T12:00:00.00+00:00", y: 6 },
  { x: "2023-05-03T12:00:00.00+00:00", y: 7 },
  { x: "2023-05-04T12:00:00.00+00:00", y: 10 },
  { x: "2023-05-05T12:00:00.00+00:00", y: null },
  { x: "2023-05-06T12:00:00.00+00:00", y: 12 },
  { x: "2023-05-07T12:00:00.00+00:00", y: 4 },
  { x: "2023-05-08T12:00:00.00+00:00", y: 7 },
];
const data1 = sales.map((d) => ({ x: new Date(d.x), y: d.y }));
const data2 = sales.map((d) => ({
  x: addHours(new Date(d.x), 3),
  y: (d.y || 0) * 3 - 5,
}));

export const Default = ({ ...args }) => (
  <div className={cn("w-full h-64 border rounded-lg p-4", borders.accent)}>
    <LineSerieschart
      series={[{ data: data1 }, { data: data2 }]}
      xScaleType="time"
      xAxisProps={{ tickFormat: (value) => format(value, "d. MMMM") }}
      {...args}
    />
  </div>
);
