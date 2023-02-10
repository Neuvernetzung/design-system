import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { ColorPicker } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return (
    <ColorPicker control={control} name="colorpicker" label="Color Picker" />
  );
};

it("ColorPicker axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
