import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { Checkbox } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return (
    <Checkbox
      control={control}
      name="checkbox-2"
      label="Mehrere Optionen"
      options={[
        { label: "Option 1", value: "option-1" },
        { label: "Option 2", value: "option-2" },
      ]}
    />
  );
};

it("Checkbox axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
