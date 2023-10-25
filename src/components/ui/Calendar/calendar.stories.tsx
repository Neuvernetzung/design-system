import { Meta } from "@storybook/react";
import React, { useState } from "react";

import {
  Calendar,
  CalendarDateDayView,
  CalendarDateMonthView,
  CalendarDateYearView,
} from ".";
import {
  addDays,
  addMonths,
  isSameDay,
  isSameMonth,
  isSameYear,
  subDays,
} from "date-fns";
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

export const CustomShortcuts = ({ ...args }) => {
  const calendarProps = useCalendar({ cols: 3 });
  return (
    <Calendar
      shortcuts={[
        ({ setViewing, viewing }) => ({
          buttonProps: {
            onClick: () => setViewing(addMonths(viewing, 1)),
            children: "Nächster Monat",
          },
        }),
      ]}
      calendarProps={calendarProps}
      {...args}
    />
  );
};

export const MultipleSelect = ({ ...args }) => {
  const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: "short" });
  const calendarProps = useCalendar({ cols: 3 });
  const [values, setValues] = useState<Date[]>([]);

  return (
    <>
      <div className="flex flex-row gap-4">
        {values.map((v, i) => (
          <div key={i}>{formatter.format(v)}</div>
        ))}
      </div>
      <Calendar
        selectType="multiple"
        onChange={(values) => setValues(values)}
        calendarProps={calendarProps}
        {...args}
      />
    </>
  );
};

export const RangeSelect = ({ ...args }) => {
  const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: "short" });
  const calendarProps = useCalendar({ cols: 3 });
  const [values, setValues] = useState<Date[]>([]);

  return (
    <>
      <div className="flex flex-row gap-4">
        {values.map((v, i) => (
          <div key={i}>{formatter.format(v)}</div>
        ))}
      </div>
      <Calendar
        selectType="range"
        onChange={(values) => setValues(values)}
        calendarProps={calendarProps}
        {...args}
      />
    </>
  );
};
