import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Drawer } from ".";

it("Drawer axe", async () => {
  const { container } = render(
    <Drawer open setOpen={() => null} title="Test" content="Content" />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
