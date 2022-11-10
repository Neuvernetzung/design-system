import { Switch as HeadlessSwitch } from "@headlessui/react";
import cn from "classnames";
import isString from "lodash/isString";
import { ForwardedRef, forwardRef, Fragment, memo, ReactNode } from "react";
import { Controller } from "react-hook-form";

import {
  bgColors,
  extendedBgColors,
  focus,
  gaps,
  heightsSmall,
  transition,
} from "../../../styles";
import { Colors, Sizes } from "../../../types";
import type { RequiredRule } from "../Form";
import { FormElement } from "../Form";
import { Text } from "../Typography";

export const sizes: Sizes = heightsSmall;
export const colors: (keyof Omit<Colors, "accent">)[] = [
  "primary",
  "success",
  "warn",
  "danger",
];

export type SwitchProps = {
  formMethods: any;
  name: string;
  label?: string;
  helper?: string;
  size?: keyof Sizes;
  color?: keyof Omit<Colors, "accent">;
  required?: RequiredRule;
  content?: ReactNode;
  reverse?: boolean;
  disabled?: boolean;
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      formMethods,
      name,
      required,
      label,
      helper,
      size = "md",
      color = "primary",
      content,
      reverse = false,
      disabled = false,
    },
    ref: ForwardedRef<Element>
  ) => (
    <Controller
      control={formMethods.control}
      name={name}
      rules={{
        required,
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <FormElement
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
            <HeadlessSwitch as={Fragment} onChange={onChange}>
              {({ checked }) => (
                <button
                  ref={ref}
                  disabled={disabled}
                  type="button"
                  aria-label={name}
                  className={cn(
                    checked ? bgColors[color] : extendedBgColors.filled,
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
  )
);

Switch.displayName = "Switch";

Switch.defaultProps = {
  size: "md",
  color: "primary",
  required: false,
  label: undefined,
  helper: undefined,
  content: undefined,
  reverse: false,
  disabled: false,
};

export default memo(Switch);
