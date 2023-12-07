import { Root as SwitchRoot, SwitchThumb } from "@radix-ui/react-switch";
import { cn } from "@/utils";
import isString from "lodash/isString";
import { useRouter } from "next/router";
import type { ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import type { Locale } from "../../../locales/getText";
import {
  bgColors,
  bgColorsInteractive,
  extendedBgColors,
  extendedBgColorsInteractive,
  focus,
  gaps,
  heightsSmall,
  transition,
} from "../../../styles";
import type { Color, Size } from "../../../types";
import { mergeRefs } from "../../../utils/internal";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import type { RequiredRule } from "../Form";
import { FormElement } from "../Form";
import { Text } from "../Typography";

export type SwitchProps = {
  label?: string;
  helper?: string;
  size?: Size;
  color?: Exclude<Color, "accent">;
  required?: RequiredRule;
  content?: ReactNode;
  reverse?: boolean;
  disabled?: boolean;
};

export const SwitchInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    control,
    name,
    required,
    label,
    helper,
    size = "md",
    color = "primary",
    content,
    reverse = false,
    disabled = false,
  }: SwitchProps & UseControllerProps<TFieldValues, TName>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const locale = useRouter().locale as Locale;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
      }}
      render={({
        field: { value, onChange, ref: controllerRef },
        fieldState: { error },
      }) => (
        <FormElement
          required={required}
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
        >
          <div
            className={cn(
              "flex items-center",
              !reverse
                ? "flex-row justify-start"
                : "flex-row-reverse justify-end",
              gaps[size]
            )}
          >
            <SwitchRoot
              checked={value}
              onCheckedChange={onChange}
              disabled={disabled}
              ref={mergeRefs([ref, controllerRef])}
              aria-label={name}
              className={cn(
                value
                  ? bgColorsInteractive[color]
                  : extendedBgColorsInteractive.filled,
                heightsSmall[size],
                focus[color],
                transition,
                disabled && "cursor-not-allowed",
                "relative inline-flex items-center w-min aspect-video rounded-full"
              )}
            >
              <SwitchThumb
                className={cn(
                  bgColors.white,
                  "left-0 translate-x-[20%] data-[state=checked]:left-full data-[state=checked]:-translate-x-[120%]",
                  transition,
                  error && bgColors.danger,
                  disabled && extendedBgColors.filledSubtile,
                  "transition-all absolute inline-block h-[80%] aspect-square rounded-full"
                )}
              />
            </SwitchRoot>
            {isString(content) ? <Text size={size}>{content}</Text> : content}
          </div>
        </FormElement>
      )}
    />
  );
};

SwitchInner.displayName = "Switch"; // muss bleiben sonst kommt docgen storybook plugin durcheinander

export const Switch = forwardRef(SwitchInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: SwitchProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLButtonElement>;
    }
) => ReturnType<typeof SwitchInner>;
