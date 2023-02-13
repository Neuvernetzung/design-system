import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { TooltipInner } from ".";

it("TooltipInner axe", async () => {
  const { container } = render(<TooltipInner label="Test" />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
