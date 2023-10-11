import { render } from "../../../../../test-utils";
import { axe } from "jest-axe";

import {
  Calendar,
  CalendarDateDayView,
  CalendarDateMonthView,
  CalendarDateYearView,
} from ".";
import { type UseCalendarProps, useCalendar } from "../hooks";
import type { ReactNode } from "react";

type CalendarPropsWrapperProps = {
  children: (calendarProps: UseCalendarProps) => ReactNode;
};

const CalendarPropsWrapper = ({ children }: CalendarPropsWrapperProps) => {
  const calendarProps = useCalendar();

  return children(calendarProps);
};

it("Calendar axe", async () => {
  const { container } = render(<Calendar />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("CalendarDateDayView axe", async () => {
  const { container } = render(
    <CalendarPropsWrapper>
      {(calendarProps) => <CalendarDateDayView calendarProps={calendarProps} />}
    </CalendarPropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("CalendarDateMonthView axe", async () => {
  const { container } = render(
    <CalendarPropsWrapper>
      {(calendarProps) => (
        <CalendarDateMonthView calendarProps={calendarProps} />
      )}
    </CalendarPropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("CalendarDateYearView axe", async () => {
  const { container } = render(
    <CalendarPropsWrapper>
      {(calendarProps) => (
        <CalendarDateYearView calendarProps={calendarProps} />
      )}
    </CalendarPropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
