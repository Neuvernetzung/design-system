import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { TooltipInner } from ".";

it("TooltipInner axe", async () => {
  const { container } = render(<TooltipInner label="Test" />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
