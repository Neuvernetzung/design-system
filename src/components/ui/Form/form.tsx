import cn from "classnames";
import { FC, memo, ReactNode } from "react";

export type FormProps = {
  formMethods: any;
  onSubmit: Function;
  className?: string;
  children: ReactNode;
};

export const Form: FC<FormProps> = ({
  formMethods,
  onSubmit,
  className,
  ...props
}) => {
  const { handleSubmit } = formMethods;

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    />
  );
};

Form.defaultProps = {
  className: "",
};

export default memo(Form);
