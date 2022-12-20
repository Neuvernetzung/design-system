import { axe } from "jest-axe";
import { BlockQuote } from ".";
import { render } from "@testing-library/react";

it("BlockQuote axe", async () => {
  const { container } = render(<BlockQuote>Test</BlockQuote>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
