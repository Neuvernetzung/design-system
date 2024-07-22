import { IconCalendar, IconX } from "@tabler/icons-react";
import {
  addDays,
  differenceInDays,
  isAfter,
  isBefore,
  isValid,
} from "date-fns";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useMemo, useRef } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { useRefDimensions } from "@/hooks";
import type { Locale } from "@/locales/getText";
import { marginsXSmall, paddingsX } from "@/styles";
import { getInputStyles, inputContainerClassName } from "@/styles/groups";
import type { InputVariant, Size } from "@/types";
import { smallerSize, utcDateToLocal } from "@/utils";
import { isFirefox } from "@/utils/browser/isFirefox";
import { cn } from "@/utils/cn";
import { clearTime } from "@/utils/date";
import { requiredInputRule } from "@/utils/internal/inputRule";

import { IconButton } from "../Button";
import { Calendar } from "../Calendar";
import { useCalendar } from "../Calendar/hooks/useCalendar";
import { FormElement, RequiredRule } from "../Form";
import { InputElement } from "../Input/InputElement";
import { Popover } from "../Popover";
import { usePopover } from "../Popover/popover";
import { Text } from "../Typography";
import { dateInputValueToDate, formatDateInputValue } from "./utils/format";

export type DateRangepickerProps<TFieldValues extends FieldValues> = {
  label?: string;
  required?: RequiredRule;
  size?: Size;
  helper?: string;
  inputVariant?: InputVariant;
  disabled?: boolean;
  removeAll?: boolean;
  minDate?: Date;
  maxDate?: Date;
  control: Control<TFieldValues>;
  name: { start: FieldPath<TFieldValues>; end: FieldPath<TFieldValues> };
};

export const DateRangepicker = <
  TFieldValues extends FieldValues = FieldValues
