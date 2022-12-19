import { axe } from "jest-axe";
import { Drawer } from ".";
import { render } from "@testing-library/react";

it("Drawer axe", async () => {
  const { container } = render(
    <Drawer open setOpen={() => null} title="Test" content="Content" />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
