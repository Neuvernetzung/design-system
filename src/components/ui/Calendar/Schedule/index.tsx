import cn from "classnames";
import { useState } from "react";
import type { VEvent } from "ts-ics";

import { divides, gaps, paddingsEvenly } from "../../../../styles";
import type { Color } from "../../../../types";
import { Calendar } from "../Dates";
import { useCalendar, UseCalendarProps } from "../hooks/useCalendar";
import { ScheduleDayView } from "./day";
import { EventEdit, useEditEvent } from "./Event/edit";
import { useViewEvent, ViewEvent } from "./Event/view";
import { ScheduleMonthView } from "./month";
import { ScheduleWeekView } from "./week";

export * from "./day";
export * from "./month";
export * from "./week";

export const scheduleViews = ["day", "week", "month"] as const;

export type ScheduleView = (typeof scheduleViews)[number];

export type ScheduleDisplayDaytime = {
  start: number;
  end: number;
};

export type ScheduleProps = {
  calendarProps?: UseCalendarProps;
  events?: VEvent[];
  rowsEachHour?: number;
  displayDayTime?: ScheduleDisplayDaytime;
  onCreate?: (event: VEvent) => void;
  onUpdate?: (event: VEvent) => void;
  onDelete?: (event: VEvent) => void;
  eventColor?: Color;
  disabled?: boolean;
  disableDrag?: boolean;
  disableCreate?: boolean;
  disableUpdate?: boolean;
  disableDelete?: boolean;
};

export const Schedule = ({
  calendarProps: _calendarProps,
  events = [],
  rowsEachHour,
  displayDayTime,
  onCreate,
  onUpdate,
  onDelete,
  eventColor,
  disabled,
  disableDrag,
  disableCreate,
  disableUpdate,
  disableDelete,
}: ScheduleProps) => {
  const cal = useCalendar();
  const viewEventProps = useViewEvent();
  const editEventProps = useEditEvent();
  const calendarProps = _calendarProps || cal;
  const { setViewing } = calendarProps;

  const [currentView, setCurrentView] = useState<ScheduleView>("day");

  return (
    <>
      <div className={cn("flex flex-row lg:divide-x", gaps.xs, divides.accent)}>
        <div className="w-64 hidden lg:block">
          <Calendar
            onChange={setViewing}
            calendarProps={calendarProps}
            indicators={events.map((event) => event.start.date)}
          />
        </div>
        <div
          className={cn(
            "flex flex-col w-full max-h-[80vh]",
            gaps.md,
            paddingsEvenly.md
          )}
        >
          {currentView === "day" && (
            <ScheduleDayView
              events={events}
              currentView={currentView}
              setCurrentView={setCurrentView}
              calendarProps={calendarProps}
              rowsEachHour={rowsEachHour}
              displayDayTime={displayDayTime}
              viewEventProps={viewEventProps}
              editEventProps={editEventProps}
              eventColor={eventColor}
              onUpdate={onUpdate}
              onCreate={onCreate}
              disabled={disabled}
              disableDrag={disableDrag || disableUpdate}
              disableCreate={disableCreate}
            />
          )}
          {currentView === "week" && (
            <ScheduleWeekView
              events={events}
              currentView={currentView}
              setCurrentView={setCurrentView}
              calendarProps={calendarProps}
              rowsEachHour={rowsEachHour}
              displayDayTime={displayDayTime}
              viewEventProps={viewEventProps}
              editEventProps={editEventProps}
              eventColor={eventColor}
              onUpdate={onUpdate}
              onCreate={onCreate}
              disabled={disabled}
              disableDrag={disableDrag || disableUpdate}
              disableCreate={disableCreate}
            />
          )}
          {currentView === "month" && (
            <ScheduleMonthView
              events={events}
              currentView={currentView}
              setCurrentView={setCurrentView}
              calendarProps={calendarProps}
              viewEventProps={viewEventProps}
              editEventProps={editEventProps}
              eventColor={eventColor}
              onUpdate={onUpdate}
              onCreate={onCreate}
              disabled={disabled}
              disableDrag={disableDrag || disableUpdate}
              disableCreate={disableCreate}
            />
          )}
        </div>
      </div>
      <ViewEvent
        viewEventProps={viewEventProps}
        editEventProps={editEventProps}
        onDelete={onDelete}
        disableDelete={disabled || disableDelete}
        disableUpdate={disabled || disableUpdate}
      />
      <EventEdit
        editEventProps={editEventProps}
        onCreate={onCreate}
        onUpdate={onUpdate}
        disableUpdate={disabled || disableUpdate}
      />
    </>
  );
};
