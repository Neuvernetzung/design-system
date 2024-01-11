import {
  addDays,
  endOfDay,
  endOfWeek,
  setHours,
  setMinutes,
  setSeconds,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";

import {
  useCalendar,
  useUrlCalendar,
  type UseCalendarOwnProps,
  type UseCalendarProps,
} from "../../Calendar/hooks";
import { useEditEvent } from "../Event/edit";
import { useViewEvent } from "../Event/view";
import { useUrlState, parseQueryAsStringConst } from "@/hooks";

export type UseSchedule = typeof useSchedule;
export type UseScheduleProps = ReturnType<UseSchedule>;

export type UseScheduleViewProps = {
  currentView: ScheduleView;
  setCurrentView: (currentView: ScheduleView) => void;
};

export const scheduleViews = ["day", "week", "month"] as const;

export type ScheduleView = (typeof scheduleViews)[number];

export type UseDateProps = { start?: Date; end?: Date };

export const useDateRange = (
  currentView: ScheduleView,
  viewing: Date,
  calendar: UseCalendarProps["calendar"]
): UseDateProps =>
  useMemo((): UseDateProps => {
    const date = setHours(setMinutes(setSeconds(viewing, 0), 0), 0);

    if (currentView === "day") {
      return { start: date, end: addDays(date, 1) };
    }
    if (currentView === "week") {
      return {
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
    }
    if (currentView === "month") {
      const lastRow = (calendar[0]?.length || 0) - 1;
      const lastDate = (calendar[0][lastRow]?.length || 0) - 1;

      const start = calendar[0][0][0];
      const end = calendar[0][lastRow][lastDate];

      if (!start || !end) return { start: undefined, end: undefined };

      return {
        start,
        end: endOfDay(end),
      };
    }

    return { start: undefined, end: undefined };
  }, [viewing, currentView]);

export const useScheduleBase = () => {
  const viewEventProps = useViewEvent();
  const editEventProps = useEditEvent();

  return {
    viewEventProps,
    editEventProps,
  };
};

export const useSchedule = (props?: UseCalendarOwnProps) => {
  const calendarProps = useCalendar(props);
  const scheduleBaseProps = useScheduleBase();

  const [currentView, setCurrentView] = useState<ScheduleView>("day");

  const scheduleViewProps: UseScheduleViewProps = {
    currentView,
    setCurrentView,
  };

  const dateRange = useDateRange(
    currentView,
    calendarProps.viewing,
    calendarProps.calendar
  );

  return { ...scheduleBaseProps, calendarProps, scheduleViewProps, dateRange };
};

export const useUrlSchedule = (props?: UseCalendarOwnProps) => {
  const calendarProps = useUrlCalendar(props);
  const scheduleBaseProps = useScheduleBase();

  const [currentView, setCurrentView] = useUrlState<ScheduleView>("view", {
    ...parseQueryAsStringConst(scheduleViews),
    history: "replace",
    defaultValue: "day",
  });

  const scheduleViewProps: UseScheduleViewProps = {
    currentView,
    setCurrentView,
  };

  const dateRange = useDateRange(
    currentView,
    calendarProps.viewing,
    calendarProps.calendar
  );

  return { ...scheduleBaseProps, calendarProps, scheduleViewProps, dateRange };
};
