import { Meta } from "@storybook/react";
import React from "react";

import {
  Calendar,
  CalendarDateDayView,
  CalendarDateMonthView,
  CalendarDateYearView,
} from ".";
import { addDays, isSameDay, isSameMonth, isSameYear, subDays } from "date-fns";
import { useCalendar } from "./hooks/useCalendar";

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
  <Calendar
    dayHasIndicator={(day) => indicators.some((i) => isSameDay(i, day))}
    monthHasIndicator={(month) => indicators.some((i) => isSameMonth(i, month))}
    yearHasIndicator={(year) => indicators.some((i) => isSameYear(i, year))}
    {...args}
  />
);

export const Days = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <CalendarDateDayView
      dayHasIndicator={(day) => indicators.some((i) => isSameDay(i, day))}
      calendarProps={calendarProps}
      {...args}
    />
  );
};

export const Months = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <CalendarDateMonthView
      monthHasIndicator={(month) =>
        indicators.some((i) => isSameMonth(i, month))
      }
      calendarProps={calendarProps}
      {...args}
    />
  );
};

export const Years = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <CalendarDateYearView
      yearHasIndicator={(year) => indicators.some((i) => isSameYear(i, year))}
      calendarProps={calendarProps}
      {...args}
    />
  );
};

export const Multiple = ({ ...args }) => {
  const calendarProps = useCalendar({ cols: 3 });
  return <Calendar calendarProps={calendarProps} {...args} />;
};
