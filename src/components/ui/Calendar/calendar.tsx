import { useState } from "react";

import { ButtonVariant, ExtendedColor } from "../../../types";
import { useCalendar, type UseCalendarProps } from "./hooks/useCalendar";
import { CalendarDateDayView } from "./Dates/day";
import { CalendarDateMonthView } from "./Dates/month";
import { CalendarDateYearView } from "./Dates/year";

export type CalendarProps = {
  onChange?: (value: Date) => void;
  calendarProps?: UseCalendarProps;
  minDate?: Date;
  maxDate?: Date;
  dayHasIndicator?: (date: Date) => boolean;
  monthHasIndicator?: (date: Date) => boolean;
  yearHasIndicator?: (date: Date) => boolean;
  dayIsDisabled?: (date: Date) => boolean;
  monthIsDisabled?: (date: Date) => boolean;
  yearIsDisabled?: (date: Date) => boolean;
  activeButtonColor?: ExtendedColor;
  availableButtonColor?: ExtendedColor;
  activeButtonVariant?: ButtonVariant;
  availableButtonVariant?: ButtonVariant;
  buttonClassName?: string;
  gridClassName?: string;
  cols?: number;
};

export const calendarViews = ["dates", "months", "years"] as const;

export type CalendarViews = (typeof calendarViews)[number];

export const Calendar = ({
  onChange,
  minDate,
  maxDate,
  calendarProps: _calendarProps,
  dayHasIndicator,
  monthHasIndicator,
  yearHasIndicator,
  dayIsDisabled,
  monthIsDisabled,
  yearIsDisabled,
  activeButtonColor,
  availableButtonColor,
  activeButtonVariant,
  availableButtonVariant,
  buttonClassName,
  gridClassName,
  cols = 1,
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
          dayHasIndicator={dayHasIndicator}
          dayIsDisabled={dayIsDisabled}
          activeButtonColor={activeButtonColor}
          availableButtonColor={availableButtonColor}
          activeButtonVariant={activeButtonVariant}
          availableButtonVariant={availableButtonVariant}
          buttonClassName={buttonClassName}
          gridClassName={gridClassName}
          cols={cols}
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
          monthHasIndicator={monthHasIndicator}
          monthIsDisabled={monthIsDisabled}
          activeButtonColor={activeButtonColor}
          availableButtonColor={availableButtonColor}
          activeButtonVariant={activeButtonVariant}
          availableButtonVariant={availableButtonVariant}
          buttonClassName={buttonClassName}
          gridClassName={gridClassName}
          cols={cols}
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
          yearHasIndicator={yearHasIndicator}
          yearIsDisabled={yearIsDisabled}
          activeButtonColor={activeButtonColor}
          availableButtonColor={availableButtonColor}
          activeButtonVariant={activeButtonVariant}
          availableButtonVariant={availableButtonVariant}
          buttonClassName={buttonClassName}
          gridClassName={gridClassName}
          cols={cols}
        />
      )}
    </>
  );
};
