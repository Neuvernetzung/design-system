import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { DisclosureGroup } from ".";

it("Disclosure axe", async () => {
  const { container } = render(
    <DisclosureGroup
      items={[
        {
          title: "Test",
          content: "Content",
        },
      ]}
    />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
