import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import { Code } from ".";

it("Code axe", async () => {
  const { container } = render(<Code>Test</Code>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
