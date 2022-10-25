import { Listbox } from "@headlessui/react";
import cn from "classnames";
import { memo, ReactNode, useState } from "react";
import { Controller } from "react-hook-form";

import { paddings, textColors, textSizes, transition } from "../../../styles";
import {
  getDropdownContainerStyles,
  getDropdownGroupHeaderStyles,
  getDropdownGroupStyles,
  getDropDownOptionsStyles,
  getInputStyles,
  inputSizes,
  inputVariants,
} from "../../../styles/groups";
import { InputVariants, Sizes } from "../../../types";
import { ChevronUpDownIcon, XMarkIcon } from "../../icons";
import { IconButton } from "../Button";
import { RequiredRule } from "../Form";
import { Text } from "../Typography";

export const sizes: Sizes = inputSizes;
export const variants: InputVariants = inputVariants;

type SelectProps = {
  formMethods: any;
  options: OptionProps[];
  size?: keyof Sizes;
  variant?: keyof InputVariants;
  name: string;
  disabled?: boolean;
  buttonClassName?: string;
  optionsClassName?: string;
  required?: RequiredRule;
  returned?: string;
  multiple?: boolean;
  defaultMessage?: string;
  noOptionsMessage?: string | ReactNode;
};

type OptionalOptionProps =
  | {
      children: string;
      options?: OptionProps[];
    }
  | { children: ReactNode; options: never };

type OptionProps = {
  value: any;
  disabled?: boolean;
} & OptionalOptionProps;

const iconButtonSizes: Sizes = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};

export const Select = ({
  formMethods,
  options = [],
  size = "md",
  variant = "outline",
  name,
  disabled = false,
  buttonClassName,
  optionsClassName,
  required,
  returned = "value",
  multiple,
  defaultMessage = "Auswählen...",
  noOptionsMessage = "Keine Optionen gefunden.",
}: SelectProps) => {
  const returnValue = (e: any) => {
    if (returned) return e?.[returned];
    return e;
  };

  const flattenOptions =
    options
      ?.map((option) => {
        if (!option.options) return option;
        return option.options;
      })
      .flat() ?? [];

  const [selected, setSelected] = useState(
    !multiple
      ? flattenOptions.find(
          (item) => returnValue(item) === formMethods.watch(name)
        )
      : formMethods
          .watch(name)
          ?.map((item: string) =>
            flattenOptions.find((i) => item === returnValue(i))
          )
          .filter((v: any) => v) || []
  );

  const handleOnChange = (e: any) => {
    if (!multiple) {
      setSelected(e);
      return e;
    }
    setSelected(e);
    return [...e.map((item: any) => item)];
  };

  const handleRemoveAll = () => {
    if (!multiple) {
      setSelected(null);
      return null;
    }

    setSelected([]);
    return [];
  };

  return (
    <Controller
      control={formMethods.control}
      name={name}
      rules={{
        required,
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Listbox
          value={selected}
          onChange={(e) => onChange(handleOnChange(e))}
          multiple={multiple}
        >
          <div className="relative">
            <Listbox.Button
              className={cn(
                getInputStyles({ size, variant, error: !!error, disabled }),
                "flex justify-between items-center",
                buttonClassName
              )}
              placeholder="test"
            >
              {!multiple
                ? selected
                  ? flattenOptions?.find(
                      (option) => returnValue(option) === selected
                    )?.children
                  : defaultMessage
                : selected.length > 0
                ? selected.map(
                    (value: OptionProps) =>
                      flattenOptions?.find(
                        (option) => returnValue(option) === value
                      )?.children
                  )
                : defaultMessage}
            </Listbox.Button>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex flex-row items-center">
              <IconButton
                size={iconButtonSizes[size]}
                variant="ghost"
                ariaLabel={`delete_select_${name}`}
                icon={XMarkIcon}
                className="pointer-events-auto"
                onClick={() => onChange(handleRemoveAll())}
              />
              <IconButton
                as="span"
                size={iconButtonSizes[size]}
                icon={ChevronUpDownIcon}
                variant="ghost"
                className={cn(
                  "pointer-events-none ui-open:rotate-180 flex max-h-6",
                  transition
                )}
              />
            </span>
            <Listbox.Options
              className={cn(
                getDropdownContainerStyles({ size }),
                optionsClassName
              )}
            >
              {options?.map(
                (
                  {
                    children,
                    value,
                    disabled,
                    options: _options,
                    ...props
                  }: OptionProps,
                  i
                ) => {
                  if (_options && _options.length !== 0)
                    return (
                      <div className={cn(getDropdownGroupStyles({ size }))}>
                        <Text
                          size="xs"
                          className={cn(getDropdownGroupHeaderStyles({ size }))}
                        >
                          {children}
                        </Text>
                        {_options?.map(
                          (
                            {
                              children: _children,
                              value: _value,
                              disabled: _disabled,
                              ..._props
                            }: OptionProps,
                            _i
                          ) => (
                            <Listbox.Option
                              key={`select_${name}_${value}_option_${_i}`}
                              disabled={_disabled}
                              value={returnValue({
                                value: _value,
                                props: _props,
                              })}
                              className={({ active }) =>
                                cn(getDropDownOptionsStyles({ size, active }))
                              }
                            >
                              {_children}
                            </Listbox.Option>
                          )
                        )}
                      </div>
                    );
                  if (_options?.length === 0) return null;
                  return (
                    <Listbox.Option
                      key={`select_${name}_option_${i}`}
                      disabled={disabled}
                      value={returnValue({ value, props })}
                      className={({ active }) =>
                        cn(getDropDownOptionsStyles({ size, active }))
                      }
                    >
                      {children}
                    </Listbox.Option>
                  );
                }
              )}
              {!options ||
                (options.length === 0 && (
                  <NoOptionsFound size={size} message={noOptionsMessage} />
                ))}
            </Listbox.Options>
          </div>
        </Listbox>
      )}
    />
  );
};

export default memo(Select);

Select.defaultProps = {
  size: "md",
  variant: "outline",
  buttonClassName: undefined,
  optionsClassName: undefined,
  required: false,
  returned: "value",
  multiple: false,
  defaultMessage: "Auswählen...",
  noOptionsMessage: "Keine Optionen gefunden.",
};

type NoOptionsProps = {
  size: keyof Sizes;
  message: string | ReactNode;
};

const NoOptionsFound = ({ size, message }: NoOptionsProps) => (
  <div
    className={cn(
      paddings[size],
      textSizes[size],
      textColors.accent,
      "flex items-center justify-center"
    )}
  >
    {message}
  </div>
);
