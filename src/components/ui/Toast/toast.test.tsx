import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Toast } from ".";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";

it("Toast axe", async () => {
  const { container } = render(
    <ToastProvider>
      <Toast message="Test" open setOpen={() => null} />
      <ToastViewport />
    </ToastProvider>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
