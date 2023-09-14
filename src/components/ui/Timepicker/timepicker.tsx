import cn from "classnames";
import isNumber from "lodash/isNumber";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import { getText, type Locale } from "../../../locales/getText";
import { divides, marginsXSmall } from "../../../styles";
import { IconClock, IconX } from "@tabler/icons-react";
import type { InputVariant, Size } from "../../../types";
import { smallerSize } from "../../../utils";
import { typedMemo } from "../../../utils/internal";
import { IconButton } from "../Button";
import { FormElement } from "../Form";
import { RawInput } from "../Input";

export type TimepickerProps = {
  required?: boolean;
  disabled?: boolean;
  removeAll?: boolean;
  inputVariant?: InputVariant;
  inputClassName?: string;
  label?: string;
  placeholder?: string;
  size?: Size;
  helper?: string;
  min?: string;
  max?: string;
};

export const Timepicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  required = false,
  disabled = false,
  removeAll = false,
  inputVariant = "outline",
  inputClassName,
  label,
  placeholder,
  size = "md",
  helper,
  min,
  max,
}: TimepickerProps & UseControllerProps<TFieldValues, TName>) => {
  const locale = useRouter().locale as Locale;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required,
        validate: (v) => {
          if (!v) return true;

          const hour = Number(v.split(":")[0]);
          const minute = Number(v.split(":")[1]);

          if (!isNumber(hour) || !isNumber(minute))
            return getText(locale).invalidTime;

          if (min) {
            const minHour = Number(min.split(":")[0]);
            const minMinute = Number(min.split(":")[1]);
            if (hour < minHour || (hour === minHour && minute < minMinute)) {
              return getText(locale).min(min);
            }
          }
          if (max) {
            const maxHour = Number(max.split(":")[0]);
            const maxMinute = Number(max.split(":")[1]);
            if (hour > maxHour || (hour === maxHour && minute > maxMinute)) {
              return getText(locale).max(max);
            }
          }
          return true;
        },
      }}
      render={({
        field: { value, onChange, ref: controllerRef },
        fieldState: { error },
      }) => (
        <FormElement
          required={required}
          name={name}
          error={error}
          label={label}
          helper={helper}
          size={size}
        >
          <RawInput
            ref={controllerRef}
            type="time"
            variant={inputVariant}
            placeholder={placeholder}
            inputClassName={inputClassName}
            disabled={disabled}
            value={value}
            size={size}
            onChange={onChange}
            id={name}
            rightElement={{
              className: "pr-0",
              pointerEvents: true,
              children: (
                <span
                  className={cn(
                    "pointer-events-none flex flex-row items-center divide-x",
                    divides.accent
                  )}
                >
                  {removeAll && !!value && (
                    <IconButton
                      size={smallerSize(size)}
                      variant="ghost"
                      ariaLabel="delete_selected_date"
                      icon={IconX}
                      className={cn("pointer-events-auto", marginsXSmall[size])}
                      onClick={async (e: MouseEvent) => {
                        e.preventDefault();
                        await onChange(""); // "" wird verwendet, da bei undefined der Input nicht zurück gesetzt wird
                        await onChange(undefined); // um den Controller zurück zu setzen
                      }}
                      disabled={disabled}
                    />
                  )}
                  <div>
                    <IconButton
                      as="span"
                      role="button"
                      ariaLabel="clock"
                      size={smallerSize(size)}
                      icon={IconClock}
                      variant="ghost"
                      className={cn(
                        "pointer-events-none flex max-h-6",
                        marginsXSmall[size]
                      )}
                    />
                  </div>
                </span>
              ),
            }}
          />
        </FormElement>
      )}
    />
  );
};

export default typedMemo(Timepicker);
