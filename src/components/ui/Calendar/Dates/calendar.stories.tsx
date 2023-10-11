import { Meta } from "@storybook/react";
import React from "react";

import {
  Calendar,
  CalendarDateDayView,
  CalendarDateMonthView,
  CalendarDateYearView,
} from ".";
import { addDays, subDays } from "date-fns";
import { useCalendar } from "../hooks/useCalendar";

export default {
  title: "UI/Data Display/Calendar",
  component: Calendar,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const indicators = [new Date(), addDays(new Date(), 2), subDays(new Date(), 5)];

export const Default = ({ ...args }) => (
  <Calendar indicators={indicators} {...args} />
);

export const Days = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <CalendarDateDayView
      indicators={indicators}
      calendarProps={calendarProps}
      {...args}
    />
  );
};

export const Months = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <CalendarDateMonthView
      indicators={indicators}
      calendarProps={calendarProps}
      {...args}
    />
  );
};

export const Years = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <CalendarDateYearView
      indicators={indicators}
      calendarProps={calendarProps}
      {...args}
    />
  );
};
