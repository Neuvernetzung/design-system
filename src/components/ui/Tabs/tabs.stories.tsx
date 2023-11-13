import { Meta } from "@storybook/react";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

import { colors, sizes, tabListVariants } from "../../../types";
import { Button, IconButton } from "../Button";
import { Tag } from "../Tag";
import { TabGroup, TabItemProps, TabList, TabPanels, Tabs } from ".";

export default {
  title: "UI/Disclosures/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Tabs
      items={[
        { title: "Tab 1", content: "Content 1", value: "1" },
        { title: "Tab 2", content: "Content 2", value: "2" },
        { title: "Tab 3", content: "Content 3", value: "3" },
      ]}
      {...args}
    />
  </Container>
);

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Tabs
        key={size}
        size={size}
        items={[
          { title: "Tab 1", content: "Content 1", value: "1" },
          { title: "Tab 2", content: "Content 2", value: "2" },
          { title: "Tab 3", content: "Content 3", value: "3" },
        ]}
        {...args}
      />
    ))}
  </Container>
);

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <Tabs
        key={color}
        color={color}
        items={[
          { title: "Tab 1", content: "Content 1", value: "1" },
          { title: "Tab 2", content: "Content 2", value: "2" },
          { title: "Tab 3", content: "Content 3", value: "3" },
        ]}
        {...args}
      />
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};

export const AdditionalHeadElements = ({ ...args }) => (
  <Container>
    <Tabs
      headerEndElement={
        <IconButton variant="ghost" ariaLabel="close" icon={IconX} size="sm" />
      }
      headerStartElement={
        <Tag
          label="nicht klickbar"
          variant="subtile"
          color="primary"
          size="sm"
        />
      }
      items={[
        { title: "Tab 1", content: "Content 1", value: "1" },
        { title: "Tab 2", content: "Content 2", value: "2" },
        { title: "Tab 3", content: "Content 3", value: "3" },
      ]}
      {...args}
    />
  </Container>
);

export const ListVariants = ({ ...args }) => (
  <Container>
    {tabListVariants.map((variant) => (
      <Tabs
        key={variant}
        tabListVariant={variant}
        items={[
          { title: "Tab 1", content: "Content 1", value: "1" },
          { title: "Tab 2", content: "Content 2", value: "2" },
          { title: "Tab 3", content: "Content 3", value: "3" },
        ]}
        {...args}
      />
    ))}
  </Container>
);

export const Separate = ({ ...args }) => {
  const items = [
    { title: "Tab 1", content: "Content 1", value: "1" },
    { title: "Tab 2", content: "Content 2", value: "2" },
    { title: "Tab 3", content: "Content 3", value: "3" },
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

export const WithSpace = ({ ...args }) => {
  const items: TabItemProps[] = [
    { title: "Tab 1", content: "Content 1", value: "1" },
    { title: "Tab 2", content: "Content 2", value: "2" },
    { type: "separator" },
    { title: "Tab 3", content: "Content 3", value: "3" },
    { type: "separator" },
    { title: "Tab 4", content: "Content 4", value: "4" },
  ];

  return (
    <Container>
      <Tabs
        headerEndElement={
          <IconButton
            ariaLabel="close"
            icon={IconX}
            size="sm"
            variant="ghost"
          />
        }
        items={items}
        {...args}
      />
    </Container>
  );
};

export const Controlled = ({ ...args }) => {
  const items = [
    { title: "Tab 1", content: "Content 1", value: "1" },
    { title: "Tab 2", content: "Content 2", value: "2" },
    { title: "Tab 3", content: "Content 3", value: "3" },
  ];

  const [value, setValue] = useState(0);

  return (
    <Container>
      <Button onClick={() => setValue((value + 1) % items.length)}>
        Nächster Tab
      </Button>
      <Tabs
        items={items}
        value={items[value].value}
        setValue={(v) => setValue(items.findIndex((item) => item.value === v))}
        {...args}
      />
    </Container>
  );
};
