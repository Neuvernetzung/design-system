import { axe } from "jest-axe";
import { Popover } from ".";
import { render } from "@testing-library/react";

it("Popover axe", async () => {
  const { container } = render(
    <Popover buttonProps={{ children: "Test" }} content="Test" />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
