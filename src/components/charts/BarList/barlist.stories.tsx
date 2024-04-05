import type { Meta, StoryObj } from "@storybook/react";

import { cn } from "@/utils";

import { borders } from "../../../styles";
import { colors, sizes } from "../../../types";
import { BarList, barListVariants } from ".";

const meta: Meta<typeof BarList> = {
  title: "CHARTS/BarList",
  component: BarList,
};

export default meta;

type Story = StoryObj<typeof BarList>;

const data = [
  {
    name: "Twitter",
    value: 300,
  },
  { name: "Facebook", value: 285 },
  { name: "YouTube", value: 503, href: "https://www.youtube.com" },
  { name: "LinkedIn", value: 80 },
  {
    name: "https://neuvernetzung.de/blog/Massgeschneiderten_Webseiten:_Einzigartige_Performance_Sicherheit_und_Unverwechselbarkeit_fur_Ihr_Online-Business",
    value: 350,
  },
  { name: "Instagram", value: 1055, href: "https://www.instagram.de" },
  {
    name: "https://neuvernetzung.de/blog/Massgeschneiderten_Webseiten:_Einzigartige_Performance_Sicherheit_und_Unverwechselbarkeit_fur_Ihr_Online-Business-Einzigartige_Performance_Sicherheit_und_Unverwechselbarkeit_fur_Ihr_Online-Business",
    value: 50,
  },
];

export const Default: Story = {
  render: ({ data: argsData, ...args }) => (
    <div
      className={cn(
        "w-full border rounded-lg p-4 flex flex-col gap-12",
        borders.accent
      )}
    >
      <BarList data={argsData || data} {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: ({ data: argsData, ...args }) => (
    <div
      className={cn(
        "w-full border rounded-lg p-4 flex flex-col gap-12",
        borders.accent
      )}
    >
      {sizes.map((size) => (
        <BarList size={size} key={size} data={argsData || data} {...args} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: ({ data: argsData, ...args }) => (
    <div
      className={cn(
        "w-full border rounded-lg p-4 flex flex-col gap-12",
        borders.accent
      )}
    >
      {barListVariants.map((variant) => (
        <BarList
          variant={variant}
          key={variant}
          data={argsData || data}
          {...args}
        />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: ({ data: argsData, ...args }) => (
    <div
      className={cn(
        "w-full border rounded-lg p-4 flex flex-col gap-12",
        borders.accent
      )}
    >
      {colors.map((color) => (
        <BarList color={color} key={color} data={argsData || data} {...args} />
      ))}
    </div>
  ),
};

export const FormatValue: Story = {
  render: ({ data: argsData, ...args }) => (
    <div
      className={cn(
        "w-full border rounded-lg p-4 flex flex-col gap-12",
        borders.accent
      )}
    >
      <BarList
        data={argsData || data}
        formatValue={(value) =>
          Intl.NumberFormat("de", { notation: "compact" }).format(value * 1000)
        }
        {...args}
      />
    </div>
  ),
};
