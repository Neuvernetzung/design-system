import cn from "classnames";
import type { ReactElement } from "react";
import type { VEvent } from "ts-ics";

import { divides, gaps, paddingsEvenly } from "../../../../styles";
import type { Color } from "../../../../types";
import { Calendar } from "../Dates";
import type { UseCalendarProps } from "../hooks/useCalendar";
import { ScheduleDayView } from "./day";
import {
  type EditEventProps,
  EventEdit,
  type UseEditEventProps,
} from "./Event/edit";
import {
  type UseViewEventProps,
  ViewEvent,
  type ViewEventProps,
} from "./Event/view";
import type { UseScheduleViewProps } from "./hooks/useSchedule";
import { ScheduleMonthView } from "./month";
import { ScheduleWeekView } from "./week";

export * from "./day";
export * from "./Event";
export * from "./hooks";
export * from "./month";
export * from "./week";

export type ScheduleDisplayDaytime = {
  start: number;
  end: number;
};

export type ScheduleProps = {
  calendarProps: UseCalendarProps;
  viewEventProps: UseViewEventProps;
  editEventProps: UseEditEventProps;
  scheduleViewProps: UseScheduleViewProps;
  events?: VEvent[];
  className?: string;
  hideSideCalendar?: boolean;
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
  CustomViewEventComponent?: (props: ViewEventProps) => ReactElement | null;
  CustomEditEventComponent?: (props: EditEventProps) => ReactElement | null;
};

export const Schedule = ({
  calendarProps,
  viewEventProps,
  editEventProps,
  scheduleViewProps,
  events = [],
  className,
  hideSideCalendar,
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
  CustomViewEventComponent,
  CustomEditEventComponent,
}: ScheduleProps) => {
  const { setViewing } = calendarProps;

  const { currentView } = scheduleViewProps;

  const ViewEventComponent = CustomViewEventComponent || ViewEvent;
  const EditEventComponent = CustomEditEventComponent || EventEdit;

  return (
    <>
      <div
        className={cn(
          "flex flex-row lg:divide-x",
          gaps.xs,
          divides.accent,
          className
        )}
      >
        {!hideSideCalendar && (
          <div className="w-64 hidden lg:block">
            <Calendar
              onChange={setViewing}
              calendarProps={calendarProps}
              indicators={events.map((event) => event.start.date)}
            />
          </div>
        )}
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
              scheduleViewProps={scheduleViewProps}
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
              scheduleViewProps={scheduleViewProps}
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
              scheduleViewProps={scheduleViewProps}
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
      <ViewEventComponent
        viewEventProps={viewEventProps}
        editEventProps={editEventProps}
        onDelete={onDelete}
        disableDelete={disabled || disableDelete}
        disableUpdate={disabled || disableUpdate}
      />
      <EditEventComponent
        editEventProps={editEventProps}
        onCreate={onCreate}
        onUpdate={onUpdate}
        disableUpdate={disabled || disableUpdate}
      />
    </>
  );
};
