import { HomeIcon } from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Button, colors, focuses, sizes, variants } from "./button";

export default {
  title: "UI/Buttons/Button",
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
    as: { control: false },
    leftIcon: { control: false },
    rightIcon: { control: false },
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
  a11y: {
    disable: true,
  },
};

export const Focuses = ({ ...args }) => {
  const _focuses = Object.keys(focuses);

  return (
    <Container>
      {_focuses.map((focus: any) => (
        <Button focus={focus} key={focus} {...args}>
          {focus}
        </Button>
      ))}
    </Container>
  );
};

Focuses.parameters = {
  controls: { exclude: "focus" },
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

export const AsComponent = ({ ...args }) => {
  const components = ["button", "a"];

  return (
    <Container>
      {components.map((component: any) => (
        <Button as={component} href="#" key={component} {...args}>
          {component}
        </Button>
      ))}
    </Container>
  );
};

export const FullWidth = ({ ...args }) => (
  <Container>
    <Button fullWidth {...args}>
      full width
    </Button>
  </Container>
);

export const Rounded = ({ ...args }) => (
  <Container>
    <Button rounded {...args}>
      rounded
    </Button>
  </Container>
);

export const WithIcon = ({ ...args }) => (
  <Container>
    <Button leftIcon={HomeIcon} {...args}>
      left Icon
    </Button>
    <Button rightIcon={HomeIcon} {...args}>
      right Icon
    </Button>
  </Container>
);

export const Disabled = ({ ...args }) => (
  <Container>
    <Button disabled {...args}>
      disabled
    </Button>
  </Container>
);
