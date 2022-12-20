import { axe } from "jest-axe";
import { IconButton } from ".";
import { render } from "@testing-library/react";
import { HomeIcon } from "../../../../theme/icons";

it("IconButton axe", async () => {
  const { container } = render(<IconButton ariaLabel="Test" icon={HomeIcon} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
