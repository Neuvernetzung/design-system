import { IconSettings } from "@tabler/icons-react";
import { Meta } from "@storybook/react";

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
    {tagVariants.map((variant) => (
      <Tag key={variant} label={variant} variant={variant} {...args} />
    ))}
  </Container>
);

Variants.parameters = {
  controls: { exclude: "variant" },
};

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <Tag key={color} label={color} color={color} {...args} />
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};

export const WithIcon = ({ ...args }) => (
  <Container>
    <Tag label="left" leftIcon={IconSettings} {...args} />
    <Tag label="left" rightIcon={IconSettings} {...args} />
    <Tag leftIcon={IconSettings} {...args} />
  </Container>
);

export const Rounded = ({ ...args }) => (
  <Container>
    <Tag rounded label="rounded" {...args} />
    <Tag rounded label="rounded" leftIcon={IconSettings} {...args} />
    <Tag rounded leftIcon={IconSettings} {...args} />
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
