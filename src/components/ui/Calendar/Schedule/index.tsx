import cn from "classnames";
import { useState } from "react";
import type { VEvent } from "ts-ics";

import { divides, gaps, paddingsEvenly } from "../../../../styles";
import { Calendar } from "../Dates";
import { useCalendar, UseCalendarProps } from "../hooks/useCalendar";
import { ScheduleDayView } from "./day";
import { ScheduleMonthView } from "./month";
import { ScheduleWeekView } from "./week";

export * from "./day";

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
};

export const Schedule = ({
  calendarProps: _calendarProps,
  events = [],
  rowsEachHour,
  displayDayTime,
}: ScheduleProps) => {
  const cal = useCalendar();
  const calendarProps = _calendarProps || cal;
  const { setViewing } = calendarProps;

  const [currentView, setCurrentView] = useState<ScheduleView>("day");

  return (
    <div className={cn("flex flex-row lg:divide-x", gaps.xs, divides.accent)}>
      <div className="w-64 hidden lg:block">
        <Calendar onChange={setViewing} calendarProps={calendarProps} />
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
          />
        )}
        {currentView === "month" && (
          <ScheduleMonthView
            events={events}
            currentView={currentView}
            setCurrentView={setCurrentView}
            calendarProps={calendarProps}
          />
        )}
      </div>
    </div>
  );
};
