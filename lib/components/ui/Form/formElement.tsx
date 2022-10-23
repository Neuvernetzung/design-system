import { Text } from "../Typography";
import get from "lodash/get";
import { FC, ReactNode, memo } from "react";
import cn from "classnames";

export type FormElementProps = {
  formMethods: any;
  label?: any;
  helper?: any;
  name: string;
  children: ReactNode;
  className?: string;
};

export type RequiredProps =
  | {
      value: boolean;
      message?: string;
    }
  | boolean;

export const FormElement: FC<FormElementProps> = ({
  formMethods,
  label = null,
  helper = null,
  name,
  children,
  className,
}: FormElementProps) => {
  const error = get(formMethods?.formState.errors, name);

  return (
    <div id={name} className={cn("flex flex-col gap-1", className)}>
      {label && (
        <Text size="sm" as="label">
          {label}
        </Text>
      )}
      {children}
      {helper && <Text size="xs">{helper}</Text>}
      {error && (
        <Text size="sm" color="danger">
          {error?.message}
        </Text>
      )}
    </div>
  );
};

FormElement.defaultProps = {
  label: null,
  helper: null,
  className: undefined,
};

export default memo(FormElement);
