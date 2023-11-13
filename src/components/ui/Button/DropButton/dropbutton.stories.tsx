import { Meta } from "@storybook/react";

import { extendedColors, sizes } from "@/types";

import { DropButton } from "./dropbutton";

export default {
  title: "UI/Buttons/DropButton",
  component: DropButton,
  argTypes: {
    color: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
    },
    size: {
      control: { type: "select", default: "md" },
    },
    as: { control: false },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row items-start gap-5" {...props} />
);

export const Colors = ({ ...args }) => (
  <Container>
    {extendedColors.map((color) => (
      <DropButton color={color} key={color} {...args}>
        {color}
      </DropButton>
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <DropButton size={size} key={size} {...args}>
        {size}
      </DropButton>
    ))}
  </Container>
);

Sizes.parameters = {
  controls: { exclude: "size" },
};

export const AsChild = ({ ...args }) => (
  <Container>
    <DropButton asChild {...args}>
      <a href="/">Test</a>
    </DropButton>
  </Container>
);
