import { IconCalendar, IconX } from "@tabler/icons-react";
import {
  addDays,
  differenceInDays,
  isAfter,
  isBefore,
  isValid,
} from "date-fns";
import { useRouter } from "next/router";
import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  useEffect,
  useMemo,
} from "react";
import {
  FieldError,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import type { Locale } from "@/locales/getText";
import { marginsXSmall } from "@/styles";
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
import { InputRaw } from "../Input";
import { Popover } from "../Popover";
import { usePopover } from "../Popover/popover";
import { dateInputValueToDate, formatDateInputValue } from "./utils/format";

export type DatepickerProps = Omit<
  DatepickerRawProps,
  "id" | "error" | "value" | "onChange"
>;

export const Datepicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  required,
  disabled = false,
  minDate,
  maxDate,
  ...props
}: DatepickerProps & UseControllerProps<TFieldValues, TName>) => {
  const locale = useRouter().locale as Locale;

  const minDateWithoutTime = useMemo(
    () => (minDate ? clearTime(minDate) : undefined),
    [minDate]
  );
  const maxDateWithoutTime = useMemo(
    () => (maxDate ? clearTime(maxDate) : undefined),
    [maxDate]
  );

  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: requiredInputRule(required, locale),
      validate: (v) => {
        if (minDateWithoutTime && isAfter(minDateWithoutTime, v))
          return `Das Datum muss nach dem ${minDateWithoutTime.toLocaleDateString()} sein.`;

        if (maxDateWithoutTime && isBefore(maxDateWithoutTime, v))
          return `Das Datum muss vor dem ${maxDateWithoutTime.toLocaleDateString()} sein.`;

        return true;
      },
    },
    disabled,
  });

  return (
    <DatepickerRaw
      id={name}
      ref={ref}
      value={value}
      onChange={onChange}
      disabled={disabled}
      minDate={minDate}
      maxDate={maxDate}
      error={error}
      required={required}
      {...props}
    />
  );
};

export type DatepickerRawProps = {
  id: string;
  label?: string;
  required?: RequiredRule;
  placeholder?: string;
  size?: Size;
  helper?: string;
  inputVariant?: InputVariant;
  disabled?: boolean;
  removeAll?: boolean;
  minDate?: Date;
  maxDate?: Date;
  error?: FieldError;
  value?: Date;
  onChange?: (value: Date | null | undefined) => void;
};

export const DatepickerRaw = forwardRef(
  (
    {
      id,
      label,
      required,
      placeholder,
      size = "md",
      helper,
      inputVariant = "outline",
      disabled = false,
      removeAll = true,
      minDate,
      maxDate,
      error,
      value,
      onChange,
    }: DatepickerRawProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const calendarProps = useCalendar();
    const { clearSelected, setSelected, selected, setViewing } = calendarProps;

    const popoverControler = usePopover();

    useEffect(() => {
      if (!value || !isValid(new Date(value))) return;

      setViewing(new Date(value));
      setSelected([clearTime(new Date(value))]);
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

    const handleOnChange = (value: Date) => {
      onChange?.(value);

      setSelected([clearTime(value)]);
      setViewing(value);
    };

    return (
      <FormElement
        required={required}
        name={id}
        error={error}
        label={label}
        helper={helper}
        size={size}
      >
        <InputRaw
          id={id}
          ref={ref}
          type="date"
          value={formatDateInputValue(value)}
          onChange={(value) => {
            const v = dateInputValueToDate(value);
            if (!v) return;
            handleOnChange(v);
          }}
          variant={inputVariant}
          disabled={disabled}
          placeholder={placeholder}
          min={formatDateInputValue(minDate)}
          max={formatDateInputValue(maxDate)}
          error={!!error}
          size={size}
          rightElement={{
            pointerEvents: true,
            children: (
              <span className={cn("flex flex-row items-center")}>
                {removeAll && !!value && (
                  <IconButton
                    size={smallerSize(size)}
                    variant="ghost"
                    ariaLabel="delete_selected_date"
                    icon={IconX}
                    className={cn("pointer-events-auto", marginsXSmall[size])}
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      clearSelected();
                      onChange?.(null); // null wird verwendet, da bei undefined der Controller auf den defaultValue zurücksetzt
                      onChange?.(undefined);
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
                        selectType="single"
                        onChange={(v) => {
                          onChange?.(utcDateToLocal(v, v.getTimezoneOffset()));
                          popoverControler.close();
                        }}
                      />
                    }
                  />
                )}
              </span>
            ),
          }}
        />
      </FormElement>
    );
  }
);

DatepickerRaw.displayName = "DatepickerRaw";
