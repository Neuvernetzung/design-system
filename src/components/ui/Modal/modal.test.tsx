import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Modal } from ".";

it("Modal axe", async () => {
  const { container } = render(
    <Modal
      header="Test"
      content="Hier steht der Content."
      open
      setOpen={() => null}
    />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
