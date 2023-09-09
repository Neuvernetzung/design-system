import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import { HomeIcon } from "../../../../theme/icons";
import { IconButton } from ".";

it("IconButton axe", async () => {
  const { container } = render(<IconButton ariaLabel="Test" icon={HomeIcon} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
