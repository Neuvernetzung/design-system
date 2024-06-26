import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { ScheduleHeaderBase } from "./base";
import { formatScheduleTitle, titleFormatter } from "../utils/formatTitle";
import isFunction from "lodash/isFunction";
import type { ScheduleProps, UseScheduleViewProps } from "..";

export type ScheduleHeaderProps = Pick<
  ScheduleProps,
  "calendarProps" | "disableCreate" | "onCreate" | "disabled"
> &
  Partial<Pick<ScheduleProps, "scheduleViewProps" | "editEventProps">> &
  Pick<UseScheduleViewProps, "currentView">;

export const ScheduleHeader = ({
  currentView,
  scheduleViewProps,
  calendarProps,
  editEventProps,
  disableCreate,
  onCreate,
  disabled,
}: ScheduleHeaderProps) => {
  const { setViewing, viewing } = calendarProps;

  return (
    <>
      {currentView === "day" && (
        <ScheduleHeaderBase
          scheduleViewProps={scheduleViewProps}
          calendarProps={calendarProps}
          leftAriaLabel="Vorheriger Tag"
          leftArrowFunction={() => setViewing(subDays(viewing, 1))}
          rightAriaLabel="Nächster Tag"
          rightArrowFunction={() => setViewing(addDays(viewing, 1))}
          title={titleFormatter.format(viewing)}
          editEventProps={editEventProps}
          disableCreate={disabled || !isFunction(onCreate) || disableCreate}
        />
      )}
      {currentView === "week" && (
        <ScheduleHeaderBase
          scheduleViewProps={scheduleViewProps}
          calendarProps={calendarProps}
          leftAriaLabel="Vorherhige Woche"
          leftArrowFunction={() => setViewing(subWeeks(viewing, 1))}
          rightAriaLabel="Nächste Woche"
          rightArrowFunction={() => setViewing(addWeeks(viewing, 1))}
          title={formatScheduleTitle(
            startOfWeek(viewing, { weekStartsOn: 1 }),
            endOfWeek(viewing, { weekStartsOn: 1 })
          )}
          editEventProps={editEventProps}
          disableCreate={disabled || !isFunction(onCreate) || disableCreate}
        />
      )}
      {currentView === "month" && (
        <ScheduleHeaderBase
          scheduleViewProps={scheduleViewProps}
          calendarProps={calendarProps}
          leftAriaLabel="Vorheriger Monat"
          leftArrowFunction={() => setViewing(subMonths(viewing, 1))}
          rightAriaLabel="Nächster Monat"
          rightArrowFunction={() => setViewing(addMonths(viewing, 1))}
          title={formatScheduleTitle(
            startOfMonth(viewing),
            endOfMonth(viewing)
          )}
          editEventProps={editEventProps}
          disableCreate={disabled || !isFunction(onCreate) || disableCreate}
        />
      )}
    </>
  );
};
