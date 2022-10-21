import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import get from "lodash/get";
import { FC, ReactNode } from "react";

type FormProps = {
  formMethods: any;
  label?: any;
  helper?: any;
  name: string;
  children: ReactNode;
};

export type RequiredProps =
  | {
      value: boolean;
      message?: string;
    }
  | boolean;

export const FormElement: FC<FormProps> = ({
  formMethods,
  label = null,
  helper = null,
  name,
  children,
}: FormProps) => {
  const error = get(formMethods?.formState.errors, name);

  return (
    <FormControl id={name} isInvalid={error}>
      {label && <FormLabel fontSize="s">{label}</FormLabel>}
      {children}
      {helper && <FormHelperText fontSize="xs">{helper}</FormHelperText>}
      {error && (
        <FormErrorMessage textColor="red.500">
          {error?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

FormElement.defaultProps = {
  label: null,
  helper: null,
};
