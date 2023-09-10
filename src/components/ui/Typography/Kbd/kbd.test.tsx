import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import { Kbd } from ".";

it("Kbd axe", async () => {
  const { container } = render(<Kbd>Test</Kbd>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
