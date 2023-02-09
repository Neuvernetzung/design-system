import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { colors, Heading, sizes } from "./heading";

export default {
  title: "UI/Typography/Heading",
  component: Heading,
  argTypes: {
    size: {
      control: { type: "select" },
    },
    color: {
      control: { type: "select" },
    },
  },
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Sizes = ({ ...args }) => {
  const _sizes = Object.keys(sizes).reverse();

  return (
    <Container>
      {_sizes.map((size: any) => (
        <Heading size={size} key={size} {...args}>
          {size}
        </Heading>
      ))}
    </Container>
  );
};

Sizes.parameters = {
  controls: { exclude: "size" },
};
export const Colors = ({ ...args }) => {
  const _colors = Object.keys(colors);

  return (
    <Container>
      {_colors.map((color: any) => (
        <Heading color={color} key={color} {...args}>
          {color}
        </Heading>
      ))}
    </Container>
  );
};

Colors.parameters = {
  controls: { exclude: "color" },
};
