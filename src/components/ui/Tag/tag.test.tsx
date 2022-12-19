import { axe } from "jest-axe";
import { Tag } from ".";
import { render } from "@testing-library/react";

it("Tag axe", async () => {
  const { container } = render(<Tag label="Test" />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
