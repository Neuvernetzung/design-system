import merge from "lodash/merge";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { create, useStore } from "zustand";

import { Form, FormProps } from "../../ui";

type UseFunnelFormOwnProps<TName extends string> = { name: TName };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const internalFunnelState = create<Record<string, any>>(() => ({}));

type FunnelProps<T extends FieldValues, TName extends string> = {
  state: Partial<T>;
  name: TName;
};

export const useFunnelForm = <
  T extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TName extends string = string
>({
  name,
  ...formProps
}: UseFormProps<T, TContext> & UseFunnelFormOwnProps<TName>) => {
  const funnelState = useStore(internalFunnelState)?.[name];

  const formMethods = useForm<T>({
    defaultValues: funnelState,
    ...formProps,
  });

  const funnel: FunnelProps<T, TName> = { state: funnelState, name };

  return { ...formMethods, funnel };
};

type FunnelformProps<T extends FieldValues, TName extends string> = {
  funnel: FunnelProps<T, TName>;
};

export const Funnelform = <
  T extends FieldValues,
  TName extends string = string
>({
  onSubmit,
  children,
  handleSubmit,
  funnel,
}: Omit<FormProps<T>, "onSubmit"> &
  Partial<Pick<FormProps<T>, "onSubmit">> &
  FunnelformProps<T, TName>) => {
  const funnelData = funnel.state;

  const internalOnSubmit = (data: T) => {
    if (
      funnel.name === "__proto__" ||
      funnel.name === "constructor" ||
      funnel.name === "prototype"
    ) {
      throw Error("Forbidden name!");
    }

    const newData = merge(funnelData?.[funnel.name], data);

    onSubmit?.(newData);
    internalFunnelState.setState(() => ({
      [funnel.name]: newData,
    }));
  };

  return (
    <Form handleSubmit={handleSubmit} onSubmit={internalOnSubmit}>
      {children}
    </Form>
  );
};
