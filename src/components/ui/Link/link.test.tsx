import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Link } from ".";

it("Link axe", async () => {
  const { container } = render(<Link href="/">Test</Link>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
