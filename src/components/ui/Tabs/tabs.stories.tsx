import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import type { Colors as ColorsType, Sizes as SizesType } from "../../../types";
import { Button } from "../Button";
import {
  TabButton,
  TabGroup,
  TabList,
  TabPanels,
  Tabs,
  StandaloneTabList,
} from "./tabs";

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

export const SeparateButtons = ({ ...args }) => {
  const items = [
    { title: "Tab 1", content: "Content 1" },
    { title: "Tab 2", content: "Content 2" },
    { title: "Tab 3", content: "Content 3" },
  ];

  return (
    <Container>
      <TabGroup>
        <StandaloneTabList>
          <TabButton {...items[0]} {...args} />
          <TabButton {...items[1]} {...args} />
        </StandaloneTabList>
        <TabPanels items={items} {...args} />
        <StandaloneTabList>
          <TabButton {...items[2]} {...args} />
        </StandaloneTabList>
      </TabGroup>
    </Container>
  );
};

export const Controlled = ({ ...args }) => {
  const items = [
    { title: "Tab 1", content: "Content 1" },
    { title: "Tab 2", content: "Content 2" },
    { title: "Tab 3", content: "Content 3" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Container>
      <Button
        onClick={() => setSelectedIndex((selectedIndex + 1) % items.length)}
      >
        Nächster Tab
      </Button>
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabButton className="hidden" {...items[0]} {...args} />
        <TabButton className="hidden" {...items[1]} {...args} />
        <TabButton className="hidden" {...items[2]} {...args} />
        <TabPanels items={items} {...args} />
      </TabGroup>
    </Container>
  );
};
