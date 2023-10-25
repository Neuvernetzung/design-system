import cn from "classnames";
import {
  addYears,
  eachYearOfInterval,
  endOfDecade,
  isAfter,
  isBefore,
  isSameYear,
  isValid,
  lastDayOfMonth,
  setDate,
  setMonth,
  startOfDecade,
  subYears,
} from "date-fns";
import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";

import { ARROW_KEYS } from "../../../../constants";
import { gaps } from "../../../../styles";
import { Button } from "../../Button";
import type { CalendarProps } from "..";
import { CalendarHeader } from "../header";
import { Indicator } from "../../Indicator";

export type CalenderDateYearViewProps = Omit<
  CalendarProps,
  "calendarProps" | "onClick" | "selectType" | "onChange"
> &
  Required<Pick<CalendarProps, "calendarProps">> & {
    onYearClick?: (value: Date) => void;
    headerTitleFunction?: () => void;
  };

export const CalendarDateYearView = ({
  onYearClick,
  minDate,
  maxDate,
  headerTitleFunction,
  calendarProps,
  yearHasIndicator,
  yearIsDisabled,
  activeButtonColor,
  availableButtonColor,
  activeButtonVariant,
  availableButtonVariant,
  buttonClassName,
  gridClassName,
}: CalenderDateYearViewProps) => {
  const { inRange, selected, viewing, clearTime, setViewing } = calendarProps;

  const [preselectedYear, setPreselectedYear] = useState<Date>(new Date());

  const yearsRef = useRef<HTMLDivElement>(null);
  const outsideYearsRef = useRef<HTMLDivElement>(null);

  const arrowKeyNavigationYears = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    if (e.key === "ArrowLeft") {
      const toSelect = subYears(preselectedYear, 1);
      if (!inRange(toSelect, startOfDecade(viewing), endOfDecade(viewing)))
        setViewing(subYears(viewing, 10));
      setPreselectedYear(toSelect);
    }

    if (e.key === "ArrowRight") {
      const toSelect = addYears(preselectedYear, 1);
      if (!inRange(toSelect, startOfDecade(viewing), endOfDecade(viewing)))
        setViewing(addYears(viewing, 10));
      setPreselectedYear(toSelect);
    }

    if (e.key === "ArrowUp") {
      const toSelect = subYears(preselectedYear, 5);
      if (!inRange(toSelect, startOfDecade(viewing), endOfDecade(viewing)))
        setViewing(subYears(viewing, 10));
      setPreselectedYear(toSelect);
    }

    if (e.key === "ArrowDown") {
      const toSelect = addYears(preselectedYear, 5);
      if (!inRange(toSelect, startOfDecade(viewing), endOfDecade(viewing)))
        setViewing(addYears(viewing, 10));
      setPreselectedYear(toSelect);
    }
  };

  const focusFromOutsideYears = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    const activeElement = document.activeElement;

    // Wenn bereits im Kontainer, dann nichts tun und auch nicht wenn zu weit außerhalb
    if (yearsRef.current?.contains(activeElement)) return;
    if (!outsideYearsRef.current?.contains(activeElement)) return;

    if (
      selected.length > 0 &&
      inRange(selected[0], startOfDecade(viewing), endOfDecade(viewing))
    )
      return setPreselectedYear(selected[0]);

    if (inRange(new Date(), startOfDecade(viewing), endOfDecade(viewing)))
      return setPreselectedYear(new Date());

    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      return setPreselectedYear(startOfDecade(viewing));

    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      return setPreselectedYear(endOfDecade(viewing));
  };

  const yearFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
  });

  useEffect(() => {
    if (isValid(preselectedYear)) {
      const toFocus = document.querySelectorAll(
        `[data-id="${yearFormatter.format(preselectedYear)}"]`
      )[0] as HTMLButtonElement | null;
      toFocus?.focus();
    }
  }, [preselectedYear]);

  return (
    <div ref={outsideYearsRef} className={cn("flex flex-col", gaps.sm)}>
      <CalendarHeader
        leftArrowFunction={() => setViewing(subYears(viewing, 10))}
        leftAriaLabel="Previous Decade"
        leftArrowDisabled={minDate && isBefore(startOfDecade(viewing), minDate)}
        rightArrowFunction={() => setViewing(addYears(viewing, 10))}
        rightAriaLabel="Next Decade"
        rightArrowDisabled={maxDate && isAfter(endOfDecade(viewing), maxDate)}
        title={`${yearFormatter.format(
          startOfDecade(viewing)
        )} - ${yearFormatter.format(endOfDecade(viewing))}`}
        titleFunction={headerTitleFunction}
        onKeyDown={focusFromOutsideYears}
      />
      <div
        ref={yearsRef}
        className={cn("grid grid-cols-5", gridClassName)}
        onWheel={(e: WheelEvent) => {
          if (e.deltaY > 0) {
            setViewing(addYears(viewing, 10));
          } else {
            setViewing(subYears(viewing, 10));
          }
        }}
      >
        {eachYearOfInterval({
          start: startOfDecade(viewing),
          end: endOfDecade(viewing),
        }).map((year, i) => (
          <Button
            key={String(year)}
            onKeyDown={arrowKeyNavigationYears}
            tabIndex={
              selected.length > 0 && isSameYear(selected[0], year)
                ? 0
                : !inRange(
                    selected[0],
                    startOfDecade(viewing),
                    endOfDecade(viewing)
                  ) && isSameYear(new Date(), year)
                ? 0
                : !inRange(
                    selected[0],
                    startOfDecade(viewing),
                    endOfDecade(viewing)
                  ) &&
                  !inRange(
                    new Date(),
                    startOfDecade(viewing),
                    endOfDecade(viewing)
                  ) &&
                  i === 0
                ? 0
                : -1
            }
            color={
              selected.length > 0 && isSameYear(selected[0], year)
                ? activeButtonColor || "primary"
                : availableButtonColor || "accent"
            }
            variant={
              selected.length > 0 && isSameYear(selected[0], year)
                ? activeButtonVariant || "filled"
                : availableButtonVariant || "ghost"
            }
            className={cn("relative", buttonClassName)}
            onClick={() => {
              onYearClick?.(year);
            }}
            data-id={yearFormatter.format(year)}
            disabled={
              (minDate &&
                isBefore(
                  setMonth(setDate(clearTime(year), 1), 1),
                  setMonth(setDate(clearTime(minDate), 1), 1)
                )) ||
              (maxDate &&
                isAfter(
                  setMonth(lastDayOfMonth(clearTime(year)), 12),
                  setMonth(lastDayOfMonth(clearTime(maxDate)), 12)
                )) ||
              yearIsDisabled?.(year)
            }
          >
            {yearFormatter.format(year)}
            {yearHasIndicator?.(year) && (
              <Indicator size="sm" wrapperClassName="!absolute bottom-1" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
