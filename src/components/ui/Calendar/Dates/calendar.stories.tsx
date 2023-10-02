import { Meta } from "@storybook/react";
import React from "react";

import {
  Calendar,
  CalendarDateDayView,
  CalendarDateMonthView,
  CalendarDateYearView,
} from ".";
import { addDays, subDays } from "date-fns";

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

export const Days = ({ ...args }) => (
  <CalendarDateDayView indicators={indicators} {...args} />
);

export const Months = ({ ...args }) => (
  <CalendarDateMonthView indicators={indicators} {...args} />
);

export const Years = ({ ...args }) => (
  <CalendarDateYearView indicators={indicators} {...args} />
);
