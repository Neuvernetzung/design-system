import { Meta } from "@storybook/react";

import { Tree, TreeDisclosure, TreeItemProps } from ".";
import { borderVariants } from "../../../styles";
import { sizes } from "../../../types";
import { DisclosureItemProps } from "../Disclosure";

export default {
  title: "UI/Disclosures/Tree",
  component: Tree,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const items: TreeItemProps<Omit<DisclosureItemProps, "content">>[] = [
  {
    title: "Item 1",
    children: "Überschrift",
    items: [
      {
        title: "Nested 1",
        children: "Überschrift",
        items: [
          { title: "Tief 1", children: "Tief content 1" },
          { title: "Tief 2", children: "Tief content 2" },
        ],
      },
      {
        title: "Nested 2",
        items: [
          { title: "Tief 1", children: "Tief content 1" },
          { title: "Tief 2", children: "Tief content 2" },
        ],
      },
      {
        title: "Nested 3",
        items: [
          { title: "Tief 1", children: "Tief content 1" },
          { title: "Tief 2", children: "Tief content 2" },
        ],
      },
      {
        title: "Nested 4",
        items: [
          { title: "Tief 1", children: "Tief content 1" },
          { title: "Tief 2", children: "Tief content 2" },
        ],
      },
    ],
  },
  {
    title: "Item 2",
    items: [
      {
        title: "Nested 1",
        items: [
          { title: "Tief 1", children: "Tief content 1" },
          { title: "Tief 2", children: "Tief content 2" },
        ],
      },
      {
        title: "Nested 2",
        items: [
          { title: "Tief 1", children: "Tief content 1" },
          { title: "Tief 2", children: "Tief content 2" },
        ],
      },
    ],
  },
];

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5 w-full justify-between" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Tree items={items} {...args} />
  </Container>
);

export const BorderVariants = ({ ...args }) => (
  <Container>
    {borderVariants.map((variant) => (
      <Tree key={variant} borderVariant={variant} items={items} {...args} />
    ))}
  </Container>
);

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Tree key={size} size={size} items={items} {...args} />
    ))}
  </Container>
);

export const Disclosure = ({ ...args }) => (
  <Container>
    <TreeDisclosure items={items} {...args} />
  </Container>
);
