import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import { Heading } from ".";

it("Heading axe", async () => {
  const { container } = render(<Heading>Test</Heading>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
