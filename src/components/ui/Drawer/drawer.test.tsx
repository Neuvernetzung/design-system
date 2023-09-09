import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Drawer } from ".";

it("Drawer axe", async () => {
  const { container } = render(
    <Drawer open setOpen={() => null} title="Test" content="Content" />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
