import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Text } from ".";

it("Text axe", async () => {
  const { container } = render(<Text>Test</Text>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
