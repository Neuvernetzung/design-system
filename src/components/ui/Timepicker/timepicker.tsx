import cn from "classnames";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import { divides, marginsXSmall } from "../../../styles";
import { ClockIcon, CrossIcon } from "../../../theme/icons";
import { InputVariants, Sizes } from "../../../types";
import { smallerSize } from "../../../utils";
import { typedMemo } from "../../../utils/internal";
import { IconButton } from "../Button";
import { FormElement } from "../Form";
import { RawInput } from "../Input";

export type TimepickerProps = {
  required?: boolean;
  disabled?: boolean;
  removeAll?: boolean;
  inputVariant?: keyof InputVariants;
  label?: string;
  placeholder?: string;
  size?: keyof Sizes;
  helper?: string;
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
  label,
  placeholder,
  size = "md",
  helper,
}: TimepickerProps & UseControllerProps<TFieldValues, TName>) => (
  <Controller
    name={name}
    control={control}
    rules={{
      required,
    }}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <FormElement
        name={name}
        error={error}
        label={label}
        helper={helper}
        size={size}
      >
        <RawInput
          type="time"
          variant={inputVariant}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
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
                    icon={CrossIcon}
                    className={cn("pointer-events-auto", marginsXSmall[size])}
                    onClick={async (e: PointerEvent) => {
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
                    icon={ClockIcon}
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

export default typedMemo(Timepicker);
