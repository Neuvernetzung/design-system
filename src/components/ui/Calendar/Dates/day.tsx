import { IconArrowBack } from "@tabler/icons-react";
import cn from "classnames";
import {
  addDays,
  endOfMonth,
  getDate,
  isAfter,
  isBefore,
  isThisMonth,
  isToday,
  isValid,
  lastDayOfMonth,
  setDate,
  startOfMonth,
  subDays,
} from "date-fns";
import type { KeyboardEvent, WheelEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { ARROW_KEYS } from "../../../../constants";
import { gaps, transitionFast } from "../../../../styles";
import { Button, ButtonGroup } from "../../Button";
import { Text } from "../../Typography/Text";
import type { CalendarProps } from ".";
import { CalendarHeader } from "./header";
import { Indicator } from "../../Indicator";

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
  indicators,
}: CalenderDateDayViewProps) => {
  const {
    inRange,
    selected,
    select,
    viewing,
    clearTime,
    viewToday,
    viewPreviousMonth,
    viewNextMonth,
    toggle,
    calendar,
    isSelected,
  } = calendarProps;

  const [preselectedDate, setPreselectedDate] = useState<Date>(new Date());

  const daysRef = useRef<HTMLDivElement>(null);
  const outsideDaysRef = useRef<HTMLDivElement>(null);

  const focusFromOutsideDates = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    const activeElement = document.activeElement;

    // Wenn bereits im Kontainer, dann nichts tun und auch nicht wenn zu weit außerhalb
    if (daysRef.current?.contains(activeElement)) return;
    if (!outsideDaysRef.current?.contains(activeElement)) return;

    if (
      selected.length > 0 &&
      inRange(selected[0], startOfMonth(viewing), endOfMonth(viewing))
    )
      return setPreselectedDate(selected[0]);

    if (inRange(new Date(), startOfMonth(viewing), endOfMonth(viewing)))
      return setPreselectedDate(new Date());

    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      return setPreselectedDate(setDate(viewing, 1));

    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      return setPreselectedDate(lastDayOfMonth(viewing));
  };

  const arrowKeyNavigationDates = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    if (e.key === "ArrowLeft") {
      const toSelect = subDays(preselectedDate, 1);
      if (!inRange(toSelect, startOfMonth(viewing), endOfMonth(viewing)))
        viewPreviousMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowRight") {
      const toSelect = addDays(preselectedDate, 1);
      if (!inRange(toSelect, startOfMonth(viewing), endOfMonth(viewing)))
        viewNextMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowUp") {
      const toSelect = subDays(preselectedDate, 7);
      if (!inRange(toSelect, startOfMonth(viewing), endOfMonth(viewing)))
        viewPreviousMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowDown") {
      const toSelect = addDays(preselectedDate, 7);
      if (!inRange(toSelect, startOfMonth(viewing), endOfMonth(viewing)))
        viewNextMonth();
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
        <Button
          onKeyDown={focusFromOutsideDates}
          variant="ghost"
          onClick={() => {
            select(clearTime(new Date()), true);
            onChange?.(new Date());
            viewToday();
          }}
          size="sm"
          disabled={
            (minDate && isBefore(new Date(), minDate)) ||
            (maxDate && isAfter(new Date(), maxDate))
          }
        >
          Heute
        </Button>
      </ButtonGroup>
      <CalendarHeader
        leftArrowFunction={viewPreviousMonth}
        leftAriaLabel="Previous Month"
        leftArrowDisabled={minDate && isBefore(setDate(viewing, 1), minDate)}
        rightArrowFunction={viewNextMonth}
        rightAriaLabel="Next Month"
        rightArrowDisabled={
          maxDate && isAfter(lastDayOfMonth(viewing), maxDate)
        }
        titleFunction={headerTitleFunction}
        title={titleFormatter.format(viewing)}
        onKeyDown={focusFromOutsideDates}
      />

      <div>
        <div className="grid grid-cols-7 text-center">
          {calendar[0][0].map((day) => (
            <Text size="xs" key={`${day}`}>
              {weekdayFormatter.format(day)}
            </Text>
          ))}
        </div>

        <div
          ref={daysRef}
          className="grid grid-cols-7"
          onWheel={(e: WheelEvent) => {
            if (e.deltaY > 0) {
              viewNextMonth();
            } else {
              viewPreviousMonth();
            }
          }}
        >
          {calendar[0].map((week) =>
            week.map((day) => (
              <Button
                size="sm"
                onKeyDown={arrowKeyNavigationDates}
                tabIndex={
                  isSelected(day)
                    ? 0
                    : (selected.length === 0 ||
                        !inRange(
                          selected[0],
                          startOfMonth(viewing),
                          endOfMonth(viewing)
                        )) &&
                      isToday(day)
                    ? 0
                    : !inRange(
                        selected[0],
                        startOfMonth(viewing),
                        endOfMonth(viewing)
                      ) &&
                      !inRange(
                        new Date(),
                        startOfMonth(viewing),
                        endOfMonth(viewing)
                      ) &&
                      inRange(
                        day,
                        startOfMonth(viewing),
                        endOfMonth(viewing)
                      ) &&
                      getDate(day) === 1
                    ? 0
                    : -1
                }
                variant={!isSelected(day) ? "ghost" : "filled"}
                color={!isSelected(day) ? "accent" : "primary"}
                className={cn(
                  "relative",
                  !inRange(day, startOfMonth(viewing), endOfMonth(viewing)) &&
                    "opacity-50",
                  transitionFast
                )}
                data-id={dataIdFormatter.format(day)}
                data-in-range={inRange(
                  day,
                  startOfMonth(viewing),
                  endOfMonth(viewing)
                )}
                data-selected={isSelected(day)}
                data-today={isToday(day)}
                key={`${day}`}
                onClick={() => {
                  toggle(day, true);
                  onChange?.(day);
                }}
                disabled={
                  (minDate && isBefore(day, clearTime(minDate))) ||
                  (maxDate && isAfter(day, clearTime(maxDate)))
                }
              >
                {indicators?.find(
                  (date) =>
                    dataIdFormatter.format(date) === dataIdFormatter.format(day)
                ) ? (
                  <>
                    {dayFormatter.format(day)}
                    <Indicator
                      size="sm"
                      wrapperClassName="!absolute bottom-1"
                    />
                  </>
                ) : (
                  dayFormatter.format(day)
                )}
              </Button>
            ))
          )}
        </div>
      </div>
      <ButtonGroup>
        {!isThisMonth(viewing) && (
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
    </div>
  );
};
