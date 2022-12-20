import { axe } from "jest-axe";
import { Select } from ".";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";

const ExtendedForm = () => {
  const { control } = useForm();

  return (
    <Select
      control={control}
      name="select"
      label="Select"
      options={[
        {
          children: "Test",
          value: "test",
        },
      ]}
    />
  );
};

it("Select axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
