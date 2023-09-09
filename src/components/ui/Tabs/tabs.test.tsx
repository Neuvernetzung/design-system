import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Tabs } from ".";

it("Tabs axe", async () => {
  const { container } = render(
    <Tabs
      items={[
        {
          title: "Tab 1",
          content: "Content 1",
        },
        {
          title: "Tab 2",
          content: "Content 2",
        },
      ]}
    />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
