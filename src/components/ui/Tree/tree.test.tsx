import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Tree, TreeItemProps } from ".";

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

it("Tree axe", async () => {
  const { container } = render(<Tree items={items} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});