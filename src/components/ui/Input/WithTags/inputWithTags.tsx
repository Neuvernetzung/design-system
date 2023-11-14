import { cn } from "@/utils/cn";
import isArray from "lodash/isArray";
import { ForwardedRef, forwardRef, HTMLAttributes, useState } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import { extendedBgColors, gaps, paddingsEvenly, roundings } from "@/styles";
import { getInputStyles } from "@/styles/groups";
import { IconX, IconPlus } from "@tabler/icons-react";
import type { InputVariant, Size } from "@/types";
import { capSize } from "@/utils";
import { mergeRefs } from "@/utils/internal";
import { Button, ButtonGroup, IconButton } from "../../Button";
import { FormElement, RequiredRule } from "../../Form";
import { Text } from "../../Typography";
import { InputAddon } from "../InputAddon";
import { requiredInputRule } from "@/utils/internal/inputRule";
import { useRouter } from "next/router";
import type { Locale } from "@/locales/getText";

export type InputWithTagsProps = HTMLAttributes<HTMLInputElement> & {
  required?: RequiredRule;
  type?: "text" | "number" | "password" | "url";
  disabled?: boolean;
  label?: string;
  helper?: string;
  size?: Size;
  className?: string;
  containerClassName?: string;
  variant?: InputVariant;
  inputClassName?: string;
  step?: number;
  notFoundText?: string;
};

export const InputWithTagsInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    control,
    name,
    type,
    required,
    disabled = false,
    label,
    helper,
    size = "md",
    variant = "outline",
    className,
    containerClassName,
    inputClassName,
    step,
    notFoundText,
    ...props
  }: InputWithTagsProps & UseControllerProps<TFieldValues, TName>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [inputState, setInputState] = useState<string>();

  const handleAddTag = (values?: string[]) => {
    const newValue = inputState;
    if (!newValue) return values;
    if (values?.includes(inputState)) return values;
    setInputState("");
    if (!isArray(values)) return [newValue];
    return [...values, newValue];
  };

  const handleDeleteTag = (value: string, values?: string[]) => {
    if (!isArray(values)) return [];
    const newValues = values.filter((v) => v !== value);
    return newValues;
  };

  const locale = useRouter().locale as Locale;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
      }}
      render={({
        field: { value: values, onChange, ref: controlleRef },
        fieldState: { error },
      }) => (
        <FormElement
          required={required}
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
          className={className}
        >
          <div className={cn("flex flex-col", gaps.sm)}>
            <div className={cn("flex flex-row relative", containerClassName)}>
              <input
                type={type}
                id={name}
                ref={mergeRefs([ref, controlleRef])}
                value={inputState}
                onChange={(e) => setInputState(e.target.value)}
                onWheel={(e: any) =>
                  e.target?.type === "number" && e.target?.blur()
                } // damit beim scrollen die zahl nicht versehentlich verändert wird
                className={cn(
                  getInputStyles({
                    size,
                    variant,
                    error: !!error,
                    disabled,
                    rightAddon: true,
                  }),
                  inputClassName
                )}
                step={step}
                disabled={disabled}
                {...props}
              />

              <InputAddon
                size={size}
                variant={variant}
                isRight
                className="!p-0"
              >
                <IconButton
                  ariaLabel="add-tag"
                  size={size}
                  icon={IconPlus}
                  variant="ghost"
                  disabled={disabled}
                  onClick={() => onChange(handleAddTag(values))}
                />
              </InputAddon>
            </div>
            {values && isArray(values) && values.length > 0 ? (
              <div
                className={cn(
                  "flex flex-row flex-wrap",
                  gaps[size],
                  extendedBgColors.filledSubtile,
                  paddingsEvenly[size],
                  roundings[size]
                )}
              >
                {values.map((v: string) => (
                  <ButtonGroup key={`button_tag_${v}`} className="truncate">
                    <Button
                      size={capSize(size, "sm")}
                      color={v === inputState ? "danger" : "accent"}
                      className="pointer-events-none"
                      disabled={disabled}
                    >
                      {v}
                    </Button>
                    <IconButton
                      ariaLabel="delete_tag"
                      size={capSize(size, "sm")}
                      color={v === inputState ? "danger" : "accent"}
                      disabled={disabled}
                      icon={IconX}
                      onClick={() => onChange(handleDeleteTag(v, values))}
                    />
                  </ButtonGroup>
                ))}
              </div>
            ) : (
              notFoundText && (
                <Text size={capSize(size, "sm")}>{notFoundText}</Text>
              )
            )}
          </div>
        </FormElement>
      )}
    />
  );
};

export const InputWithTags = forwardRef(InputWithTagsInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: InputWithTagsProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLInputElement>;
    }
) => ReturnType<typeof InputWithTagsInner>;
