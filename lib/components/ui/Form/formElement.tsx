import { Text } from "../Typography";
import { FC, ReactNode, memo } from "react";
import cn from "classnames";
import type { Sizes } from "../../../types";
import { textColors } from "../../../styles";
import { sizes as textSizes } from "../Typography/Text/text";

export type FormElementProps = {
  error: any;
  label?: any;
  helper?: any;
  name: string;
  size?: keyof Sizes;
  children: ReactNode;
  className?: string;
};

export type RequiredProps =
  | {
      value: boolean;
      message?: string;
    }
  | boolean;

export const labelSizes: Sizes = {
  xs: textSizes.xs,
  sm: textSizes.xs,
  md: textSizes.sm,
  lg: textSizes.md,
  xl: textSizes.md,
};

export const FormElement: FC<FormElementProps> = ({
  error,
  label = null,
  helper = null,
  name,
  size = "md",
  children,
  className,
}: FormElementProps) => {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {label && (
        <label
          className={cn(textColors.accent, labelSizes[size])}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <Text size="xs" color="danger">
          {error?.message}
        </Text>
      )}
      {helper && <Text size="xs">{helper}</Text>}
    </div>
  );
};

FormElement.defaultProps = {
  label: null,
  helper: null,
  size: "md",
  className: undefined,
};

export default memo(FormElement);
