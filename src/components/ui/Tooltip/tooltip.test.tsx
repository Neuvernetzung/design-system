import { axe } from "jest-axe";
import { TooltipInner } from ".";
import { render } from "@testing-library/react";

it("TooltipInner axe", async () => {
  const { container } = render(<TooltipInner label="Test" />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
