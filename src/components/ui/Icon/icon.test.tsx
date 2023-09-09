import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { HomeIcon } from "../../../theme/icons";
import { Icon } from ".";

it("Icon axe", async () => {
  const { container } = render(<Icon icon={HomeIcon} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
