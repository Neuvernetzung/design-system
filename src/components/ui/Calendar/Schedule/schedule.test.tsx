import { axe } from "jest-axe";

import { render } from "../../../../../test-utils";
import { type UseCalendarProps, useCalendar } from "../hooks";
import {
  Schedule,
  ScheduleDayView,
  ScheduleMonthView,
  ScheduleWeekView,
} from ".";
import type { ReactNode } from "react";

type CalendarPropsWrapperProps = {
  children: (calendarProps: UseCalendarProps) => ReactNode;
};

beforeAll(() => {
  Element.prototype.scrollTo = jest.fn(); // scrollTo wird in jest Environment nicht erkannt, ist aber auch nicht wichtig für Test, deshalb mock
});

const CalendarPropsWrapper = ({ children }: CalendarPropsWrapperProps) => {
  const calendarProps = useCalendar();

  return children(calendarProps);
};

it("Schedule axe", async () => {
  const { container } = render(<Schedule />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("ScheduleDayView axe", async () => {
  const { container } = render(
    <CalendarPropsWrapper>
      {(calendarProps) => <ScheduleDayView calendarProps={calendarProps} />}
    </CalendarPropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("ScheduleMonthView axe", async () => {
  const { container } = render(
    <CalendarPropsWrapper>
      {(calendarProps) => <ScheduleMonthView calendarProps={calendarProps} />}
    </CalendarPropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("ScheduleWeekView axe", async () => {
  const { container } = render(
    <CalendarPropsWrapper>
      {(calendarProps) => <ScheduleWeekView calendarProps={calendarProps} />}
    </CalendarPropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
