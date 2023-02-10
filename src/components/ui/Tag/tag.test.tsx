import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Tag } from ".";

it("Tag axe", async () => {
  const { container } = render(<Tag label="Test" />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
