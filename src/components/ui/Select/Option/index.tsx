import { IconCheck } from "@tabler/icons-react";
import type {
  UseSelectGetItemPropsOptions,
  UseSelectGetItemPropsReturnValue,
} from "downshift";
import type { ReactElement } from "react";

import { getDropdownGroupHeaderStyles } from "@/styles/groups";
import type { Size } from "@/types";
import { cn } from "@/utils/cn";

import { Button } from "../../Button";
import { Text } from "../../Typography/Text";
import type { SelectValue } from "../select";
import { CheckboxRaw } from "../../Checkbox";
import { HorizontalRule } from "../../HorizontalRule";
import { marginsYSmall } from "@/styles";

export type SelectOptionValueProps<TValue extends SelectValue = SelectValue> = {
  type?: "value";
  value: TValue;
  disabled?: boolean;
  children: ReactElement | string;
  index?: number;
};

export type SelectOptionGroupProps<TValue extends SelectValue = SelectValue> = {
  type: "group";
  label: ReactElement | string;
  options: SelectOptionProps<TValue>[];
};

export type SelectOptionSeparatorProps = {
  type: "separator";
};

export type SelectOptionProps<TValue extends SelectValue = SelectValue> =
  | SelectOptionValueProps<TValue>
  | SelectOptionGroupProps<TValue>
  | SelectOptionSeparatorProps;

export const checkedTypes = ["default", "hidden", "checkbox"] as const;

export type CheckedTypes = typeof checkedTypes;

export type CheckedType = CheckedTypes[number];

export type SelectOptionComponentBaseProps<
  TValue extends SelectValue = SelectValue
> = {
  size: Size;
  getItemProps: (
    options: UseSelectGetItemPropsOptions<SelectOptionValueProps<TValue>>
  ) => UseSelectGetItemPropsReturnValue;
  isSelected: (value: TValue) => boolean;
  highlightedIndex: number | undefined;
  checkedType?: CheckedType;
  groupIndex: number;
  optionsCount: number;
  beforeOption: SelectOptionProps<TValue> | undefined;
};

export type SelectOptionComponentProps<
  TValue extends SelectValue = SelectValue
> = SelectOptionProps<TValue> & SelectOptionComponentBaseProps<TValue>;

export const SelectOption = <TValue extends SelectValue = SelectValue>(
  props: SelectOptionComponentProps<TValue>
) => {
  const { type } = props;

  if (type === "group") return <SelectOptionGroup {...props} />;

  if (type === "separator") return <SelectOptionSeparator {...props} />;

  return <SelectOptionValue {...props} />;
};

export const SelectOptionValue = <TValue extends SelectValue = SelectValue>({
  disabled,
  value,
  children,
  size,
  getItemProps,
  index,
  highlightedIndex,
  isSelected,
  checkedType = "default",
}: SelectOptionValueProps<TValue> & SelectOptionComponentBaseProps<TValue>) => {
  const selected = isSelected(value);

  if (checkedType === "hidden" && selected) return null;

  const itemProps = getItemProps({ item: { value, children }, index });

  return (
    <Button
      disabled={disabled}
      asChild
      variant={index === highlightedIndex ? "subtile" : "ghost"}
      className={cn(
        "font-normal",
        checkedType === "checkbox" ? "justify-start" : "justify-between"
      )}
      size={size}
      rightIcon={checkedType === "default" && selected ? IconCheck : undefined}
      {...(!disabled ? itemProps : {})}
    >
      <li>
        {checkedType === "checkbox" && (
          <CheckboxRaw checked={selected} setChecked={() => {}} />
        )}
        {children}
      </li>
    </Button>
  );
};

export const SelectOptionSeparator = <
  TValue extends SelectValue = SelectValue
>({
  size,
  groupIndex,
  optionsCount,
  beforeOption,
}: SelectOptionSeparatorProps & SelectOptionComponentBaseProps<TValue>) => {
  if (groupIndex === 0) return null;
  if (groupIndex === optionsCount - 1) return null;
  if (beforeOption?.type === "separator") return null;

  return <HorizontalRule className={cn(marginsYSmall[size])} />;
};

export const SelectOptionGroup = <TValue extends SelectValue = SelectValue>({
  label,
  options,
  size,
  type,
  ...rest
}: SelectOptionGroupProps<TValue> & SelectOptionComponentBaseProps<TValue>) => (
  <li>
    <Text size="xs" className={cn(getDropdownGroupHeaderStyles({ size }))}>
      {label}
    </Text>
    <ul className="flex flex-col">
      {(options || []).map((props, i) => (
        <SelectOption
          key={`${type}_${label}_nested_option_${i}`}
          {...props}
          {...rest}
          size={size}
          groupIndex={i}
          optionsCount={options.length}
          beforeOption={options[i - 1]}
        />
      ))}
    </ul>
  </li>
);
