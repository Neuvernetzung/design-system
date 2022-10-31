import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import type { Colors as ColorsType, Sizes as SizesType } from "../../../types";
import { TabGroup, TabList, TabPanels, Tabs } from "./tabs";

export default {
  title: "UI/Disclosures/Tabs",
  component: Tabs,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Tabs
      items={[
        { title: "Tab 1", content: "Content 1" },
        { title: "Tab 2", content: "Content 2" },
        { title: "Tab 3", content: "Content 3" },
      ]}
      {...args}
    />
  </Container>
);

export const Sizes = ({ ...args }) => {
  const sizes: (keyof SizesType)[] = ["xs", "sm", "md", "lg", "xl"];

  return (
    <Container>
      {sizes.map((size) => (
        <Tabs
          key={size}
          size={size}
          items={[
            { title: "Tab 1", content: "Content 1" },
            { title: "Tab 2", content: "Content 2" },
            { title: "Tab 3", content: "Content 3" },
          ]}
          {...args}
        />
      ))}
    </Container>
  );
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
      {colors.map((color) => (
        <Tabs
          key={color}
          color={color}
          items={[
            { title: "Tab 1", content: "Content 1" },
            { title: "Tab 2", content: "Content 2" },
            { title: "Tab 3", content: "Content 3" },
          ]}
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

export const Separate = ({ ...args }) => {
  const items = [
    { title: "Tab 1", content: "Content 1" },
    { title: "Tab 2", content: "Content 2" },
    { title: "Tab 3", content: "Content 3" },
  ];

  return (
    <Container>
      <TabGroup>
        <TabList items={items} {...args} />
        <TabPanels items={items} {...args} />
      </TabGroup>
    </Container>
  );
};
