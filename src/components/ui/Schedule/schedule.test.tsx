import { axe } from "jest-axe";
import type { ReactNode } from "react";

import { render } from "../../../../test-utils";
import { Schedule } from ".";
import { useSchedule, type UseScheduleProps } from "./hooks";
import { ScheduleDayView } from "./View/day";
import { ScheduleMonthView } from "./View/month";
import { ScheduleWeekView } from "./View/week";

type SchedulePropsWrapperProps = {
  children: (scheduleProps: UseScheduleProps) => ReactNode;
};

beforeAll(() => {
  Element.prototype.scrollTo = jest.fn(); // scrollTo wird in jest Environment nicht erkannt, ist aber auch nicht wichtig für Test, deshalb mock
});

const SchedulePropsWrapper = ({ children }: SchedulePropsWrapperProps) => {
  const scheduleProps = useSchedule();

  return children(scheduleProps);
};

it("Schedule axe", async () => {
  const { container } = render(
    <SchedulePropsWrapper>
      {(scheduleProps) => <Schedule {...scheduleProps} />}
    </SchedulePropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("ScheduleDayView axe", async () => {
  const { container } = render(
    <SchedulePropsWrapper>
      {(scheduleProps) => <ScheduleDayView {...scheduleProps} />}
    </SchedulePropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("ScheduleMonthView axe", async () => {
  const { container } = render(
    <SchedulePropsWrapper>
      {(scheduleProps) => <ScheduleMonthView {...scheduleProps} />}
    </SchedulePropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it("ScheduleWeekView axe", async () => {
  const { container } = render(
    <SchedulePropsWrapper>
      {(scheduleProps) => <ScheduleWeekView {...scheduleProps} />}
    </SchedulePropsWrapper>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
