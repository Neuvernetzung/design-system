import { axe } from "jest-axe";
import { Button } from ".";
import { render } from "@testing-library/react";

it("Button axe", async () => {
  const { container } = render(<Button>Test</Button>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
