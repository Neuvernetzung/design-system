import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Popover } from ".";

it("Popover axe", async () => {
  const { container } = render(
    <Popover buttonProps={{ children: "Test" }} content="Test" />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
