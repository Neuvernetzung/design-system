import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { colors, type Sizes as SizesType } from "../../../types";
import { Tag, variants } from "./tag";

export default {
  title: "UI/Data Display/Tag",
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
};

export const WithIcon = ({ ...args }) => (
  <Container>
    <Tag label="left" leftIcon={Cog6ToothIcon} {...args} />
    <Tag label="left" rightIcon={Cog6ToothIcon} {...args} />
    <Tag leftIcon={Cog6ToothIcon} {...args} />
  </Container>
);

export const Rounded = ({ ...args }) => (
  <Container>
    <Tag rounded label="rounded" {...args} />
    <Tag rounded label="rounded" leftIcon={Cog6ToothIcon} {...args} />
    <Tag rounded leftIcon={Cog6ToothIcon} {...args} />
  </Container>
);
