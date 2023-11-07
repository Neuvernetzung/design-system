import { IconCheck, IconMinus } from "@tabler/icons-react";
import type { Size, SvgType } from "../../../types";
import { Icon } from "../Icon";
import cn from "classnames";
import { checkboxAnimation, transition } from "../../../styles";

type CheckboxIconProps = {
  size?: Size;
  isChecked: boolean;
  icon?: SvgType;
  isIndeterminate?: boolean;
};

export const CheckboxIcon = ({
  size,
  isChecked,
  icon,
  isIndeterminate,
}: CheckboxIconProps) => (
  <div
    data-state={
      isChecked ? "checked" : isIndeterminate ? "indeterminate" : "unchecked"
    }
    className={cn(
      "group flex h-full items-center justify-center will-change-transform",
      transition
    )}
  >
    {isChecked ? (
      <Icon size={size} icon={icon ?? CheckboxIconCheck} />
    ) : (
      isIndeterminate && (
        <Icon
          className={cn(checkboxAnimation)}
          size={size}
          icon={CheckboxIconMinus}
        />
      )
    )}
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
