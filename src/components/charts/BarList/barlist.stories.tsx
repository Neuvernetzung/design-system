import { Meta } from "@storybook/react";
import cn from "classnames";
import React from "react";

import { borders } from "../../../styles";
import { BarList, barListVariants } from ".";
import { colors, sizes } from "../../../types";

export default {
  title: "CHARTS/BarList",
  component: BarList,
  argTypes: {},
} as Meta;

const data = [
  {
    name: "Twitter",
    value: 300,
  },
  { name: "Facebook", value: 285 },
  { name: "YouTube", value: 503 },
  { name: "LinkedIn", value: 125 },
  { name: "Instagram", value: 1055 },
];

export const Default = ({ ...args }) => (
  <div
    className={cn(
      "w-full border rounded-lg p-4 flex flex-col gap-12",
      borders.accent
    )}
  >
    <BarList data={data} {...args} />
  </div>
);

export const Sizes = ({ ...args }) => (
  <div
    className={cn(
      "w-full border rounded-lg p-4 flex flex-col gap-12",
      borders.accent
    )}
  >
    {sizes.map((size) => (
      <BarList size={size} key={size} data={data} {...args} />
    ))}
  </div>
);

export const Variants = ({ ...args }) => (
  <div
    className={cn(
      "w-full border rounded-lg p-4 flex flex-col gap-12",
      borders.accent
    )}
  >
    {barListVariants.map((variant) => (
      <BarList variant={variant} key={variant} data={data} {...args} />
    ))}
  </div>
);

export const Colors = ({ ...args }) => (
  <div
    className={cn(
      "w-full border rounded-lg p-4 flex flex-col gap-12",
      borders.accent
    )}
  >
    {colors.map((color) => (
      <BarList color={color} key={color} data={data} {...args} />
    ))}
  </div>
);

export const FormatValue = ({ ...args }) => (
  <div
    className={cn(
      "w-full border rounded-lg p-4 flex flex-col gap-12",
      borders.accent
    )}
  >
    <BarList
      data={data}
      formatValue={(value) =>
        Intl.NumberFormat("de", { notation: "compact" }).format(value * 1000)
      }
      {...args}
    />
  </div>
);
