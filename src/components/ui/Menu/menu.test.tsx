import { axe } from "jest-axe";
import { Menu } from ".";
import { render } from "@testing-library/react";

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
