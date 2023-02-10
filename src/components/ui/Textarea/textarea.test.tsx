import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { Textarea } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return <Textarea control={control} name="textarea" label="Textarea" />;
};

it("Textarea axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
