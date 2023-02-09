import { axe } from "jest-axe";
import { Textarea } from ".";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";

const ExtendedForm = () => {
  const { control } = useForm();

  return <Textarea control={control} name="textarea" label="Textarea" />;
};

it("Textarea axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
