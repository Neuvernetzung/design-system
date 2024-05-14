import type { ReactElement } from "react";
import { type VEvent, type WeekDay } from "ts-ics";

import type { Color } from "../../../types";
import type { UseCalendarProps } from "../Calendar/hooks/useCalendar";
import { ScheduleWorkHours } from "./DayGrid";
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
import { ScheduleViews } from "./View";
import { ScheduleHeader } from "./Header";
import { ScheduleWrapper } from "./Wrapper";

export * from "./DayGrid";
export * from "./View";
export * from "./Header";
export * from "./Event";
export * from "./hooks";

export type ScheduleProps = {
  calendarProps: UseCalendarProps;
  viewEventProps: UseViewEventProps;
  editEventProps: UseEditEventProps;
  scheduleViewProps: UseScheduleViewProps;
  events?: VEvent[];
  className?: string;
  hideSideCalendar?: boolean;
  rowsEachHour?: number;
  showWorkHours?: boolean;
  currentDayWorkHours?: ScheduleWorkHours;
  currentWeekWorkHours?: Partial<Record<WeekDay, ScheduleWorkHours>>;
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
  showWorkHours,
  currentDayWorkHours,
  currentWeekWorkHours,
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
  const ViewEventComponent = CustomViewEventComponent || ViewEvent;
  const EditEventComponent = CustomEditEventComponent || EventEdit;

  return (
    <>
      <ScheduleWrapper
        calendarProps={calendarProps}
        className={className}
        events={events}
        hideSideCalendar={hideSideCalendar}
      >
        <ScheduleHeader
          calendarProps={calendarProps}
          disableCreate={disableCreate}
          disabled={disabled}
          editEventProps={editEventProps}
          onCreate={onCreate}
          scheduleViewProps={scheduleViewProps}
        />
        <ScheduleViews
          events={events}
          scheduleViewProps={scheduleViewProps}
          calendarProps={calendarProps}
          rowsEachHour={rowsEachHour}
          showWorkHours={showWorkHours}
          currentDayWorkHours={currentDayWorkHours}
          viewEventProps={viewEventProps}
          editEventProps={editEventProps}
          eventColor={eventColor}
          onUpdate={onUpdate}
          onCreate={onCreate}
          disabled={disabled}
          disableDrag={disableDrag || disableUpdate}
          disableCreate={disableCreate}
          currentWeekWorkHours={currentWeekWorkHours}
          disableUpdate={disableUpdate}
        />
      </ScheduleWrapper>
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
