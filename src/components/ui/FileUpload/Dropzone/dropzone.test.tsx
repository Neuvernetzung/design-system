import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { Dropzone } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return <Dropzone control={control} name="dropzone" label="Dropzone" />;
};

it("Dropzone axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
