import { HomeIcon } from "@heroicons/react/24/outline";
import { Meta } from "@storybook/react";
import React from "react";
import { colors, sizes } from "../../../types";

import { Indicator } from ".";
import { IconButton } from "../Button";

export default {
  title: "UI/Data Display/Indicator",
  component: Indicator,
  argTypes: {
    size: {
      control: { type: "select" },
    },
  },
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Indicator>
      <IconButton ariaLabel="Test" icon={HomeIcon} {...args} />
    </Indicator>
    <Indicator value={2}>
      <IconButton ariaLabel="Test" icon={HomeIcon} {...args} />
    </Indicator>
    <Indicator value={33}>
      <IconButton ariaLabel="Test" icon={HomeIcon} {...args} />
    </Indicator>
    <Indicator value="Text">
      <IconButton ariaLabel="Test" icon={HomeIcon} {...args} />
    </Indicator>
  </Container>
);

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color: any) => (
      <Indicator key={color} color={color} value={23}>
        <IconButton ariaLabel="Test" icon={HomeIcon} {...args} />
      </Indicator>
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};
