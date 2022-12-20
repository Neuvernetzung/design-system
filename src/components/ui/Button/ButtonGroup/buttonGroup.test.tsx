import { axe } from "jest-axe";
import { IconButton, Button } from "..";
import { ButtonGroup } from ".";
import { render } from "@testing-library/react";
import { HomeIcon } from "../../../../theme/icons";

it("ButtonGroup axe", async () => {
  const { container } = render(
    <ButtonGroup>
      <Button>Test</Button>
      <IconButton ariaLabel="Test" icon={HomeIcon} />
    </ButtonGroup>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
