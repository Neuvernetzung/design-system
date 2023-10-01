import { Meta } from "@storybook/react";
import React from "react";

import {
  Calendar,
  CalendarDateDayView,
  CalendarDateMonthView,
  CalendarDateYearView,
} from ".";

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

export const Default = ({ ...args }) => <Calendar {...args} />;

export const Days = ({ ...args }) => <CalendarDateDayView {...args} />;

export const Months = ({ ...args }) => <CalendarDateMonthView {...args} />;

export const Years = ({ ...args }) => <CalendarDateYearView {...args} />;
