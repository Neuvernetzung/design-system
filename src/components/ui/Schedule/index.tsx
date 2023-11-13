import { cn } from "@/utils";
import { isSameMonth, isSameYear } from "date-fns";
import type { ReactElement } from "react";
import { getEventEnd, type VEvent } from "ts-ics";

import { divides, gaps, paddingsEvenly } from "../../../styles";
import type { Color } from "../../../types";
import { Calendar } from "../Calendar";
import type { UseCalendarProps } from "../Calendar/hooks/useCalendar";
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
import { isThisDaysEvent } from "./utils/filterEvents";
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
  onUpdate?: (event: VEvent, oldEvent: VEvent) => void;
  onDelete?: (event: VEvent) => void;
  onConfirmEventStatus?: (event: VEvent) => void;
  onCancelEventStatus?: (event: VEvent) => void;
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
  onConfirmEventStatus,
  onCancelEventStatus,
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
              dayHasIndicator={(day) =>
                events.some((e) =>
                  isThisDaysEvent(e.start.date, getEventEnd(e), day)
                )
              }
              monthHasIndicator={(month) =>
                events.some((e) => isSameMonth(e.start.date, month))
              }
              yearHasIndicator={(year) =>
                events.some((e) => isSameYear(e.start.date, year))
              }
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
        onUpdate={onUpdate}
        onConfirmEventStatus={onConfirmEventStatus}
        onCancelEventStatus={onCancelEventStatus}
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
