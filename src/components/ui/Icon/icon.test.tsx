import { axe } from "jest-axe";
import { Icon } from ".";
import { render } from "@testing-library/react";
import { HomeIcon } from "../../../theme/icons";

it("Icon axe", async () => {
  const { container } = render(<Icon icon={HomeIcon} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
