import cn from "classnames";
import {
  addMonths,
  addYears,
  endOfYear,
  isAfter,
  isBefore,
  isSameMonth,
  isSameYear,
  isValid,
  lastDayOfMonth,
  setDate,
  setMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

import { ARROW_KEYS } from "../../../../constants";
import { gaps } from "../../../../styles";
import { Button } from "../../Button";
import { useCalendar } from "../hooks/useCalendar";
import type { CalendarProps } from ".";
import { CalendarHeader } from "./header";

export type CalenderDateMonthViewProps = Omit<CalendarProps, "onClick"> & {
  onMonthClick?: (value: Date) => void;
  headerTitleFunction?: () => void;
};

export const CalendarDateMonthView = ({
  onMonthClick,
  minDate,
  maxDate,
  headerTitleFunction,
  calendarProps: _calendarProps,
}: CalenderDateMonthViewProps) => {
  const cal = useCalendar();
  const calendarProps = _calendarProps || cal;

  const { selected, viewing, clearTime, setViewing, inRange } = calendarProps;

  const [preselectedMonth, setPreselectedMonth] = useState<Date>(new Date());

  const monthsRef = useRef<HTMLDivElement>(null);
  const outsideMonthsRef = useRef<HTMLDivElement>(null);

  const arrowKeyNavigationMonths = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    if (e.key === "ArrowLeft") {
      const toSelect = subMonths(preselectedMonth, 1);
      if (!inRange(toSelect, startOfYear(viewing), endOfYear(viewing)))
        setViewing(subYears(viewing, 1));
      setPreselectedMonth(toSelect);
    }

    if (e.key === "ArrowRight") {
      const toSelect = addMonths(preselectedMonth, 1);
      if (!inRange(toSelect, startOfYear(viewing), endOfYear(viewing)))
        setViewing(addYears(viewing, 1));
      setPreselectedMonth(toSelect);
    }

    if (e.key === "ArrowUp") {
      const toSelect = subMonths(preselectedMonth, 4);
      if (!inRange(toSelect, startOfYear(viewing), endOfYear(viewing)))
        setViewing(subYears(viewing, 1));
      setPreselectedMonth(toSelect);
    }

    if (e.key === "ArrowDown") {
      const toSelect = addMonths(preselectedMonth, 4);
      if (!inRange(toSelect, startOfYear(viewing), endOfYear(viewing)))
        setViewing(addYears(viewing, 1));
      setPreselectedMonth(toSelect);
    }
  };

  const focusFromOutsideMonths = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    const activeElement = document.activeElement;

    // Wenn bereits im Kontainer, dann nichts tun und auch nicht wenn zu weit außerhalb
    if (monthsRef.current?.contains(activeElement)) return;
    if (!outsideMonthsRef.current?.contains(activeElement)) return;

    if (
      selected.length > 0 &&
      inRange(selected[0], startOfYear(viewing), endOfYear(viewing))
    )
      return setPreselectedMonth(selected[0]);

    if (inRange(new Date(), startOfYear(viewing), endOfYear(viewing)))
      return setPreselectedMonth(new Date());

    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      return setPreselectedMonth(setMonth(viewing, 1));

    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      return setPreselectedMonth(setMonth(viewing, 12));
  };

  const titleFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
  });

  const monthFormatter = new Intl.DateTimeFormat(undefined, {
    month: "short",
  });

  const dataIdFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });

  useEffect(() => {
    if (isValid(preselectedMonth)) {
      const toFocus = document.querySelectorAll(
        `[data-id="${dataIdFormatter.format(preselectedMonth)}"]`
      )[0] as HTMLButtonElement | null;
      toFocus?.focus();
    }
  }, [preselectedMonth]);

  return (
    <div ref={outsideMonthsRef} className={cn("flex flex-col", gaps.sm)}>
      <CalendarHeader
        leftArrowFunction={() => setViewing(subYears(viewing, 1))}
        leftAriaLabel="Previous Year"
        leftArrowDisabled={minDate && isBefore(setMonth(viewing, 1), minDate)}
        rightArrowFunction={() => setViewing(addYears(viewing, 1))}
        rightAriaLabel="Next Year"
        rightArrowDisabled={maxDate && isAfter(setMonth(viewing, 12), maxDate)}
        titleFunction={headerTitleFunction}
        title={titleFormatter.format(viewing)}
        onKeyDown={focusFromOutsideMonths}
      />
      <div ref={monthsRef} className="grid grid-cols-4">
        {new Array(12).fill(null).map((_, i) => {
          const monthDate = setMonth(setDate(clearTime(viewing), 1), i);

          return (
            <Button
              key={String(monthDate)}
              onKeyDown={arrowKeyNavigationMonths}
              tabIndex={
                selected.length > 0 &&
                isSameYear(selected[0], monthDate) &&
                isSameMonth(selected[0], monthDate)
                  ? 0
                  : selected.length === 0 &&
                    isSameYear(new Date(), monthDate) &&
                    isSameMonth(new Date(), monthDate)
                  ? 0
                  : !isSameYear(selected[0], monthDate) &&
                    !isSameMonth(selected[0], monthDate) &&
                    !isSameYear(new Date(), monthDate) &&
                    !isSameMonth(new Date(), monthDate) &&
                    i === 0
                  ? 0
                  : -1
              }
              color={
                selected.length > 0 &&
                isSameYear(selected[0], monthDate) &&
                isSameMonth(selected[0], monthDate)
                  ? "primary"
                  : "accent"
              }
              variant={
                selected.length > 0 &&
                isSameYear(selected[0], monthDate) &&
                isSameMonth(selected[0], monthDate)
                  ? "filled"
                  : "ghost"
              }
              onClick={() => onMonthClick?.(monthDate)}
              data-id={dataIdFormatter.format(monthDate)}
              disabled={
                (minDate &&
                  isBefore(monthDate, setDate(clearTime(minDate), 1))) ||
                (maxDate && isAfter(monthDate, lastDayOfMonth(maxDate)))
              }
            >
              {monthFormatter.format(monthDate)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
