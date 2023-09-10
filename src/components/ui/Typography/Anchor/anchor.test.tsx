import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import { Anchor } from ".";

it("Anchor axe", async () => {
  const { container } = render(<Anchor>Test</Anchor>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
