import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { HomeIcon } from "../../../../theme/icons";
import { Button, IconButton } from "..";
import { ButtonGroup } from ".";

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
