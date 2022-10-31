import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import type { Colors as ColorsType, Sizes as SizesType } from "../../../types";
import { Tag, variants } from "./tag";
import { Cog6ToothIcon } from "../../icons";

export default {
  title: "UI/DataDisplay/Tag",
  component: Tag,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Sizes = ({ ...args }) => {
  const sizes: (keyof SizesType)[] = ["xs", "sm", "md", "lg", "xl"];

  return (
    <Container>
      {sizes.map((size) => (
        <Tag key={size} label={size} size={size} {...args} />
      ))}
    </Container>
  );
};

Sizes.parameters = {
  controls: { exclude: "color" },
};

export const Variants = ({ ...args }) => {
  const _variants = Object.keys(variants("accent"));

  return (
    <Container>
      {_variants.map((variant: any) => (
        <Tag key={variant} label={variant} variant={variant} {...args} />
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
        <Tag key={color} label={color} color={color} {...args} />
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

export const WithIcon = ({ ...args }) => (
  <Container>
    <Tag label="left" leftIcon={Cog6ToothIcon} {...args} />
    <Tag label="left" rightIcon={Cog6ToothIcon} {...args} />
  </Container>
);
