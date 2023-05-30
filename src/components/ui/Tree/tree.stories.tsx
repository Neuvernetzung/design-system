import { Meta } from "@storybook/react";
import React from "react";

import { Tree, TreeItemProps } from ".";
import { borderVariants } from "../../../styles";
import { sizes } from "../../../types";

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

const items: TreeItemProps[] = [
  {
    title: "Item 1",

    items: [
      {
        title: "Nested 1",
        items: [
          { title: "Tief 1", content: "Tief content 1" },
          { title: "Tief 2", content: "Tief content 2" },
        ],
      },
      {
        title: "Nested 2",
        items: [
          { title: "Tief 1", content: "Tief content 1" },
          { title: "Tief 2", content: "Tief content 2" },
        ],
      },
      {
        title: "Nested 3",
        items: [
          { title: "Tief 1", content: "Tief content 1" },
          { title: "Tief 2", content: "Tief content 2" },
        ],
      },
      {
        title: "Nested 4",
        items: [
          { title: "Tief 1", content: "Tief content 1" },
          { title: "Tief 2", content: "Tief content 2" },
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
          { title: "Tief 1", content: "Tief content 1" },
          { title: "Tief 2", content: "Tief content 2" },
        ],
      },
      {
        title: "Nested 2",
        items: [
          { title: "Tief 1", content: "Tief content 1" },
          { title: "Tief 2", content: "Tief content 2" },
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
    <Tree items={items} />
  </Container>
);

export const BorderVariants = ({ ...args }) => (
  <Container>
    {borderVariants.map((variant) => (
      <Tree key={variant} borderVariant={variant} items={items} />
    ))}
  </Container>
);

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Tree key={size} size={size} items={items} />
    ))}
  </Container>
);
