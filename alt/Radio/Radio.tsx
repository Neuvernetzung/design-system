import { Radio as ChakraRadio, RadioGroup, RadioProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

import { type StackProps, Stack } from "../Containers";
import { FormElement } from "../Form";

interface RadioGroupProps extends RadioProps {
  name: string;
  label?: any;
  helper?: any;
  formMethods: any;
  required?: any;
  options: OptionType[];
  containerProps?: StackProps;
}

type OptionType = {
  children: ReactNode | string;
  value: any;
  isDisabled?: boolean;
};

export const Radio = ({
  formMethods,
  name,
  label,
  helper,
  required,
  options = [],
  containerProps,
  ...props
}: RadioGroupProps) => {
  const { control } = formMethods;

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { ref, ...rest } }) => (
        <FormElement
          formMethods={formMethods}
          name={name}
          label={label}
          helper={helper}
        >
          {options.length === 1 ? (
            options.map((option, i) => (
              <ChakraRadio
                key={`option_${i}`}
                colorScheme="primary"
                {...rest}
                {...props}
                {...option}
              />
            ))
          ) : (
            <RadioGroup {...rest}>
              <Stack direction="row" {...containerProps}>
                {options.map((option, i) => (
                  <ChakraRadio
                    key={`option_${i}`}
                    colorScheme="primary"
                    {...props}
                    {...option}
                  />
                ))}
              </Stack>
            </RadioGroup>
          )}
        </FormElement>
      )}
    />
  );
};

Radio.defaultProps = {
  label: null,
  helper: null,
  required: null,
  containerProps: undefined,
};
