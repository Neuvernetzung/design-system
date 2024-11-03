import { IconArrowBack } from "@tabler/icons-react";
import { cn } from "@/utils";
import {
  addDays,
  addMonths,
  getDate,
  isAfter,
  isBefore,
  isSameMonth,
  isThisMonth,
  isToday,
  isValid,
  lastDayOfMonth,
  setDate,
  subDays,
} from "date-fns";
import type { KeyboardEvent, WheelEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { ARROW_KEYS } from "../../../../constants";
import { gaps, transitionFast } from "../../../../styles";
import { Button, ButtonGroup } from "../../Button";
import { Indicator } from "../../Indicator";
import { Text } from "../../Typography/Text";
import type { CalendarProps } from "../calendar";
import { CalendarHeader } from "../header";
import { isBetweenRange, isRangeEnd, isRangeStart } from "../utils";
import { calendarSelect } from "../utils/select";
import { clearTime } from "@/utils/date";

export type CalenderDateDayViewProps = Omit<CalendarProps, "calendarProps"> &
  Required<Pick<CalendarProps, "calendarProps">> & {
    headerTitleFunction?: () => void;
  };

export const CalendarDateDayView = ({
  onChange,
  minDate,
  maxDate,
  headerTitleFunction,
  calendarProps,
  dayHasIndicator,
  dayIsDisabled,
  activeButtonColor,
  availableButtonColor,
  activeButtonVariant,
  availableButtonVariant,
  buttonClassName,
  colsClassName,
  gridClassName,
  shortcuts,
  selectType = "single",
  enableScroll = false,
}: CalenderDateDayViewProps) => {
  const {
    selected,
    viewing,
    viewToday,
    setViewing,
    viewPreviousMonth,
    viewNextMonth,
    calendar,
    isSelected,
  } = calendarProps;

  const [preselectedDate, setPreselectedDate] = useState<Date>(new Date());

  const daysRef = useRef<HTMLDivElement>(null);
  const outsideDaysRef = useRef<HTMLDivElement>(null);

  const focusFromOutsideDates = (e: KeyboardEvent, viewingMonth?: Date) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    const activeElement = document.activeElement;

    // Wenn bereits im Kontainer, dann nichts tun und auch nicht wenn zu weit außerhalb
    if (daysRef.current?.contains(activeElement)) return;
    if (!outsideDaysRef.current?.contains(activeElement)) return;

    if (
      selected.length > 0 &&
      isSameMonth(selected[0], viewingMonth || viewing)
    )
      return setPreselectedDate(selected[0]);

    if (isSameMonth(new Date(), viewingMonth || viewing))
      return setPreselectedDate(new Date());

    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      return setPreselectedDate(setDate(viewingMonth || viewing, 1));

    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      return setPreselectedDate(lastDayOfMonth(viewingMonth || viewing));
  };

  const arrowKeyNavigationDates = (e: KeyboardEvent, viewingMonth: Date) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    if (e.key === "ArrowLeft") {
      const toSelect = subDays(preselectedDate, 1);
      if (!isSameMonth(toSelect, viewingMonth)) viewPreviousMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowRight") {
      const toSelect = addDays(preselectedDate, 1);
      if (!isSameMonth(toSelect, viewingMonth)) viewNextMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowUp") {
      const toSelect = subDays(preselectedDate, 7);
      if (!isSameMonth(toSelect, viewingMonth)) viewPreviousMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowDown") {
      const toSelect = addDays(preselectedDate, 7);
      if (!isSameMonth(toSelect, viewingMonth)) viewNextMonth();
      setPreselectedDate(toSelect);
    }
  };

  const titleFormatter = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  });

  const dayFormatter = new Intl.DateTimeFormat(undefined, { day: "2-digit" });

  const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
  });

  const dataIdFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });

  useEffect(() => {
    if (isValid(preselectedDate)) {
      const toFocus = document.querySelectorAll(
        `[data-id="${dataIdFormatter.format(preselectedDate)}"]`
      )[0] as HTMLButtonElement | null;
      toFocus?.focus();
    }
  }, [preselectedDate]);

  return (
    <div ref={outsideDaysRef} className={cn("flex flex-col", gaps.sm)}>
      <ButtonGroup>
        {shortcuts
          ? shortcuts.map((shortcut, i) => (
              <Button
                onKeyDown={focusFromOutsideDates}
                key={`shortcut_${i}`}
                {...shortcut({
                  setViewing,
                  viewing,
                  select: (date) => {
                    calendarSelect({
                      day: date,
                      selectType,
                      calendarProps,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange: onChange as any,
                    });
                  },
                }).buttonProps}
              />
            ))
          : !isThisMonth(viewing) && (
              <Button
                onKeyDown={focusFromOutsideDates}
                onClick={viewToday}
                size="sm"
                variant="outline"
                leftIcon={IconArrowBack}
              >
                Zurück zum aktuellen Monat
              </Button>
            )}
      </ButtonGroup>

      <div className={cn("flex flex-row w-full", gaps.xl, colsClassName)}>
        {new Array(calendar.length).fill(null).map((_, i) => {
          const viewingMonth = addMonths(viewing, i);

          return (
            <div
              className={cn("w-full flex flex-col", gaps.xs)}
              key={`calendar_month_${i}`}
            >
              <CalendarHeader
                leftArrowFunction={i === 0 ? viewPreviousMonth : undefined}
                leftAriaLabel="Previous Month"
                leftArrowDisabled={
                  minDate && isBefore(setDate(viewing, 1), minDate)
                }
                rightArrowFunction={
                  i === calendar.length - 1 ? viewNextMonth : undefined
                }
                rightAriaLabel="Next Month"
                rightArrowDisabled={
                  maxDate && isAfter(lastDayOfMonth(viewing), maxDate)
                }
                titleFunction={headerTitleFunction}
                title={titleFormatter.format(viewingMonth)}
                onKeyDown={(e) => focusFromOutsideDates(e, viewingMonth)}
              />
              <div className="grid grid-cols-7 text-center">
                {calendar[i][0].map((day) => (
                  <Text size="xs" key={`${day}`}>
                    {weekdayFormatter.format(day)}
                  </Text>
                ))}
              </div>

              <div
                ref={daysRef}
                className={cn("grid grid-cols-7", gridClassName)}
                onWheel={(e: WheelEvent) => {
                  if (!enableScroll) return;
                  if (e.deltaY > 0) {
                    viewNextMonth();
                  } else {
                    viewPreviousMonth();
                  }
                }}
              >
                {calendar[i].map((week) =>
                  week.map((day) => (
                    <Button
                      size="sm"
                      onKeyDown={(e: KeyboardEvent) =>
                        arrowKeyNavigationDates(e, viewingMonth)
                      }
                      tabIndex={
                        isSelected(day)
                          ? 0
                          : (selected.length === 0 ||
                              !isSameMonth(selected[0], viewingMonth)) &&
                            isToday(day)
                          ? 0
                          : !isSameMonth(selected[0], viewingMonth) &&
                            !isSameMonth(new Date(), viewingMonth) &&
                            isSameMonth(day, viewingMonth) &&
                            getDate(day) === 1
                          ? 0
                          : -1
                      }
                      variant={
                        isSelected(day)
                          ? activeButtonVariant || "filled"
                          : availableButtonVariant || "ghost"
                      }
                      color={
                        isSelected(day)
                          ? activeButtonColor || "primary"
                          : availableButtonColor || "accent"
                      }
                      className={cn(
                        "relative",
                        !isSameMonth(day, viewingMonth) && "opacity-50",
                        selectType === "range" &&
                          cn([
                            isBetweenRange(day, selected, isSelected) &&
                              "rounded-none bg-opacity-70",
                            isRangeStart(day, selected, isSelected) &&
                              "rounded-r-none",
                            isRangeEnd(day, selected, isSelected) &&
                              "rounded-l-none",
                          ]),

                        transitionFast,
                        buttonClassName
                      )}
                      data-id={dataIdFormatter.format(day)}
                      data-in-range={isSameMonth(day, viewingMonth)}
                      data-selected={isSelected(day)}
                      data-today={isToday(day)}
                      key={`${day}`}
                      onClick={() => {
                        calendarSelect({
                          day,
                          selectType,
                          calendarProps,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onChange: onChange as any,
                        });
                      }}
                      disabled={
                        (minDate && isBefore(day, clearTime(minDate))) ||
                        (maxDate && isAfter(day, clearTime(maxDate))) ||
                        dayIsDisabled?.(day)
                      }
                    >
                      {dayFormatter.format(day)}
                      {dayHasIndicator?.(day) && (
                        <Indicator
                          size="sm"
                          wrapperClassName="!absolute bottom-1"
                        />
                      )}
                    </Button>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
