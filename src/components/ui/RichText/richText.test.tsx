import { render } from "../../../../test-utils";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { RichText } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return <RichText control={control} name="richText" label="RichText" />;
};

it("RichText axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
