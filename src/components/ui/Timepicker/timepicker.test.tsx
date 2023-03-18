import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { Timepicker } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return <Timepicker control={control} name="Timepicker" label="Timepicker" />;
};

it("Timepicker axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
