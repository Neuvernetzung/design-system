import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { BarList } from ".";

it("BarList axe", async () => {
  const data = [
    {
      name: "Twitter",
      value: 300,
    },
    { name: "Facebook", value: 285 },
    { name: "YouTube", value: 503 },
    { name: "LinkedIn", value: 125 },
    { name: "Instagram", value: 1055 },
  ];
  const { container } = render(<BarList data={data} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
