import { FC, ReactElement, ReactNode } from "react";

type Props = {
  formMethods: any;
  onSubmit: Function;
  className?: string;
  children: ReactNode;
};

export const Form: FC<Props> = ({
  formMethods,
  onSubmit,
  className,
  ...props
}) => {
  const { handleSubmit } = formMethods;

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)} {...props} />
  );
};

Form.defaultProps = {
  className: "",
};
