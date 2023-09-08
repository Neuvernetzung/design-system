import { Meta } from "@storybook/react";
import React from "react";

import { Heading } from "./heading";
import { extendedColors, sizes } from "../../../../types";

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

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Heading size={size} key={size} {...args}>
        {size}
      </Heading>
    ))}
  </Container>
);

Sizes.parameters = {
  controls: { exclude: "size" },
};
export const Colors = ({ ...args }) => (
  <Container>
    {extendedColors.map((color) => (
      <Heading color={color} key={color} {...args}>
        {color}
      </Heading>
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};
