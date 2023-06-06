import { Meta } from "@storybook/react";
import React from "react";

import { Text } from "./text";
import { extendedTextColors, textSizes } from "../../../../styles";

export default {
  title: "UI/Typography/Text",
  component: Text,
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
  const _sizes = Object.keys(textSizes).reverse();

  return (
    <Container>
      {_sizes.map((size: any) => (
        <Text size={size} key={size} {...args}>
          {size}
        </Text>
      ))}
    </Container>
  );
};

Sizes.parameters = {
  controls: { exclude: "size" },
};
export const Colors = ({ ...args }) => {
  const _colors = Object.keys(extendedTextColors);

  return (
    <Container>
      {_colors.map((color: any) => (
        <Text color={color} key={color} {...args}>
          {color}
        </Text>
      ))}
    </Container>
  );
};

Colors.parameters = {
  controls: { exclude: "color" },
};