>({
  label,
  name,
  control,
  required,
  size = "md",
  helper,
  inputVariant = "outline",
  disabled = false,
  removeAll = true,
  minDate,
  maxDate,
}: DateRangepickerProps<TFieldValues>) => {
  const calendarProps = useCalendar();
  const { clearSelected, selected, selectRange, setViewing } = calendarProps;

  const { start: startName, end: endName } = name;

  const popoverControler = usePopover();

  const locale = useRouter().locale as Locale;

  const controllerRules: UseControllerProps<TFieldValues>["rules"] = {
    required: requiredInputRule(required, locale),
    validate: (v) => {
      if (minDate && isAfter(minDate, v))
        return `Wert muss nach ${minDate.toLocaleDateString()} sein.`;

      if (maxDate && isBefore(maxDate, v))
        return `Wert muss vor ${maxDate.toLocaleDateString()} sein.`;

      return true;
    },
  };

  const {
    field: { value: startValue, onChange: onStartChange, ref: startRef },
    fieldState: { error: startError },
  } = useController({
    control,
    name: startName,
    rules: controllerRules,
    disabled,
  });
  const {
    field: { value: endValue, onChange: onEndChange, ref: endRef },
    fieldState: { error: endError },
  } = useController({
    control,
    name: endName,
    rules: controllerRules,
    disabled,
  });

  useEffect(() => {
    if (!startValue || !isValid(new Date(startValue))) return;
    if (!endValue || !isValid(new Date(endValue))) return;

    setViewing(new Date(startValue));
    selectRange(
      clearTime(new Date(startValue)),
      clearTime(new Date(endValue)),
      true
    );
  }, []);

  // Initiale Kalenderseite setzen
  useEffect(() => {
    if (
      minDate &&
      !isBefore(new Date(), minDate) &&
      maxDate &&
      !isAfter(new Date(), maxDate)
    ) {
      setViewing(selected.length > 0 ? selected[0] : new Date());
    } else if (minDate && maxDate) {
      setViewing(
        selected.length > 0
          ? selected[0]
          : new Date(addDays(minDate, differenceInDays(maxDate, minDate) / 2))
      );
    } else if (minDate) {
      setViewing(selected.length > 0 ? selected[0] : minDate);
    } else if (maxDate) {
      setViewing(selected.length > 0 ? selected[0] : maxDate);
    }
  }, [selected, setViewing]);

  const firefox = useMemo(() => isFirefox(), []);

  const rightElementRef = useRef<HTMLDivElement>(null);

  const { width: rightElementWidth } = useRefDimensions(rightElementRef);

  const inputClassName = getInputStyles({
    size,
    variant: inputVariant,
    error: !!startError || !!endError,
    disabled,
  });

  const timezoneOffset = useMemo(() => new Date().getTimezoneOffset(), []);

  const handleOnChange = (
    value: Date,
    onChange: (v: Date) => void,
    position: "start" | "end"
  ) => {
    onChange(value);
    if (position === "start") {
      setViewing(value);
      selectRange(clearTime(value), selected[selected.length - 1], true);
    }
    if (position === "end") {
      selectRange(selected[0], clearTime(value), true);
    }
  };

  return (
    <FormElement
      required={required}
      name={startName}
      error={startError || endError}
      label={label}
      helper={helper}
      size={size}
    >
      <div className={cn(inputContainerClassName)}>
        <div
          className={cn(inputClassName, "p-0 flex flex-row items-center")}
          style={{
            paddingRight: rightElementWidth,
          }}
        >
          <input
            ref={startRef}
            type="date"
            value={formatDateInputValue(startValue)}
            onChange={(e) => {
              const v = dateInputValueToDate(e.target.value);
              if (!v) return;
              handleOnChange(v, onStartChange, "start");
            }}
            className={cn(inputClassName, "border-none m-0")}
          />
          <Text className={cn(paddingsX[size])}>-</Text>
          <input
            ref={endRef}
            type="date"
            value={formatDateInputValue(endValue)}
            onChange={(e) => {
              const v = dateInputValueToDate(e.target.value);
              if (!v) return;
              handleOnChange(v, onEndChange, "end");
            }}
            className={cn(inputClassName, "border-none m-0")}
          />
          <InputElement
            size={size}
            type="right"
            ref={rightElementRef}
            pointerEvents
          >
            <span className={cn("flex flex-row items-center")}>
              {removeAll && !!startValue && (
                <IconButton
                  size={smallerSize(size)}
                  variant="ghost"
                  ariaLabel="delete_selected_date"
                  icon={IconX}
                  className={cn("pointer-events-auto", marginsXSmall[size])}
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    clearSelected();
                    onStartChange(null); // null wird verwendet, da bei undefined der Controller auf den defaultValue zurücksetzt
                    onStartChange(undefined);
                    onEndChange(null); // null wird verwendet, da bei undefined der Controller auf den defaultValue zurücksetzt
                    onEndChange(undefined);
                  }}
                  disabled={disabled}
                />
              )}
              {!firefox && ( // Bei Firefox muss Button versteckt werden, da der native Button nicht versteckt werden kann und somit sonst 2 angezeigt werden würden.
                <Popover
                  controller={popoverControler}
                  side="bottom"
                  disabled={disabled}
                  align="end"
                  buttonComponent={
                    <IconButton
                      ariaLabel="Kalender öffnen"
                      variant="ghost"
                      icon={IconCalendar}
                      size={smallerSize(size)}
                      disabled={disabled}
                    />
                  }
                  content={
                    <Calendar
                      calendarProps={calendarProps}
                      minDate={minDate}
                      maxDate={maxDate}
                      selectType="range"
                      onChange={(v) => {
                        if (v[0]) {
                          onStartChange(utcDateToLocal(v[0], timezoneOffset));
                        }
                        if (v[1]) {
                          onEndChange(utcDateToLocal(v[1], timezoneOffset));
                        }
                      }}
                    />
                  }
                />
              )}
            </span>
          </InputElement>
        </div>
      </div>
    </FormElement>
  );
};
