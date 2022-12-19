import { axe } from "jest-axe";
import { Heading } from ".";
import { render } from "@testing-library/react";

it("Heading axe", async () => {
  const { container } = render(<Heading>Test</Heading>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
