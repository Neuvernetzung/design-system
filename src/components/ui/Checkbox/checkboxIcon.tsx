import { IconCheck, IconMinus } from "@tabler/icons-react";
import type { Size, SvgType } from "../../../types";
import { Icon } from "../Icon";
import cn from "classnames";
import { checkboxAnimation, transition } from "../../../styles";

type CheckboxIconProps = {
  size?: Size;
  checked: boolean;
  icon?: SvgType;
  indeterminate?: boolean;
};

export const CheckboxIcon = ({
  size,
  checked,
  icon,
  indeterminate,
}: CheckboxIconProps) => (
  <div
    data-state={
      checked ? "checked" : indeterminate ? "indeterminate" : "unchecked"
    }
    className={cn(
      "group flex h-full items-center justify-center will-change-transform",
      transition
    )}
  >
    {checked ? (
      <Icon size={size} icon={icon ?? CheckboxIconCheck} />
    ) : indeterminate ? (
      <Icon
        className={cn(checkboxAnimation)}
        size={size}
        icon={CheckboxIconMinus}
      />
    ) : null}
  </div>
);

const CheckboxIconCheck = () => (
  <IconCheck className={cn(checkboxAnimation)} style={animationStyle} />
);

const CheckboxIconMinus = () => (
  <IconMinus className={cn(checkboxAnimation)} style={animationStyle} />
);

const animationStyle = {
  fill: "none",
  strokeWidth: 3,
  stroke: "currentColor",
  strokeDasharray: "100%",
};
