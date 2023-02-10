import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { HomeIcon } from "../../../theme/icons";
import { Icon } from ".";

it("Icon axe", async () => {
  const { container } = render(<Icon icon={HomeIcon} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
