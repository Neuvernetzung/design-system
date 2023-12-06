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
      <Tag key={size} size={size} {...args}>
        {size}
      </Tag>
    ))}
  </Container>
);

Sizes.parameters = {
  controls: { exclude: "color" },
};

export const Variants = ({ ...args }) => (
  <Container>
    {tagVariants.map((variant) => (
      <Tag key={variant} variant={variant} {...args}>
        {variant}
      </Tag>
    ))}
  </Container>
);

Variants.parameters = {
  controls: { exclude: "variant" },
};

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <Tag key={color} color={color} {...args}>
        {color}
      </Tag>
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};

export const WithIcon = ({ ...args }) => (
  <Container>
    <Tag leftIcon={IconSettings} {...args}>
      left
    </Tag>
    <Tag rightIcon={IconSettings} {...args}>
      right
    </Tag>
    <Tag leftIcon={IconSettings} {...args} />
  </Container>
);

export const Rounded = ({ ...args }) => (
  <Container>
    <Tag rounded {...args}>
      rounded
    </Tag>
    <Tag rounded leftIcon={IconSettings} {...args}>
      rounded
    </Tag>
    <Tag rounded leftIcon={IconSettings} {...args} />
  </Container>
);
export const Element = ({ ...args }) => (
  <Container>
    <Tag {...args}>
      <div className="flex flex-row items-center gap-2">
        <span className="flex h-2 w-2 bg-primary-500 rounded-full" />
        Text
      </div>
    </Tag>
  </Container>
);
