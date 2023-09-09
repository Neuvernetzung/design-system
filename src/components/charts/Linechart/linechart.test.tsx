import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Linechart } from ".";

it("Linechart axe", async () => {
  const sales = [
    { x: "2023-04-29T12:00:00.00+00:00", y: 1 },
    { x: "2023-04-30T12:00:00.00+00:00", y: 5 },
    { x: "2023-05-01T12:00:00.00+00:00", y: 6 },
    { x: "2023-05-02T12:00:00.00+00:00", y: 8 },
    { x: "2023-05-03T12:00:00.00+00:00", y: 7 },
    { x: "2023-05-04T12:00:00.00+00:00", y: 10 },
    { x: "2023-05-05T12:00:00.00+00:00", y: null },
    { x: "2023-05-06T12:00:00.00+00:00", y: 12 },
    { x: "2023-05-07T12:00:00.00+00:00", y: 4 },
    { x: "2023-05-08T12:00:00.00+00:00", y: 7 },
  ];
  const data = sales.map((d) => ({ ...d, x: new Date(d.x) }));
  const { container } = render(<Linechart data={data} xScaleType="time" />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
