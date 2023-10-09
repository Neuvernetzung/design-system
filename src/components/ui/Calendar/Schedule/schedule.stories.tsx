import { Meta } from "@storybook/react";
import React from "react";

import { Schedule, ScheduleDayView } from ".";
import { useCalendar } from "../hooks/useCalendar";
import type { VEvent } from "ts-ics";
import {
  addDays,
  addHours,
  addMinutes,
  setHours,
  setMinutes,
  subDays,
} from "date-fns";
import { ScheduleWeekView } from "./week";
import { ScheduleMonthView } from "./month";

export default {
  title: "UI/Data Display/Schedule",
  component: Schedule,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const date = setHours(setMinutes(new Date(), 0), 15);

const events: VEvent[] = [
  {
    summary: "Event - jetzt",
    start: { date },
    created: { date },
    stamp: { date },
    uid: "123",
    duration: { hours: 1.5, minutes: 15 },
  },
  {
    summary: "Event - nicht heute",
    uid: "123",
    start: { date: addDays(date, 1) },
    created: { date: addDays(date, 1) },
    stamp: { date: addDays(date, 1) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - 3",
    uid: "123",
    start: { date: addHours(date, 4) },
    created: { date: addHours(date, 4) },
    stamp: { date: addHours(date, 4) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Frühs",
    uid: "123",
    start: { date: setHours(date, 6) },
    created: { date: setHours(date, 6) },
    stamp: { date: setHours(date, 6) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Start",
    uid: "123",
    start: { date: setHours(date, 1) },
    created: { date: setHours(date, 1) },
    stamp: { date: setHours(date, 1) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Überlappend 8",
    uid: "123",
    start: { date: addMinutes(date, 30) },
    created: { date: addMinutes(date, 30) },
    stamp: { date: addMinutes(date, 30) },
    duration: { hours: 3 },
  },
  {
    summary: "Event - Überlappend aber darunter 5",
    uid: "123",
    start: { date: addHours(date, 2) },
    created: { date: addHours(date, 2) },
    stamp: { date: addHours(date, 2) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Überlappend Nested 1",
    uid: "123",
    start: { date: addHours(date, 1) },
    created: { date: addHours(date, 1) },
    stamp: { date: addHours(date, 1) },
    duration: { hours: 2 },
  },
  {
    summary: "Event - Überlappend Nested 1-1",
    uid: "123",
    start: { date: addHours(date, 1) },
    created: { date: addHours(date, 1) },
    stamp: { date: addHours(date, 1) },
    duration: { hours: 2 },
  },
  {
    summary: "Event - Überlappend - Später 7",
    uid: "123",
    start: { date: addHours(addMinutes(date, 30), 5) },
    created: { date: addHours(addMinutes(date, 30), 5) },
    stamp: { date: addHours(addMinutes(date, 30), 5) },
    duration: { hours: 2 },
  },
  {
    summary: "Event - Überlappend aber darunter 1",
    uid: "123",
    start: { date: addHours(date, 5) },
    created: { date: addHours(date, 5) },
    stamp: { date: addHours(date, 5) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Überlappend aber darunter 2",
    uid: "123",
    start: { date: addHours(date, 6) },
    created: { date: addHours(date, 6) },
    stamp: { date: addHours(date, 6) },
    duration: { hours: 1 },
  },
  {
    summary: "Gestern zu Heute",
    uid: "123",
    start: { date: subDays(setHours(date, 23), 1) },
    created: { date: subDays(setHours(date, 23), 1) },
    stamp: { date: subDays(setHours(date, 23), 1) },
    duration: { hours: 2 },
  },
  {
    summary: "Nach Mitternacht",
    uid: "123",
    start: { date: setHours(date, 23) },
    created: { date: setHours(date, 23) },
    stamp: { date: setHours(date, 23) },
    duration: { hours: 3 },
  },
  {
    summary: "7 Tage lang",
    uid: "123",
    start: { date: setHours(date, 23) },
    created: { date: setHours(date, 23) },
    stamp: { date: setHours(date, 23) },
    duration: { days: 7 },
  },
];

export const Default = ({ ...args }) => (
  <Schedule displayDayTime={{ start: 8, end: 18 }} events={events} {...args} />
);

export const Days = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <ScheduleDayView events={events} calendarProps={calendarProps} {...args} />
  );
};

export const Weeks = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <ScheduleWeekView events={events} calendarProps={calendarProps} {...args} />
  );
};

export const Months = ({ ...args }) => {
  const calendarProps = useCalendar();
  return (
    <ScheduleMonthView
      events={events}
      calendarProps={calendarProps}
      {...args}
    />
  );
};

// export const Years = ({ ...args }) => (
//   <CalendarDateYearView indicators={indicators} {...args} />
// );
