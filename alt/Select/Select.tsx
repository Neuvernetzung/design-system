import {
  GroupBase,
  OptionBase,
  Select as ChakraSelect,
} from "chakra-react-select";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { FormElement } from "../Form";

interface SelectGroupProps {
  formMethods: any;
  name: string;
  required?: any;
  label?: any;
  helper?: any;
  placeholder?: string | null;
  options: Array<SelectOption>;
  isMulti?: true | undefined;
  size?: "sm" | "md" | "lg";
  noOptionsText?: string;
  returned?: string;
}

interface SelectOption extends OptionBase {
  label: string;
  value: any;
}

export const Select = ({
  formMethods,
  name,
  placeholder = null,
  options,
  required,
  label,
  helper,
  isMulti = undefined,
  size,
  noOptionsText,
  returned,
  ...props
}: SelectGroupProps) => {
  const { control } = formMethods;

  const returnValue = (e: any) => {
    if (returned) return e?.[returned];
    return e;
  };

  const [selected, setSelected] = useState(
    !isMulti
      ? options.find((item) => returnValue(item) === formMethods.watch(name))
      : formMethods
          .watch(name)
          ?.map((item: any) => options.find((i) => item === returnValue(i)))
          .filter((v: any) => v) || []
  );

  const select = (e: any) => {
    setSelected(e);
    return returnValue(e);
  };

  const multiChangeHandler = (e: any) => {
    setSelected(e);
    return [...e.map((item: any) => returnValue(item))];
  };

  const chakraStyles = {
    dropdownIndicator: (prev: any, { selectProps: { menuIsOpen } }: any) => ({
      ...prev,
      "> svg": {
        transitionDuration: "normal",
        transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
      },
      cursor: "pointer",
    }),
    input: (provided: any) => ({
      ...provided,
      padding: "0px",
      margin: "0px",
      boxShadow: "0 0 !important",
    }),
    menu: (provided: any) => ({
      ...provided,
      shadow: "md",
      rounded: "lg",
    }),
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <FormElement
          name={name}
          formMethods={formMethods}
          label={label}
          helper={helper}
        >
          <ChakraSelect<SelectOption, true, GroupBase<SelectOption>>
            chakraStyles={chakraStyles}
            value={selected}
            focusBorderColor="primary.500"
            errorBorderColor="red.500"
            size={size}
            colorScheme="gray"
            {...(isMulti && { isMulti: true })}
            placeholder={placeholder}
            options={options}
            onChange={
              !isMulti
                ? (e) => onChange(select(e))
                : (e) => onChange(multiChangeHandler(e))
            }
            selectedOptionStyle="check"
            onBlur={onBlur}
            ref={ref}
            closeMenuOnSelect={!isMulti}
            isInvalid={!!error}
            noOptionsMessage={({ inputValue }) =>
              noOptionsText ||
              (!inputValue
                ? "Keine Ergebnisse gefunden."
                : `Keine Ergebnisse gefunden für '${inputValue}'.`)
            }
            {...props}
          />
        </FormElement>
      )}
    />
  );
};

Select.defaultProps = {
  required: false,
  label: null,
  helper: null,
  placeholder: null,
  isMulti: undefined,
  size: "md",
  noOptionsText: null,
  returned: null,
};
