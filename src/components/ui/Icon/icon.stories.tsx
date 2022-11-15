import { HomeIcon } from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { colors, Icon, sizes } from "./icon";

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

export const Sizes = ({ ...args }) => {
  const _sizes = Object.keys(sizes).reverse();

  return (
    <Container>
      {_sizes.map((size: any) => (
        <Icon size={size} key={size} icon={HomeIcon} {...args} />
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
        <Icon color={color} key={color} icon={HomeIcon} {...args} />
      ))}
    </Container>
  );
};

Colors.parameters = {
  controls: { exclude: "color" },
};
