import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import {
  Calendar,
  CalendarDateDayView,
  CalendarDateMonthView,
  CalendarDateYearView,
} from ".";

it("Calendar axe", async () => {
  const { container } = render(<Calendar />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("CalendarDateDayView axe", async () => {
  const { container } = render(<CalendarDateDayView />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("CalendarDateMonthView axe", async () => {
  const { container } = render(<CalendarDateMonthView />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("CalendarDateYearView axe", async () => {
  const { container } = render(<CalendarDateYearView />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
