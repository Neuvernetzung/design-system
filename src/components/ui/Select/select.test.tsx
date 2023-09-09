import { render } from "../../../../test-utils";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { Select } from ".";

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
