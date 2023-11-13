import { cn } from "@/utils";
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
import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
  type WheelEvent,
} from "react";

import { ARROW_KEYS } from "../../../../constants";
import { gaps } from "../../../../styles";
import { Button } from "../../Button";
import type { CalendarProps } from "..";
import { CalendarHeader } from "../header";
import { Indicator } from "../../Indicator";

export type CalenderDateMonthViewProps = Omit<
  CalendarProps,
  "calendarProps" | "onClick" | "selectType" | "onChange"
> &
  Required<Pick<CalendarProps, "calendarProps">> & {
    onMonthClick?: (value: Date) => void;
    headerTitleFunction?: () => void;
  };

export const CalendarDateMonthView = ({
  onMonthClick,
  minDate,
  maxDate,
  headerTitleFunction,
  calendarProps,
  monthHasIndicator,
  monthIsDisabled,
  activeButtonColor,
  availableButtonColor,
  activeButtonVariant,
  availableButtonVariant,
  buttonClassName,
  gridClassName,
}: CalenderDateMonthViewProps) => {
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
    month: "2-digit",
    year: "numeric",
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
      <div
        ref={monthsRef}
        className={cn("grid grid-cols-4", gridClassName)}
        onWheel={(e: WheelEvent) => {
          if (e.deltaY > 0) {
            setViewing(addYears(viewing, 1));
          } else {
            setViewing(subYears(viewing, 1));
          }
        }}
      >
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
                  ? activeButtonColor || "primary"
                  : availableButtonColor || "accent"
              }
              variant={
                selected.length > 0 &&
                isSameYear(selected[0], monthDate) &&
                isSameMonth(selected[0], monthDate)
                  ? activeButtonVariant || "filled"
                  : availableButtonVariant || "ghost"
              }
              className={cn("relative", buttonClassName)}
              onClick={() => onMonthClick?.(monthDate)}
              data-id={dataIdFormatter.format(monthDate)}
              disabled={
                (minDate &&
                  isBefore(monthDate, setDate(clearTime(minDate), 1))) ||
                (maxDate && isAfter(monthDate, lastDayOfMonth(maxDate))) ||
                monthIsDisabled?.(monthDate)
              }
            >
              {monthFormatter.format(monthDate)}
              {monthHasIndicator?.(monthDate) && (
                <Indicator size="sm" wrapperClassName="!absolute bottom-1" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
