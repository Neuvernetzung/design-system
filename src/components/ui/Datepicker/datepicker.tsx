import { memo, useRef, useEffect, useState, KeyboardEvent } from "react";
import { Controller } from "react-hook-form";
import {
  Text,
  Button,
  IconButton,
  FormElement,
  Popover,
  PopoverButton,
  ButtonGroup,
} from "../";
import type { RequiredRule } from "../";
import {
  gaps,
  marginsXSmall,
  paddingsX,
  placeholderAsText,
  transitionFast,
  divides,
} from "../../../styles";
import {
  CrossIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CalendarIcon,
  BackArrowIcon,
} from "../../../theme/icons";
import cn from "classnames";
import { InputVariants, Sizes } from "../../../types";
import { getInputStyles } from "../../../styles/groups";
import de from "date-fns/locale/de";
import { useLilius, Day } from "use-lilius";
import {
  addDays,
  endOfMonth,
  format,
  getDate,
  isThisMonth,
  isToday,
  isValid,
  lastDayOfMonth,
  startOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  setDate,
  setMonth,
  subYears,
  addYears,
  subMonths,
  addMonths,
  isSameYear,
  isSameMonth,
  startOfDecade,
  endOfDecade,
  eachYearOfInterval,
} from "date-fns";

export type DatepickerProps = {
  label?: string;
  name: string;
  formMethods: any;
  required?: RequiredRule;
  placeholder?: string;
  size?: keyof Sizes;
  helper?: string;
  inputVariant?: keyof InputVariants;
  disabled?: boolean;
  removeAll?: boolean;
};

enum Views {
  DATES = "dates",
  MONTHS = "months",
  YEARS = "years",
}

