import { IconCalendar, IconX } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import {
  addDays,
  differenceInDays,
  isAfter,
  isBefore,
  isValid,
} from "date-fns";
import { useRouter } from "next/router";
import { MouseEvent, useEffect } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import type { Locale } from "@/locales/getText";
import { divides, marginsXSmall, placeholderAsText } from "@/styles";
import { getInputStyles } from "@/styles/groups";
import type { InputVariant, Size } from "@/types";
import { smallerSize } from "@/utils";
import { requiredInputRule } from "@/utils/internal/inputRule";
import { IconButton } from "../Button";
import { Calendar } from "../Calendar";
import { useCalendar } from "../Calendar/hooks/useCalendar";
import { FormElement, RequiredRule } from "../Form";
import { Popover } from "../Popover";
import { usePopover } from "../Popover/popover";
import { Icon } from "../Icon";
import { clearTime } from "@/utils/date";

export type DatepickerProps = {
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
};

export const Datepicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  name,
  control,
  required,
  placeholder,
  size = "md",
  helper,
  inputVariant = "outline",
  disabled = false,
  removeAll = true,
  minDate,
  maxDate,
}: DatepickerProps & UseControllerProps<TFieldValues, TName>) => {
  const calendarProps = useCalendar();
  const { clearSelected, select, selected, setViewing } = calendarProps;

  const popoverControler = usePopover();

  // Initial Value für useCalendar select setzen
  const {
    field: { value: initialValue },
  } = useController({ control, name });

  useEffect(() => {
    if (!initialValue || !isValid(new Date(initialValue))) return;

    select(clearTime(new Date(initialValue)), true);
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

  const locale = useRouter().locale as Locale;

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: requiredInputRule(required, locale),
      }}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <div className={cn()}>
          <FormElement
            required={required}
            name={name}
            error={error}
            label={label}
            helper={helper}
            size={size}
          >
            <Popover
              controller={popoverControler}
              ref={ref}
              side="bottom"
              buttonComponent={
                <button
                  type="button"
                  className={cn(
                    "relative",
                    getInputStyles({
                      size,
                      variant: inputVariant,
                      error: !!error,
                      disabled,
                    })
                  )}
                >
                  <div className="flex flex-row justify-between items-center">
                    {value ? (
                      dateFormatter.format(new Date(value))
                    ) : (
                      <span className={cn(placeholderAsText[inputVariant])}>
                        {placeholder}
                      </span>
                    )}
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-y-0 right-0 flex flex-row items-center divide-x",
                        divides.accent
                      )}
                    >
                      {removeAll && !!value && (
                        <IconButton
                          size={smallerSize(size)}
                          variant="ghost"
                          ariaLabel="delete_selected_date"
                          icon={IconX}
                          className={cn(
                            "pointer-events-auto",
                            marginsXSmall[size]
                          )}
                          onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            clearSelected();
                            onChange(null); // null wird verwendet, da bei undefined der Controller auf den defaultValue zurücksetzt
                          }}
                          disabled={disabled}
                        />
                      )}
                      <div className="aspect-square h-full flex items-center justify-center">
                        <Icon
                          size={smallerSize(size)}
                          icon={IconCalendar}
                          className={cn(
                            "pointer-events-none flex max-h-6",
                            marginsXSmall[size]
                          )}
                        />
                      </div>
                    </span>
                  </div>
                </button>
              }
              content={
                <Calendar
                  calendarProps={calendarProps}
                  minDate={minDate}
                  maxDate={maxDate}
                  selectType="single"
                  onChange={(e) => {
                    onChange(e);
                    popoverControler.close();
                  }}
                />
              }
            />
          </FormElement>
        </div>
      )}
    />
  );
};
