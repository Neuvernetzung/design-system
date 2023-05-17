import { Meta } from "@storybook/react";
import React from "react";

import { Disclosure, sizes } from "./disclosure";

export default {
  title: "UI/Disclosures/Disclosure",
  component: Disclosure,
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
    <Disclosure
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
      <Disclosure
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

export const ChevronIcon = ({ ...args }) => (
  <Container>
    <Disclosure
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
    <Disclosure
      items={[
        { title: `1`, content: "Content 1", defaultOpen: true },
        { title: `2`, content: "Content 2" },
        { title: `3`, content: "Content 3" },
      ]}
      {...args}
    />
  </Container>
);
