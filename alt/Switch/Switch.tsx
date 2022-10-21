import {
  FormLabel,
  Switch as ChakraSwitch,
  SwitchProps,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

import { Stack } from "../Containers";
import { FormElement } from "../Form";

interface ExtendedSwitchProps extends SwitchProps {
  name: string;
  label?: any;
  helper?: any;
  formMethods: any;
  required?: LimitedRequire;
}

type LimitedRequire =
  | {
      value: boolean;
      message: string;
    }
  | undefined;

export const Switch = ({
  formMethods,
  name,
  label,
  helper,
  required,
  ...props
}: ExtendedSwitchProps) => {
  const { control } = formMethods;

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { ref, ...rest }, fieldState: { error } }) => (
        <FormElement formMethods={formMethods} name={name} helper={helper}>
          <Stack direction="row-reverse" justifyContent="start" align="center">
            <FormLabel mb="0" fontSize="s">
              {label}
            </FormLabel>
            <ChakraSwitch {...props} {...rest} colorScheme="primary" />
          </Stack>
        </FormElement>
      )}
    />
  );
};

Switch.defaultProps = {
  label: null,
  helper: null,
  required: null,
};
