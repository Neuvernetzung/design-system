import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { InputNumber } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return <InputNumber control={control} name="input" label="Input" />;
};

it("Input axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
