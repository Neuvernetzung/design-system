import { Switch as HeadlessSwitch } from "@headlessui/react";
import cn from "classnames";
import isString from "lodash/isString";
import { ForwardedRef, forwardRef, Fragment, ReactNode } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

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
import { mergeRefs, typedMemo } from "../../../utils/internal";
import type { RequiredRule } from "../Form";
import { FormElement } from "../Form";
import { Text } from "../Typography";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import { useRouter } from "next/router";
import type { Locale } from "../../../locales/getText";

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
            <HeadlessSwitch checked={value} as={Fragment} onChange={onChange}>
              {({ checked }) => (
                <button
                  ref={mergeRefs([ref, controllerRef])}
                  disabled={disabled}
                  type="button"
                  aria-label={name}
                  className={cn(
                    checked
                      ? bgColorsInteractive[color]
                      : extendedBgColorsInteractive.filled,
                    heightsSmall[size],
                    focus[color],
                    transition,
                    disabled && "cursor-not-allowed",
                    "relative inline-flex items-center w-min aspect-video rounded-full"
                  )}
                >
                  <span
                    className={cn(
                      bgColors.white,
                      checked
                        ? "left-full -translate-x-[120%]"
                        : "left-0 translate-x-[20%]",
                      transition,
                      error && bgColors.danger,
                      disabled && extendedBgColors.filledSubtile,
                      "transition-all absolute inline-block h-[80%] aspect-square rounded-full"
                    )}
                  />
                </button>
              )}
            </HeadlessSwitch>
            {isString(content) ? <Text size={size}>{content}</Text> : content}
          </div>
        </FormElement>
      )}
    />
  );
};

SwitchInner.displayName = "Switch"; // muss bleiben sonst kommt docgen storybook plugin durcheinander

const Switch = forwardRef(SwitchInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: SwitchProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLButtonElement>;
    }
) => ReturnType<typeof SwitchInner>;

export default typedMemo(Switch);
