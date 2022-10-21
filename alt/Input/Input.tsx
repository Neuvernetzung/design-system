import {
  Input as ChakraInput,
  InputAddonProps,
  InputElementProps,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputProps,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";

import { FormElement, RequiredProps } from "../Form";

interface InputGroupProps extends InputProps {
  name: string;
  label?: any;
  helper?: any;
  leftAddon?: InputAddonProps;
  rightAddon?: InputAddonProps;
  leftElement?: InputElementProps;
  rightElement?: InputElementProps;
  formMethods: any;
  required?: RequiredProps;
}

export const Input = ({
  name,
  label,
  helper,
  size,
  leftAddon,
  rightAddon,
  leftElement,
  rightElement,
  formMethods,
  required,
  variant,
  ...props
}: InputGroupProps) => {
  const { register } = formMethods;

  const defaultStyles = {
    focusBorderColor: "primary.500",
    errorBorderColor: "red.500",
  };

  return (
    <FormElement
      formMethods={formMethods}
      name={name}
      label={label}
      helper={helper}
    >
      <InputGroup size={size} variant={variant}>
        {leftAddon && <InputLeftAddon {...defaultStyles} {...leftAddon} />}
        {leftElement && (
          <InputLeftElement {...defaultStyles} {...leftElement} />
        )}
        <ChakraInput
          size={size}
          {...defaultStyles}
          {...register(name, {
            required,
          })}
          {...props}
        />
        {rightAddon && <InputRightAddon {...defaultStyles} {...rightAddon} />}
        {rightElement && (
          <InputRightElement {...defaultStyles} {...rightElement} />
        )}
      </InputGroup>
    </FormElement>
  );
};

Input.defaultProps = {
  label: null,
  helper: null,
  leftAddon: null,
  rightAddon: null,
  leftElement: null,
  rightElement: null,
  required: { value: false },
};
