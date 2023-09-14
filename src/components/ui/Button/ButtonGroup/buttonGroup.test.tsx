import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import { IconHome } from "@tabler/icons-react";
import { Button, IconButton } from "..";
import { ButtonGroup } from ".";

it("ButtonGroup axe", async () => {
  const { container } = render(
    <ButtonGroup>
      <Button>Test</Button>
      <IconButton ariaLabel="Test" icon={IconHome} />
    </ButtonGroup>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
