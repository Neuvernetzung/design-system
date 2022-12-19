import { axe } from "jest-axe";
import { Radio } from ".";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";

const ExtendedForm = () => {
  const { control } = useForm();

  return (
    <Radio
      control={control}
      name="radio"
      label="Radio"
      options={[
        {
          label: "Value 1",
          value: "radio-1",
        },
        {
          label: "Value 2",
          value: "radio-2",
        },
      ]}
    />
  );
};

it("Radio axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
