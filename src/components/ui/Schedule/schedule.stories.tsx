import type { Meta, StoryObj } from "@storybook/react";
import {
  addDays,
  addHours,
  addMinutes,
  getDay,
  setHours,
  setMinutes,
  subDays,
} from "date-fns";
import { useEffect, useState } from "react";
import { type VEvent, weekDays } from "ts-ics";

import { Schedule, ScheduleProps, ViewEvent } from ".";
import { useSchedule, useUrlSchedule } from "./hooks/useSchedule";
import { ScheduleDayView } from "./View/day";
import { ScheduleWeekView } from "./View/week";
import { ScheduleMonthView } from "./View/month";

const meta: Meta<typeof Schedule> = {
  title: "UI/Data Display/Schedule",
  component: Schedule,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

export default meta;

type Story = StoryObj<typeof Schedule>;

const date = setHours(setMinutes(new Date(), 0), 15);

const events: VEvent[] = [
  {
    summary: "Event - jetzt",
    start: { date },
    created: { date },
    stamp: { date },
    uid: "1",
    duration: { hours: 1.5, minutes: 15 },
  },
  {
    summary: "Event - nicht heute",
    uid: "2",
    start: { date: addMinutes(addDays(date, 1), 3) },
    created: { date: addDays(date, 1) },
    stamp: { date: addDays(date, 1) },
    duration: { hours: 1, minutes: 2 },
  },
  {
    summary: "Event - 3",
    uid: "3",
    start: { date: addHours(date, 4) },
    created: { date: addHours(date, 4) },
    stamp: { date: addHours(date, 4) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Frühs",
    uid: "4",
    start: { date: setHours(date, 6) },
    created: { date: setHours(date, 6) },
    stamp: { date: setHours(date, 6) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Start",
    uid: "5",
    start: { date: setHours(date, 1) },
    created: { date: setHours(date, 1) },
    stamp: { date: setHours(date, 1) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Überlappend 8",
    uid: "6",
    start: { date: addMinutes(date, 30) },
    created: { date: addMinutes(date, 30) },
    stamp: { date: addMinutes(date, 30) },
    duration: { hours: 3 },
  },
  {
    summary: "Vorgemerkt",
    uid: "7",
    start: { date: addHours(date, 2) },
    created: { date: addHours(date, 2) },
    stamp: { date: addHours(date, 2) },
    duration: { hours: 1 },
    status: "TENTATIVE",
  },
  {
    summary: "Event - Überlappend Nested 1",
    uid: "8",
    start: { date: addHours(date, 1) },
    created: { date: addHours(date, 1) },
    stamp: { date: addHours(date, 1) },
    duration: { hours: 2 },
  },
  {
    summary: "Event - Überlappend Nested 1-1",
    uid: "9",
    start: { date: addHours(date, 1) },
    created: { date: addHours(date, 1) },
    stamp: { date: addHours(date, 1) },
    duration: { hours: 2 },
  },
  {
    summary: "Event - Überlappend - Später 7",
    uid: "10",
    start: { date: addHours(addMinutes(date, 30), 5) },
    created: { date: addHours(addMinutes(date, 30), 5) },
    stamp: { date: addHours(addMinutes(date, 30), 5) },
    duration: { hours: 2 },
  },
  {
    summary: "Event - Überlappend aber darunter 1",
    uid: "11",
    start: { date: addHours(date, 5) },
    created: { date: addHours(date, 5) },
    stamp: { date: addHours(date, 5) },
    duration: { hours: 1 },
  },
  {
    summary: "Event - Überlappend aber darunter 2",
    uid: "12",
    start: { date: addHours(date, 6) },
    created: { date: addHours(date, 6) },
    stamp: { date: addHours(date, 6) },
    duration: { hours: 1 },
  },
  {
    summary: "Gestern zu Heute",
    uid: "13",
    start: { date: subDays(setHours(date, 23), 1) },
    created: { date: subDays(setHours(date, 23), 1) },
    stamp: { date: subDays(setHours(date, 23), 1) },
    duration: { hours: 2 },
  },
  {
    summary: "Nach Mitternacht",
    uid: "14",
    start: { date: setHours(date, 23) },
    created: { date: setHours(date, 23) },
    stamp: { date: setHours(date, 23) },
    duration: { hours: 3 },
  },
  {
    summary: "7 Tage lang",
    uid: "15",
    start: { date: setHours(date, 23) },
    created: { date: setHours(date, 23) },
    stamp: { date: setHours(date, 23) },
    duration: { days: 7 },
  },
];

const weekWorkHours: ScheduleProps["currentWeekWorkHours"] = {
  TU: [
    { start: "8", end: "12" },
    { start: "13", end: "18" },
  ],
  WE: [
    { start: "8", end: "12" },
    { start: "13:15", end: "18" },
  ],
  TH: [{ start: "8", end: "15" }],
  SU: [{ start: "9", end: "13" }],
};

export const Default: Story = {
  render: function Render({
    calendarProps: argsCalendarProps,
    editEventProps: argsEditEventProps,
    scheduleViewProps: argsScheduleViewProps,
    viewEventProps: argsViewEventProps,
    ...args
  }) {
    const [_events, setEvents] = useState(events);
    const { calendarProps, editEventProps, scheduleViewProps, viewEventProps } =
      useSchedule();

    const displayedWeekDay = weekDays[getDay(calendarProps.viewing)];

    return (
      <Schedule
        calendarProps={argsCalendarProps || calendarProps}
        editEventProps={argsEditEventProps || editEventProps}
        scheduleViewProps={argsScheduleViewProps || scheduleViewProps}
        viewEventProps={argsViewEventProps || viewEventProps}
        showWorkHours
        currentDayWorkHours={weekWorkHours[displayedWeekDay]}
        currentWeekWorkHours={weekWorkHours}
        events={_events}
        onCreate={(event) => {
          setEvents((events) => [...events, event]);
        }}
        onUpdate={(event) => {
          setEvents((events) => [
            ...events.filter((e) => e.uid !== event.uid),
            event,
          ]);
        }}
        onDelete={(event) => {
          setEvents((events) => events.filter((e) => e.uid !== event.uid));
        }}
        {...args}
      />
    );
  },
};

export const Disabled: Story = {
  render: function Render({
    calendarProps: argsCalendarProps,
    editEventProps: argsEditEventProps,
    scheduleViewProps: argsScheduleViewProps,
    viewEventProps: argsViewEventProps,
    ...args
  }) {
    const [_events, setEvents] = useState(events);
    const { calendarProps, editEventProps, scheduleViewProps, viewEventProps } =
      useSchedule();

    return (
      <Schedule
        calendarProps={argsCalendarProps || calendarProps}
        editEventProps={argsEditEventProps || editEventProps}
        scheduleViewProps={argsScheduleViewProps || scheduleViewProps}
        viewEventProps={argsViewEventProps || viewEventProps}
        showWorkHours
        currentDayWorkHours={[
          { start: "8", end: "12" },
          { start: "12:30", end: "18" },
        ]}
        events={_events}
        disabled
        onCreate={(event) => {
          setEvents((events) => [...events, event]);
        }}
        onUpdate={(event) => {
          setEvents((events) => [
            ...events.filter((e) => e.uid !== event.uid),
            event,
          ]);
        }}
        onDelete={(event) => {
          setEvents((events) => events.filter((e) => e.uid !== event.uid));
        }}
        {...args}
      />
    );
  },
};

export const Days: Story = {
  render: function Render({
    calendarProps: argsCalendarProps,
    viewEventProps: argsViewEventProps,
    ...args
  }) {
    const { calendarProps, viewEventProps } = useSchedule();

    return (
      <>
        <ScheduleDayView
          events={events}
          calendarProps={argsCalendarProps || calendarProps}
          viewEventProps={argsViewEventProps || viewEventProps}
          {...args}
        />
        <ViewEvent viewEventProps={viewEventProps} />
      </>
    );
  },
};

export const Weeks: Story = {
  render: function Render({
    calendarProps: argsCalendarProps,
    viewEventProps: argsViewEventProps,
    ...args
  }) {
    const { calendarProps, viewEventProps } = useSchedule();

    return (
      <>
        <ScheduleWeekView
          events={events}
          calendarProps={argsCalendarProps || calendarProps}
          viewEventProps={argsViewEventProps || viewEventProps}
          {...args}
        />
        <ViewEvent viewEventProps={viewEventProps} />
      </>
    );
  },
};

export const Months: Story = {
  render: function Render({
    calendarProps: argsCalendarProps,
    viewEventProps: argsViewEventProps,
    ...args
  }) {
    const { calendarProps, viewEventProps } = useSchedule();

    return (
      <>
        <ScheduleMonthView
          events={events}
          calendarProps={argsCalendarProps || calendarProps}
          viewEventProps={argsViewEventProps || viewEventProps}
          {...args}
        />
        <ViewEvent viewEventProps={viewEventProps} />
      </>
    );
  },
};

export const UrlState: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: function Render({
    scheduleViewProps: argsScheduleViewProps,
    calendarProps: argsCalendarProps,
    viewEventProps: argsViewEventProps,
    editEventProps: argsEditEventProps,
    ...args
  }) {
    const {
      dateRange,
      editEventProps,
      scheduleViewProps,
      calendarProps,
      viewEventProps,
    } = useUrlSchedule();

    useEffect(() => {
      console.log("range");
    }, [dateRange]);

    return (
      <>
        <Schedule
          events={events}
          scheduleViewProps={argsScheduleViewProps || scheduleViewProps}
          editEventProps={argsEditEventProps || editEventProps}
          calendarProps={argsCalendarProps || calendarProps}
          viewEventProps={argsViewEventProps || viewEventProps}
          {...args}
        />
      </>
    );
  },
};

export const DefaultView: Story = {
  render: function Render({
    calendarProps: argsCalendarProps,
    editEventProps: argsEditEventProps,
    scheduleViewProps: argsScheduleViewProps,
    viewEventProps: argsViewEventProps,
    ...args
  }) {
    const { calendarProps, editEventProps, scheduleViewProps, viewEventProps } =
      useSchedule({ initialCurrentView: "month" });

    return (
      <Schedule
        calendarProps={argsCalendarProps || calendarProps}
        editEventProps={argsEditEventProps || editEventProps}
        scheduleViewProps={argsScheduleViewProps || scheduleViewProps}
        viewEventProps={argsViewEventProps || viewEventProps}
        events={events}
        {...args}
      />
    );
  },
};