export const Datepicker = ({
  label,
  name,
  formMethods,
  required,
  placeholder,
  size = "md",
  helper,
  inputVariant = "outline",
  disabled = false,
  removeAll = true,
}: DatepickerProps) => {
  const {
    calendar,
    clearSelected,
    clearTime,
    inRange,
    isSelected,
    select,
    selected,
    setViewing,
    toggle,
    viewing,
    viewNextMonth,
    viewPreviousMonth,
    viewToday,
  } = useLilius({ weekStartsOn: Day.MONDAY });

  // When the selection is changed, we want to update the input field
  // and the currently viewed month to match.
  useEffect(() => {
    setViewing(selected.length > 0 ? selected[0] : new Date());
  }, [selected, setViewing]);

  const [preselectedDate, setPreselectedDate] = useState<Date>(new Date());
  const [preselectedMonth, setPreselectedMonth] = useState<Date>(new Date());
  const [preselectedYear, setPreselectedYear] = useState<Date>(new Date());

  const [currentView, setCurrentView] = useState<Views>(Views.DATES);

  useEffect(() => {
    if (isValid(preselectedDate))
      document
        .querySelectorAll(
          '[data-id="' + format(preselectedDate, "dd.MM.yyyy") + '"]'
        )[0]
        ?.focus();
  }, [preselectedDate]);

  useEffect(() => {
    if (isValid(preselectedMonth))
      document
        .querySelectorAll(
          '[data-id="' + format(preselectedMonth, "MM.yyyy") + '"]'
        )[0]
        ?.focus();
  }, [preselectedMonth]);

  useEffect(() => {
    if (isValid(preselectedYear))
      document
        .querySelectorAll(
          '[data-id="' + format(preselectedYear, "yyyy") + '"]'
        )[0]
        ?.focus();
  }, [preselectedYear]);

  const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

  const daysRef = useRef<HTMLDivElement>(null);
  const monthsRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);

  const arrowKeyNavigationDates = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    const activeElement = document.activeElement;

    // Wenn nicht im ausgewählten Kontainer dann return
    if (!daysRef.current?.contains(activeElement)) return;

    if (e.key === "ArrowLeft") {
      const toSelect = subDays(preselectedDate, 1);
      !inRange(toSelect, startOfMonth(viewing), endOfMonth(viewing)) &&
        viewPreviousMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowRight") {
      const toSelect = addDays(preselectedDate, 1);
      !inRange(toSelect, startOfMonth(viewing), endOfMonth(viewing)) &&
        viewNextMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowUp") {
      const toSelect = subDays(preselectedDate, 7);
      !inRange(toSelect, startOfMonth(viewing), endOfMonth(viewing)) &&
        viewPreviousMonth();
      setPreselectedDate(toSelect);
    }

    if (e.key === "ArrowDown") {
      const toSelect = addDays(preselectedDate, 7);
      !inRange(toSelect, startOfMonth(viewing), endOfMonth(viewing)) &&
        viewNextMonth();
      setPreselectedDate(toSelect);
    }
  };

  const arrowKeyNavigationMonths = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    const activeElement = document.activeElement;

    // Wenn nicht im ausgewählten Kontainer dann return
    if (!monthsRef.current?.contains(activeElement)) return;

    if (e.key === "ArrowLeft") {
      const toSelect = subMonths(preselectedMonth, 1);
      !inRange(toSelect, startOfYear(viewing), endOfYear(viewing)) &&
        setViewing(subYears(viewing, 1));
      setPreselectedMonth(toSelect);
    }

    if (e.key === "ArrowRight") {
      const toSelect = addMonths(preselectedMonth, 1);
      !inRange(toSelect, startOfYear(viewing), endOfYear(viewing)) &&
        setViewing(addYears(viewing, 1));
      setPreselectedMonth(toSelect);
    }

    if (e.key === "ArrowUp") {
      const toSelect = subMonths(preselectedMonth, 4);
      !inRange(toSelect, startOfYear(viewing), endOfYear(viewing)) &&
        setViewing(subYears(viewing, 1));
      setPreselectedMonth(toSelect);
    }

    if (e.key === "ArrowDown") {
      const toSelect = addMonths(preselectedMonth, 4);
      !inRange(toSelect, startOfYear(viewing), endOfYear(viewing)) &&
        setViewing(addYears(viewing, 1));
      setPreselectedMonth(toSelect);
    }
  };

  const arrowKeyNavigationYears = (e: KeyboardEvent) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    e.preventDefault();

    const activeElement = document.activeElement;

    // Wenn nicht im ausgewählten Kontainer dann return
    if (!yearsRef.current?.contains(activeElement)) return;

    if (e.key === "ArrowLeft") {
      const toSelect = subYears(preselectedYear, 1);
      !inRange(toSelect, startOfDecade(viewing), endOfDecade(viewing)) &&
        setViewing(subYears(viewing, 10));
      setPreselectedYear(toSelect);
    }

    if (e.key === "ArrowRight") {
      const toSelect = addYears(preselectedYear, 1);
      !inRange(toSelect, startOfDecade(viewing), endOfDecade(viewing)) &&
        setViewing(addYears(viewing, 10));
      setPreselectedYear(toSelect);
    }

    if (e.key === "ArrowUp") {
      const toSelect = subYears(preselectedYear, 5);
      !inRange(toSelect, startOfDecade(viewing), endOfDecade(viewing)) &&
        setViewing(subYears(viewing, 10));
      setPreselectedYear(toSelect);
    }

    if (e.key === "ArrowDown") {
      const toSelect = addYears(preselectedYear, 5);
      !inRange(toSelect, startOfDecade(viewing), endOfDecade(viewing)) &&
        setViewing(addYears(viewing, 10));
      setPreselectedYear(toSelect);
    }
  };

  const outsideDaysRef = useRef<HTMLDivElement>(null);
  const outsideMonthsRef = useRef<HTMLDivElement>(null);
  const outsideYearsRef = useRef<HTMLDivElement>(null);

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

  const iconButtonSizes: Sizes = {
    xs: "xs",
    sm: "xs",
    md: "sm",
    lg: "md",
    xl: "lg",
  };

  return (
    <Controller
      name={name}
      control={formMethods.control}
      rules={{
        required,
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className={cn()}>
          <FormElement
            name={name}
            error={error}
            label={label}
            helper={helper}
            size={size}
          >
            <Popover
              focus
              buttonAs="button"
              placement="bottom"
              buttonProps={{
                className: getInputStyles({
                  size,
                  variant: inputVariant,
                  error: !!error,
                  disabled,
                }),
                children: (
                  <div className="flex flex-row justify-between items-center">
                    {value ? (
                      format(value, "dd.MM.yyyy")
                    ) : (
                      <span className={placeholderAsText[inputVariant]}>
                        {placeholder}
                      </span>
                    )}
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-y-0 right-0 flex flex-row items-center divide-x",
                        divides.accent
                      )}
                    >
                      {removeAll && selected.length > 0 && (
                        <IconButton
                          size={iconButtonSizes[size]}
                          variant="ghost"
                          ariaLabel="delete_selected_date"
                          icon={CrossIcon}
                          className={cn(
                            "pointer-events-auto",
                            marginsXSmall[size]
                          )}
                          onClick={(e: PointerEvent) => {
                            e.preventDefault();
                            clearSelected();
                            onChange(undefined);
                          }}
                          disabled={disabled}
                        />
                      )}
                      <div>
                        <IconButton
                          as="span"
                          size={iconButtonSizes[size]}
                          icon={CalendarIcon}
                          variant="ghost"
                          className={cn(
                            "pointer-events-none flex max-h-6",
                            marginsXSmall[size]
                          )}
                        />
                      </div>
                    </span>
                  </div>
                ),
              }}
              content={
                <>
                  {currentView === Views.DATES && (
                    <div
                      ref={outsideDaysRef}
                      onKeyDown={focusFromOutsideDates}
                      className={cn("flex flex-col", gaps.sm)}
                    >
                      <ButtonGroup>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            select(clearTime(new Date()), true);
                            onChange(new Date());
                          }}
                          size="sm"
                        >
                          Heute
                        </Button>
                      </ButtonGroup>

                      <CalendarHeader
                        leftArrowFunction={viewPreviousMonth}
                        leftAriaLabel="Previous Month"
                        rightArrowFunction={viewNextMonth}
                        rightAriaLabel="Next Month"
                        titleFunction={() => setCurrentView(Views.MONTHS)}
                        title={format(viewing, "MMMM yyyy")}
                      />

                      <div>
                        <div className="grid grid-cols-7 text-center">
                          {calendar[0][0].map((day) => (
                            <Text size="xs" key={`${day}`}>
                              {format(day, "EEEEEE", { locale: de })}
                            </Text>
                          ))}
                        </div>

                        <div
                          ref={daysRef}
                          onKeyDown={(e) => arrowKeyNavigationDates(e)}
                          className="grid grid-cols-7"
                        >
                          {calendar[0].map((week) =>
                            week.map((day) => (
                              <PopoverButton
                                as={Button}
                                size="sm"
                                tabIndex={
                                  isSelected(day)
                                    ? "0"
                                    : (selected.length === 0 ||
                                        !inRange(
                                          selected[0],
                                          startOfMonth(viewing),
                                          endOfMonth(viewing)
                                        )) &&
                                      isToday(day)
                                    ? "0"
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
                                    ? "0"
                                    : "-1"
                                }
                                variant={!isSelected(day) ? "ghost" : "filled"}
                                color={!isSelected(day) ? "accent" : "primary"}
                                className={cn(
                                  !inRange(
                                    day,
                                    startOfMonth(viewing),
                                    endOfMonth(viewing)
                                  ) && "opacity-50",
                                  transitionFast
                                )}
                                data-id={format(day, "dd.MM.yyyy")}
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
                                  onChange(day);
                                }}
                              >
                                {format(day, "dd")}
                              </PopoverButton>
                            ))
                          )}
                        </div>
                      </div>
                      <ButtonGroup>
                        {!isThisMonth(viewing) && (
                          <Button
                            onClick={viewToday}
                            size="sm"
                            variant="outline"
                            leftIcon={BackArrowIcon}
                          >
                            Zurück zum aktuellen Monat
                          </Button>
                        )}
                      </ButtonGroup>
                    </div>
                  )}
                  {currentView === Views.MONTHS && (
                    <div
                      ref={outsideMonthsRef}
                      onKeyDown={focusFromOutsideMonths}
                      className={cn("flex flex-col", gaps.sm)}
                    >
                      <CalendarHeader
                        leftArrowFunction={() =>
                          setViewing(subYears(viewing, 1))
                        }
                        leftAriaLabel="Previous Year"
                        rightArrowFunction={() =>
                          setViewing(addYears(viewing, 1))
                        }
                        rightAriaLabel="Next Year"
                        titleFunction={() => setCurrentView(Views.YEARS)}
                        title={format(viewing, "yyyy")}
                      />
                      <div
                        ref={monthsRef}
                        onKeyDown={(e) => arrowKeyNavigationMonths(e)}
                        className="grid grid-cols-4"
                      >
                        {new Array(12).fill(null).map((_, i) => {
                          const monthDate = setMonth(viewing, i);

                          return (
                            <Button
                              tabIndex={
                                selected.length > 0 &&
                                isSameYear(selected[0], monthDate) &&
                                isSameMonth(selected[0], monthDate)
                                  ? "0"
                                  : selected.length === 0 &&
                                    isSameYear(new Date(), monthDate) &&
                                    isSameMonth(new Date(), monthDate)
                                  ? "0"
                                  : !isSameYear(selected[0], monthDate) &&
                                    !isSameMonth(selected[0], monthDate) &&
                                    !isSameYear(new Date(), monthDate) &&
                                    !isSameMonth(new Date(), monthDate) &&
                                    i === 0
                                  ? "0"
                                  : "-1"
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
                              onClick={() => {
                                setViewing(monthDate);
                                setCurrentView(Views.DATES);
                              }}
                              data-id={format(monthDate, "MM.yyyy")}
                            >
                              {format(monthDate, "LLL", { locale: de })}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {currentView === Views.YEARS && (
                    <div
                      ref={outsideYearsRef}
                      onKeyDown={focusFromOutsideYears}
                      className={cn("flex flex-col", gaps.sm)}
                    >
                      <CalendarHeader
                        leftArrowFunction={() =>
                          setViewing(subYears(viewing, 10))
                        }
                        leftAriaLabel="Previous Decade"
                        rightArrowFunction={() =>
                          setViewing(addYears(viewing, 10))
                        }
                        rightAriaLabel="Next Decade"
                        title={`${format(
                          startOfDecade(viewing),
                          "yyyy"
                        )} - ${format(endOfDecade(viewing), "yyyy")}`}
                      />
                      <div
                        ref={yearsRef}
                        onKeyDown={(e) => arrowKeyNavigationYears(e)}
                        className="grid grid-cols-5"
                      >
                        {eachYearOfInterval({
                          start: startOfDecade(viewing),
                          end: endOfDecade(viewing),
                        }).map((year, i) => {
                          return (
                            <Button
                              tabIndex={
                                selected.length > 0 &&
                                isSameYear(selected[0], year)
                                  ? "0"
                                  : !inRange(
                                      selected[0],
                                      startOfDecade(viewing),
                                      endOfDecade(viewing)
                                    ) && isSameYear(new Date(), year)
                                  ? "0"
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
                                  ? "0"
                                  : "-1"
                              }
                              color={
                                selected.length > 0 &&
                                isSameYear(selected[0], year)
                                  ? "primary"
                                  : "accent"
                              }
                              variant={
                                selected.length > 0 &&
                                isSameYear(selected[0], year)
                                  ? "filled"
                                  : "ghost"
                              }
                              onClick={() => {
                                setViewing(year);
                                setCurrentView(Views.MONTHS);
                              }}
                              data-id={format(year, "yyyy")}
                            >
                              {format(year, "yyyy")}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              }
            />
          </FormElement>
        </div>
      )}
    />
  );
};

export default memo(Datepicker);

type CalenderHeaderProps = {
  leftArrowFunction: Function;
  leftAriaLabel: string;
  rightArrowFunction: Function;
  rightAriaLabel: string;
  titleFunction?: Function;
  title: string;
};

const CalendarHeader = ({
  leftArrowFunction,
  leftAriaLabel,
  rightArrowFunction,
  rightAriaLabel,
  titleFunction,
  title,
}: CalenderHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between",
        gaps.md,
        paddingsX.md
      )}
    >
      <IconButton
        variant="ghost"
        ariaLabel={leftAriaLabel}
        icon={ChevronLeftIcon}
        onClick={leftArrowFunction}
        size="sm"
      />

      <Button
        variant="ghost"
        onClick={titleFunction}
        tabIndex={!titleFunction ? "-1" : "0"}
        className={cn("w-full", !titleFunction && "pointer-events-none")}
      >
        {title}
      </Button>

      <IconButton
        variant="ghost"
        ariaLabel={rightAriaLabel}
        icon={ChevronRightIcon}
        onClick={rightArrowFunction}
        size="sm"
      />
    </div>
  );
};
