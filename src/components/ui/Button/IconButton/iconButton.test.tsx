import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { HomeIcon } from "../../../../theme/icons";
import { IconButton } from ".";

it("IconButton axe", async () => {
  const { container } = render(<IconButton ariaLabel="Test" icon={HomeIcon} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
