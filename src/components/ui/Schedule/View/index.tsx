import { ScheduleProps } from "..";
import { ScheduleDayView } from "./day";
import { ScheduleMonthView } from "./month";
import { ScheduleWeekView } from "./week";

export type ScheduleViewsProps = Pick<
  ScheduleProps,
  | "events"
  | "scheduleViewProps"
  | "calendarProps"
  | "rowsEachHour"
  | "showWorkHours"
  | "currentDayWorkHours"
  | "currentWeekWorkHours"
  | "viewEventProps"
  | "editEventProps"
  | "eventColor"
  | "onUpdate"
  | "onCreate"
  | "disabled"
  | "disableCreate"
  | "disableUpdate"
  | "disableDrag"
>;

export const ScheduleViews = ({
  events,
  scheduleViewProps,
  calendarProps,
  rowsEachHour,
  showWorkHours,
  currentDayWorkHours,
  currentWeekWorkHours,
  viewEventProps,
  editEventProps,
  eventColor,
  onUpdate,
  onCreate,
  disabled,
  disableCreate,
  disableUpdate,
  disableDrag,
}: ScheduleViewsProps) => {
  const { currentView } = scheduleViewProps;

  return (
    <>
      {currentView === "day" && (
        <ScheduleDayView
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
        />
      )}
      {currentView === "week" && (
        <ScheduleWeekView
          events={events}
          scheduleViewProps={scheduleViewProps}
          calendarProps={calendarProps}
          rowsEachHour={rowsEachHour}
          showWorkHours={showWorkHours}
          currentDayWorkHours={currentDayWorkHours}
          currentWeekWorkHours={currentWeekWorkHours}
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
          disabled={disabled}
          disableDrag={disableDrag || disableUpdate}
          disableCreate={disableCreate}
        />
      )}
    </>
  );
};
