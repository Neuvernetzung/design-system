import { Meta } from "@storybook/react";

import { Text } from "./text";
import { colors, sizes } from "../../../../types";

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

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Text size={size} key={size} {...args}>
        {size}
      </Text>
    ))}
  </Container>
);

Sizes.parameters = {
  controls: { exclude: "size" },
};
export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <Text color={color} key={color} {...args}>
        {color}
      </Text>
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};
