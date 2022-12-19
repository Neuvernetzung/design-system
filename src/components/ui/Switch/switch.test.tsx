import { axe } from "jest-axe";
import { Switch } from ".";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";

const ExtendedForm = () => {
  const { control } = useForm();

  return <Switch control={control} name="select" label="Switch" />;
};

it("Switch axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
