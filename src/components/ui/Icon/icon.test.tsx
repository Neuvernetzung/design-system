import { render } from "../../../../test-utils";
import { axe } from "jest-axe";
import { IconHome } from "@tabler/icons-react";
import { Icon } from ".";

it("Icon axe", async () => {
  const { container } = render(<Icon icon={IconHome} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
