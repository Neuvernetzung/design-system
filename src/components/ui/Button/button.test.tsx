import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Button } from ".";

it("Button axe", async () => {
  const { container } = render(<Button>Test</Button>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
