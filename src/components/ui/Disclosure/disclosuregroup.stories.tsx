import { Meta } from "@storybook/react";
import { useState } from "react";

import { disclosureVariants, sizes } from "../../../types";
import { DisclosureGroup } from ".";

export default {
  title: "UI/Disclosures/DisclosureGroup",
  component: DisclosureGroup,
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

export const Default = ({ ...args }) => (
  <Container>
    <DisclosureGroup
      items={[
        { title: "Disclosure 1", content: "Content 1" },
        { title: "Disclosure 2", content: "Content 2" },
        { title: "Disclosure 3", content: "Content 3" },
      ]}
      {...args}
    />
  </Container>
);

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <DisclosureGroup
        key={size}
        size={size}
        items={[
          { title: `${size} 1`, content: "Content 1" },
          { title: `${size} 2`, content: "Content 2" },
          { title: `${size} 3`, content: "Content 3" },
        ]}
        {...args}
      />
    ))}
  </Container>
);

export const Variants = ({ ...args }) => (
  <Container>
    {disclosureVariants.map((variant) => (
      <DisclosureGroup
        key={variant}
        variant={variant}
        items={[
          { title: `${variant} 1`, content: "Content 1" },
          { title: `${variant} 2`, content: "Content 2" },
          { title: `${variant} 3`, content: "Content 3" },
        ]}
        {...args}
      />
    ))}
  </Container>
);

export const ChevronIcon = ({ ...args }) => (
  <Container>
    <DisclosureGroup
      icon="chevron"
      items={[
        { title: `1`, content: "Content 1" },
        { title: `2`, content: "Content 2" },
        { title: `3`, content: "Content 3" },
      ]}
      {...args}
    />
  </Container>
);

export const DefaultOpen = ({ ...args }) => (
  <Container>
    <DisclosureGroup
      items={[
        { title: `1`, content: "Content 1", defaultOpen: true },
        { title: `2`, content: "Content 2" },
        { title: `3`, content: "Content 3" },
      ]}
      {...args}
    />
  </Container>
);

export const Controlled = ({ ...args }) => {
  const [value, setValue] = useState<number[]>([]);

  return (
    <Container className="flex flex-col">
      {JSON.stringify(value)}
      <DisclosureGroup
        value={value}
        setValue={setValue}
        items={[
          { title: `1`, content: "Content 1", defaultOpen: true },
          { title: `2`, content: "Content 2" },
          { title: `3`, content: "Content 3" },
        ]}
        {...args}
      />
    </Container>
  );
};
