import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Meta } from "@storybook/react";
import React from "react";

import { colors, sizes, tagVariants } from "../../../types";
import { Tag } from "./tag";

export default {
  title: "UI/Data Display/Tag",
  component: Tag,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Tag key={size} label={size} size={size} {...args} />
    ))}
  </Container>
);

Sizes.parameters = {
  controls: { exclude: "color" },
};

export const Variants = ({ ...args }) => (
  <Container>
    {tagVariants.map((variant: any) => (
      <Tag key={variant} label={variant} variant={variant} {...args} />
    ))}
  </Container>
);

Variants.parameters = {
  controls: { exclude: "variant" },
};

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color: any) => (
      <Tag key={color} label={color} color={color} {...args} />
    ))}
  </Container>
);

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
export const Element = ({ ...args }) => (
  <Container>
    <Tag
      label={
        <div className="flex flex-row items-center gap-2">
          <span className="flex h-2 w-2 bg-primary-500 rounded-full" />
          Text
        </div>
      }
      {...args}
    />
  </Container>
);
