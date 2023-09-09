import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import { BlockQuote } from ".";

it("BlockQuote axe", async () => {
  const { container } = render(<BlockQuote>Test</BlockQuote>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
