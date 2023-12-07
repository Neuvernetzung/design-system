import { cn } from "@/utils";
import { BaseSyntheticEvent, ReactNode } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export type FormProps<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  children: ReactNode;
  isNestedForm?: boolean;
};

export const Form = <T extends FieldValues>({
  handleSubmit,
  onSubmit,
  className,
  isNestedForm,
  ...props
}: FormProps<T>) => (
  <form
    className={cn(className)}
    onSubmit={(e: BaseSyntheticEvent) => {
      if (!isNestedForm) return handleSubmit(onSubmit)(e);

      if (e) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
      }
      return handleSubmit(onSubmit)(e);
    }}
    {...props}
  />
);
