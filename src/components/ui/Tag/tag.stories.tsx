import { IconSettings } from "@tabler/icons-react";


import { colors, sizes, tagVariants } from "../../../types";
import { Tag } from "./tag";

export default {
  title: "UI/Data Display/Tag",
  component: Tag,
} ;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Sizes = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <Tag key={size} size={size} {...args}>
          {size}
        </Tag>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};

export const Variants = {
  render: ({ ...args }) => (
    <Container>
      {tagVariants.map((variant) => (
        <Tag key={variant} variant={variant} {...args}>
          {variant}
        </Tag>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "variant" },
  },
};

export const Colors = {
  render: ({ ...args }) => (
    <Container>
      {colors.map((color) => (
        <Tag key={color} color={color} {...args}>
          {color}
        </Tag>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};

export const WithIcon = {
  render: ({ ...args }) => (
    <Container>
      <Tag leftIcon={IconSettings} {...args}>
        left
      </Tag>
      <Tag rightIcon={IconSettings} {...args}>
        right
      </Tag>
      <Tag leftIcon={IconSettings} {...args} />
    </Container>
  ),
};

export const Rounded = {
  render: ({ ...args }) => (
    <Container>
      <Tag rounded {...args}>
        rounded
      </Tag>
      <Tag rounded leftIcon={IconSettings} {...args}>
        rounded
      </Tag>
      <Tag rounded leftIcon={IconSettings} {...args} />
    </Container>
  ),
};

export const Element = {
  render: ({ ...args }) => (
    <Container>
      <Tag {...args}>
        <div className="flex flex-row items-center gap-2">
          <span className="flex h-2 w-2 bg-primary-500 rounded-full" />
          Text
        </div>
      </Tag>
    </Container>
  ),
};
