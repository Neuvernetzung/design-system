import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Menu } from ".";

it("Menu axe", async () => {
  const { container } = render(
    <Menu
      items={[
        {
          children: "Test",
          href: "/",
        },
      ]}
      buttonType="button"
      buttonProps={{ children: "Test" }}
    />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
