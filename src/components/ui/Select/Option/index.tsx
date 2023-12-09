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

export type SelectOptionProps<TValue extends SelectValue = SelectValue> =
  | SelectOptionValueProps<TValue>
  | SelectOptionGroupProps<TValue>;

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
};

export type SelectOptionComponentProps<
  TValue extends SelectValue = SelectValue
> = SelectOptionProps<TValue> & SelectOptionComponentBaseProps<TValue>;

export const SelectOption = <TValue extends SelectValue = SelectValue>(
  props: SelectOptionComponentProps<TValue>
) => {
  const { type } = props;

  if (type === "group") return <SelectOptionGroup {...props} />;

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
          key={`${type}_${label}_option_${i}`}
          {...props}
          {...rest}
          size={size}
        />
      ))}
    </ul>
  </li>
);
