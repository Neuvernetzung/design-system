import { render } from "../../../../test-utils";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { Switch } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return <Switch control={control} name="select" label="Switch" />;
};

it("Switch axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
