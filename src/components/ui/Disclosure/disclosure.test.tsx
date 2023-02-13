import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Disclosure } from ".";

it("Disclosure axe", async () => {
  const { container } = render(
    <Disclosure
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
