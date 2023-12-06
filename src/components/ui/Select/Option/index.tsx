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

export type SelectOptionValueProps = {
  type?: "value";
  value: string;
  disabled?: boolean;
  children: ReactElement | string;
  index?: number;
};

export type SelectOptionGroupProps = {
  type: "group";
  label: ReactElement | string;
  options: SelectOptionProps[];
};

export type SelectOptionProps = SelectOptionValueProps | SelectOptionGroupProps;

export type CheckedType = "default" | "hide";

export type SelectOptionComponentBaseProps = {
  size: Size;
  getItemProps: (
    options: UseSelectGetItemPropsOptions<SelectOptionValueProps>
  ) => UseSelectGetItemPropsReturnValue;
  isSelected: (value: string) => boolean;
  highlightedIndex: number | undefined;
  checkedType?: CheckedType;
};

export type SelectOptionComponentProps = SelectOptionProps &
  SelectOptionComponentBaseProps;

export const SelectOption = (props: SelectOptionComponentProps) => {
  const { type } = props;

  if (type === "group") return <SelectOptionGroup {...props} />;

  return <SelectOptionValue {...props} />;
};

export const SelectOptionValue = ({
  disabled,
  value,
  children,
  size,
  getItemProps,
  index,
  highlightedIndex,
  isSelected,
  checkedType = "default",
}: SelectOptionValueProps & SelectOptionComponentBaseProps) => {
  const selected = isSelected(value);

  if (checkedType === "hide" && selected) return null;

  const itemProps = getItemProps({ item: { value, children }, index });

  return (
    <Button
      disabled={disabled}
      asChild
      variant={index === highlightedIndex ? "subtile" : "ghost"}
      className={cn("justify-between font-normal")}
      size={size}
      rightIcon={checkedType === "default" && selected ? IconCheck : undefined}
      {...(!disabled ? itemProps : {})}
    >
      <li>{children}</li>
    </Button>
  );
};

export const SelectOptionGroup = ({
  label,
  options,
  size,
  type,
  ...rest
}: SelectOptionGroupProps & SelectOptionComponentBaseProps) => (
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
