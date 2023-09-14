import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import { IconHome } from "@tabler/icons-react";
import { IconButton } from ".";

it("IconButton axe", async () => {
  const { container } = render(<IconButton ariaLabel="Test" icon={IconHome} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
