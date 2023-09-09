import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Toast } from ".";

it("Toast axe", async () => {
  const { container } = render(
    <Toast message="Test" handleClose={() => null} />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
