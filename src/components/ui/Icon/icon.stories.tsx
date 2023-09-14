import { IconHome } from "@tabler/icons-react";
import { Meta } from "@storybook/react";
import React from "react";

import { Icon } from "./icon";
import { colors, sizes } from "../../../types";

export default {
  title: "UI/Media/Icon",
  component: Icon,
  argTypes: {
    size: {
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
      <Icon size={size} key={size} icon={IconHome} {...args} />
    ))}
  </Container>
);

Sizes.parameters = {
  controls: { exclude: "size" },
};

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <Icon color={color} key={color} icon={IconHome} {...args} />
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};
