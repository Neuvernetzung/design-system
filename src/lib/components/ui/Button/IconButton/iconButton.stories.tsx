import { HomeIcon } from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Colors as ColorsType, Sizes as SizesType } from "../../../../types";
import { variants } from "../button";
import { focuses, IconButton } from "./iconButton";

export default {
  title: "UI/Buttons/IconButton",
  component: IconButton,
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
        <IconButton
          ariaLabel="home"
          variant={variant}
          key={variant}
          icon={HomeIcon}
          {...args}
        />
      ))}
    </Container>
  );
};

Variants.parameters = {
  controls: { exclude: "variant" },
};

export const Colors = ({ ...args }) => {
  const colors: (keyof ColorsType)[] = [
    "primary",
    "accent",
    "success",
    "warn",
    "danger",
  ];

  return (
    <Container>
      {colors.map((color: any) => (
        <IconButton
          ariaLabel="home"
          color={color}
          key={color}
          icon={HomeIcon}
          {...args}
        />
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
        <IconButton
          ariaLabel="home"
          focus={focus}
          key={focus}
          icon={HomeIcon}
          {...args}
        />
      ))}
    </Container>
  );
};

Focuses.parameters = {
  controls: { exclude: "focus" },
};

export const Sizes = ({ ...args }) => {
  const sizes: (keyof SizesType)[] = ["xs", "sm", "md", "lg", "xl"];

  return (
    <Container>
      {sizes.map((size: any) => (
        <IconButton
          ariaLabel="home"
          size={size}
          key={size}
          icon={HomeIcon}
          {...args}
        />
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
        <IconButton
          ariaLabel="home"
          as={component}
          href="#"
          key={component}
          icon={HomeIcon}
          {...args}
        />
      ))}
    </Container>
  );
};

export const Rounded = ({ ...args }) => (
  <Container>
    <IconButton ariaLabel="home" rounded icon={HomeIcon} {...args} />
  </Container>
);

export const Disabled = ({ ...args }) => (
  <Container>
    <IconButton ariaLabel="home" disabled icon={HomeIcon} {...args} />
  </Container>
);
