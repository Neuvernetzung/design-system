import { axe } from "jest-axe";
import { RichText } from ".";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";

const ExtendedForm = () => {
  const { control } = useForm();

  return <RichText control={control} name="richText" label="RichText" />;
};

it("RichText axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
