import { forwardRef, useRef } from "react";
import type { Ref } from "react";
import { type InputProps, RawInput } from "../input";
import { FormElement } from "../../Form";
import { mergeRefs } from "../../../../utils/internal";
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { Locale } from "../../../../locales/getText";
import {
  maxInputRule,
  minInputRule,
  patternInputRule,
  requiredInputRule,
  validationInputResult,
} from "../../../../utils/internal/inputRule";
import { Button, ButtonGroup } from "../../Button";
import { smallerSize } from "../../../../utils";
import { cn } from "@/utils";
import {
  decrement,
  increment,
  snapToStep,
  valueOf,
} from "../../../../utils/internal/number/decimal";

export type InputNumberProps = Omit<
  InputProps,
  "maxLength" | "minLength" | "type" | "rightAddon" | "leftAddon"
>;

export const InputNumber = forwardRef(
  <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(
    {
      name,
      label,
      helper,
      size = "md",
      leftElement,
      rightElement,
      control,
      required = false,
      max,
      min,
      pattern,
      disabled = false,
      variant = "outline",
      step = 1,
      className,
      containerClassName,
      inputClassName,
      ...props
    }: InputNumberProps & UseControllerProps<TFieldValues, TName>,
    ref: Ref<HTMLInputElement>
  ) => {
    const locale = useRouter().locale as Locale;

    const numberInputRef = useRef<HTMLInputElement>();

    return (
      <Controller
        control={control}
        name={name}
        rules={{
          required: requiredInputRule(required, locale),
          max: maxInputRule(max, locale),
          min: minInputRule(min, locale),
          pattern: patternInputRule(pattern, locale),
          validate: (value) => {
            if (step)
              return validationInputResult(
                valueOf(value) === Number(snapToStep(value, step)),
                `Die nötige Abstufung ist ${step}`
              );
            return true;
          },
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
            className={className}
          >
            <RawInput
              type="number"
              containerClassName={containerClassName}
              size={size}
              variant={variant}
              leftElement={leftElement}
              id={name}
              ref={mergeRefs([ref, numberInputRef, controllerRef])}
              value={value}
              onChange={onChange}
              error={!!error}
              disabled={disabled}
              rightAddon={{
                className: "!p-0",
                children: (
                  <ButtonGroup
                    direction={
                      size === "xs" || size === "sm" ? "horizontal" : "vertical"
                    }
                    reverse={size === "xs" || size === "sm"}
                    className={cn(
                      "w-full h-full justify-stretch items-stretch"
                    )}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => {
                        console.log(typeof value);
                        onChange(
                          value !== undefined
                            ? valueOf(snapToStep(increment(value, step), step))
                            : 0
                        );
                      }}
                      className={cn(
                        "min-h-0 h-full !py-0",
                        variant !== "ghost" && "rounded-l-none"
                      )}
                      size={smallerSize(size)}
                    >
                      +
                    </Button>
                    <Button
                      onClick={() => {
                        onChange(
                          value !== undefined
                            ? valueOf(snapToStep(decrement(value, step), step))
                            : 0
                        );
                      }}
                      variant="ghost"
                      className={cn(
                        "min-h-0 h-full !py-0",
                        variant !== "ghost" && "rounded-l-none"
                      )}
                      size={smallerSize(size)}
                    >
                      -
                    </Button>
                  </ButtonGroup>
                ),
              }}
              inputClassName={inputClassName}
              rightElement={rightElement}
              step={step}
              {...props}
            />
          </FormElement>
        )}
      />
    );
  }
);
