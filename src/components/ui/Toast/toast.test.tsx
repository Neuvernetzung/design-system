import { axe } from "jest-axe";
import { Toast } from ".";
import { render } from "@testing-library/react";

it("Toast axe", async () => {
  const { container } = render(
    <Toast message="Test" handleClose={() => null} />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
