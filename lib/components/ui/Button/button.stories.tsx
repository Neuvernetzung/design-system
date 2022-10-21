import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Button, variants, colors, sizes } from "./button";

export default {
  title: "UI/Button",
  component: Button,
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
  },
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Variants = ({ ...args }) => {
  const _variants = Object.keys(variants);

  return (
    <Container>
      {_variants.map((variant: any) => (
        <Button variant={variant} key={variant} {...args}>
          {variant}
        </Button>
      ))}
    </Container>
  );
};

Variants.parameters = {
  controls: { exclude: "variant" },
};

export const Colors = ({ ...args }) => {
  const _colors = Object.keys(colors);

  return (
    <Container>
      {_colors.map((color: any) => (
        <Button color={color} key={color} {...args}>
          {color}
        </Button>
      ))}
    </Container>
  );
};

Colors.parameters = {
  controls: { exclude: "color" },
};

export const Sizes = ({ ...args }) => {
  const _size = Object.keys(sizes);

  return (
    <Container>
      {_size.map((size: any) => (
        <Button size={size} key={size} {...args}>
          {size}
        </Button>
      ))}
    </Container>
  );
};

Sizes.parameters = {
  controls: { exclude: "size" },
};
