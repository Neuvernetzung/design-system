import { useState } from "react";

import { useCalendar, type UseCalendarProps } from "../hooks/useCalendar";
import { CalendarDateDayView } from "./day";
import { CalendarDateMonthView } from "./month";
import { CalendarDateYearView } from "./year";

export * from "./day";
export * from "./header";
export * from "./month";
export * from "./year";

export type CalendarProps = {
  onChange?: (value: Date) => void;
  calendarProps?: UseCalendarProps;
  minDate?: Date;
  maxDate?: Date;
  indicators?: Date[];
};

export const calendarViews = ["dates", "months", "years"] as const;

export type CalendarViews = (typeof calendarViews)[number];

export const Calendar = ({
  onChange,
  minDate,
  maxDate,
  calendarProps: _calendarProps,
  indicators,
}: CalendarProps) => {
  const cal = useCalendar();
  const calendarProps = _calendarProps || cal;

  const { setViewing } = calendarProps;

  const [currentView, setCurrentView] = useState<CalendarViews>("dates");

  return (
    <>
      {currentView === "dates" && (
        <CalendarDateDayView
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          headerTitleFunction={() => setCurrentView("months")}
          calendarProps={calendarProps}
          indicators={indicators}
        />
      )}
      {currentView === "months" && (
        <CalendarDateMonthView
          onMonthClick={(date) => {
            setViewing(date);
            setCurrentView("dates");
          }}
          minDate={minDate}
          maxDate={maxDate}
          headerTitleFunction={() => setCurrentView("years")}
          calendarProps={calendarProps}
          indicators={indicators}
        />
      )}
      {currentView === "years" && (
        <CalendarDateYearView
          onYearClick={(year) => {
            setViewing(year);
            setCurrentView("months");
          }}
          minDate={minDate}
          maxDate={maxDate}
          calendarProps={calendarProps}
          indicators={indicators}
        />
      )}
    </>
  );
};
