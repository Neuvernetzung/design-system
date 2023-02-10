import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { ListItem, OrderedList, UnorderedList } from ".";

it("OrderedList axe", async () => {
  const { container } = render(
    <OrderedList>
      <ListItem>Test</ListItem>
    </OrderedList>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("UnorderedList axe", async () => {
  const { container } = render(
    <UnorderedList>
      <ListItem>Test</ListItem>
    </UnorderedList>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
