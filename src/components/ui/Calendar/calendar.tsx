import { useState } from "react";

import { ButtonVariant, ExtendedColor } from "../../../types";
import type { ButtonProps } from "../Button";
import { CalendarSelectPropsUnion } from "./utils/select";
import { CalendarDateDayView } from "./views/day";
import { CalendarDateMonthView } from "./views/month";
import { CalendarDateYearView } from "./views/year";
import { useCalendar, type UseCalendarProps } from "./hooks/useCalendar";

export type CalendarProps = {
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
  colsClassName?: string;
  gridClassName?: string;
  shortcuts?: CalendarShortcutProps[];
} & Partial<CalendarSelectPropsUnion>;

export type CalendarShortcutProps = ({
  setViewing,
  viewing,
  select,
}: {
  setViewing: (date: Date) => void;
  viewing: Date;
  select: (date: Date) => void;
}) => {
  buttonProps?: ButtonProps;
};

export const calendarViews = ["dates", "months", "years"] as const;

export type CalendarViews = (typeof calendarViews)[number];

export const Calendar = ({
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
  colsClassName,
  gridClassName,
  shortcuts,
  onChange,
  selectType = "single",
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
          colsClassName={colsClassName}
          gridClassName={gridClassName}
          shortcuts={shortcuts}
          selectType={selectType}
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
        />
      )}
    </>
  );
};
