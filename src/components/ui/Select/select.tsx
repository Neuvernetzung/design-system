import { Listbox } from "@headlessui/react";
import cn from "classnames";
import isArray from "lodash/isArray";
import isEqual from "lodash/isEqual";
import {
  createRef,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  memo,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Controller } from "react-hook-form";
import { usePopper } from "react-popper";
import type { Placement } from "@popperjs/core";

import {
  divides,
  gapsSmall,
  marginsXSmall,
  paddings,
  textColors,
  textSizes,
  transition,
} from "../../../styles";
import {
  getDropdownContainerStyles,
  getDropdownGroupHeaderStyles,
  getDropdownGroupStyles,
  getDropDownOptionsStyles,
  getInputStyles,
  inputSizes,
  inputVariants,
} from "../../../styles/groups";
import { CheckIcon, ChevronUpDownIcon, CrossIcon } from "../../../theme/icons";
import { InputVariants, Sizes } from "../../../types";
import { capSize } from "../../../utils";
import { mergeRefs } from "../../../utils/internal/mergeRefs";
import { Button, ButtonGroup, IconButton } from "../Button";
import { FormElement, RequiredRule } from "../Form";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export const sizes: Sizes = inputSizes;
export const variants: InputVariants = inputVariants;

export type SelectProps = {
  formMethods: any;
  options: SelectOptionProps[];
  size?: keyof Sizes;
  variant?: keyof InputVariants;
  name: string;
  disabled?: boolean;
  buttonClassName?: string;
  optionsClassName?: string;
  required?: RequiredRule;
  returned?: string;
  multiple?: boolean;
  defaultMessage?: string;
  noOptionsMessage?: string | ReactNode;
  removeAll?: boolean;
  multipleStyle?: "tags" | "indicator";
  hideActive?: boolean;
  label?: string;
  helper?: string;
  placement?: Placement;
};

type OptionalSelectOptionProps =
  | {
      children: string;
      options?: SelectOptionProps[];
    }
  | { children: ReactNode; options: never };

export type SelectOptionProps = {
  value: any;
  disabled?: boolean;
} & OptionalSelectOptionProps;

const iconButtonSizes: Sizes = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      formMethods,
      options = [],
      size = "md",
      variant = "outline",
      name,
      disabled = false,
      buttonClassName,
      optionsClassName,
      required,
      returned = "value",
      multiple,
      defaultMessage = "Auswählen...",
      noOptionsMessage = "Keine Optionen gefunden.",
      removeAll = true,
      hideActive = false,
      multipleStyle = "tags",
      label,
      helper,
      placement = "bottom",
    }: SelectProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [referenceElement, setReferenceElement] =
      useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(
      null
    );
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement,
    });

    const formValue = formMethods.watch(name);

    const returnValue = (e: any) => {
      if (returned) return e?.[returned];
      return e;
    };

    const flattenOptions =
      options
        ?.map((option) => {
          if (!option.options) return option;
          return option.options;
        })
        .flat() ?? [];

    const [selected, setSelected] = useState(
      !multiple
        ? flattenOptions.find((item) => returnValue(item) === formValue)
        : formValue
            ?.map((item: string) =>
              flattenOptions.find((i) => item === returnValue(i))
            )
            .filter((v: any) => v) || []
    );

    useEffect(() => {
      if (isEqual(formValue, selected)) return;
      if (multiple && !isArray(formValue)) return;
      setSelected(formValue);
    }, [formValue]);

    const handleOnChange = (e: any) => {
      if (!multiple) {
        setSelected(e);
        return e;
      }
      setSelected(e);
      return [...e.map((item: any) => item)];
    };

    const handleRemove = (i: number) => {
      if (multiple) {
        const newArray = [...selected];
        newArray.splice(i, 1);
        setSelected(newArray);
        removeButtonRefs.splice(i, 1); // Ref entfernen
        const dataArray = formMethods.getValues(name);
        dataArray.splice(i, 1);
        return dataArray;
      }
    };

    const handleRemoveAll = () => {
      if (!multiple) {
        setSelected(null);
        return null;
      }

      setSelected([]);
      return [];
    };

    interface Focusable extends HTMLButtonElement {
      focus(): void;
    }

    const buttonRef = useRef<Focusable>(null);
    const removeButtonRefs: any =
      isArray(selected) &&
      selected?.map((value: any) => ({
        id: value,
        ref: createRef(),
      }));

    const handleLeftAndRightArrow = (e: KeyboardEvent, index?: number) => {
      if (!multiple) return;
      let _index = index !== undefined ? index : removeButtonRefs.length - 1;

      if (removeButtonRefs[_index].ref.current) {
        if (e.key === "ArrowRight") {
          if (index !== undefined) _index += 1;
          if (!removeButtonRefs[_index])
            return removeButtonRefs[0].ref.current.focus();
          return removeButtonRefs[_index].ref.current.focus();
        }
        if (e.key === "ArrowLeft") {
          if (index !== undefined) _index -= 1;
          if (!removeButtonRefs[_index])
            return removeButtonRefs[
              removeButtonRefs.length - 1
            ].ref.current.focus();
          return removeButtonRefs[_index].ref.current.focus();
        }
      }
    };
    const handleTabAndArrowsOnRemoveTag = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        buttonRef.current?.focus();
      }
    };

    const rightElementRef: any = useRef(null);
    const [rightElementWidth, setRightElementWidth] = useState();
    useLayoutEffect(() => {
      setRightElementWidth(rightElementRef?.current?.clientWidth);
    }, []);

    const isChecked = (value: any) =>
      isArray(selected) ? selected.includes(value) : selected === value;
    const _hideActive = multipleStyle !== "indicator" ? hideActive : false;

    return (
      <Controller
        control={formMethods.control}
        name={name}
        rules={{
          required,
        }}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <FormElement
            error={error}
            name={name}
            label={label}
            helper={helper}
            size={size}
          >
            <Listbox
              value={selected}
              onChange={(e) => onChange(handleOnChange(e))}
              multiple={multiple}
              disabled={disabled}
            >
              {({ open }) => (
                <div className="relative">
                  <Listbox.Button
                    className={cn(
                      getInputStyles({
                        size,
                        variant,
                        error: !!error,
                        disabled,
                      }),
                      "flex flex-wrap items-center justify-start",
                      gapsSmall[size],
                      buttonClassName
                    )}
                    style={{
                      paddingRight: rightElementWidth,
                    }}
                    ref={mergeRefs([buttonRef, ref, setReferenceElement])}
                    onKeyUp={(e: any) => handleLeftAndRightArrow(e)}
                  >
                    {!multiple
                      ? selected
                        ? flattenOptions?.find(
                            (option) => returnValue(option) === selected
                          )?.children
                        : defaultMessage
                      : selected?.length > 0
                      ? selected?.map((value: SelectOptionProps, i: number) => (
                          <Tag
                            ref={removeButtonRefs[i].ref}
                            size={size}
                            onClick={(e: Event) => {
                              e.stopPropagation();
                              onChange(handleRemove(i));
                            }}
                            onKeyUp={(e: KeyboardEvent<HTMLButtonElement>) => {
                              if (!multiple) return;
                              e.stopPropagation();
                              handleTabAndArrowsOnRemoveTag(e);
                              handleLeftAndRightArrow(e, i);
                              if (e.key === "Backspace" || e.key === "Delete") {
                                onChange(handleRemove(i));
                                if (removeButtonRefs.length === 0)
                                  return buttonRef.current?.focus();
                                if (!removeButtonRefs[i])
                                  return removeButtonRefs[
                                    i - 1
                                  ]?.ref?.current.focus();
                              }
                            }}
                            key={`select_tag_${i}`}
                          >
                            {
                              flattenOptions?.find(
                                (option) => returnValue(option) === value
                              )?.children
                            }
                          </Tag>
                        ))
                      : defaultMessage}
                  </Listbox.Button>
                  <span
                    ref={rightElementRef}
                    className={cn(
                      "pointer-events-none absolute inset-y-0 right-0 flex flex-row items-center divide-x",
                      divides.accent
                    )}
                  >
                    {removeAll && (
                      <IconButton
                        size={iconButtonSizes[size]}
                        variant="ghost"
                        ariaLabel={`delete_select_${name}`}
                        icon={CrossIcon}
                        className={cn(
                          "pointer-events-auto",
                          marginsXSmall[size]
                        )}
                        onClick={() => onChange(handleRemoveAll())}
                        disabled={disabled}
                      />
                    )}
                    <div>
                      <IconButton
                        as="span"
                        size={iconButtonSizes[size]}
                        icon={ChevronUpDownIcon}
                        variant="ghost"
                        className={cn(
                          "pointer-events-none flex max-h-6",
                          open ? "rotate-180" : "rotate-0",
                          marginsXSmall[size],
                          transition
                        )}
                      />
                    </div>
                  </span>
                  <Listbox.Options
                    className={cn(
                      getDropdownContainerStyles({ size }),
                      optionsClassName
                    )}
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                  >
                    {options?.map(
                      (
                        {
                          children,
                          value,
                          disabled,
                          options: _options,
                          ...props
                        }: SelectOptionProps,
                        i
                      ) => {
                        if (_options && _options.length !== 0)
                          return (
                            <div
                              className={cn(getDropdownGroupStyles({ size }))}
                            >
                              <Text
                                size="xs"
                                className={cn(
                                  getDropdownGroupHeaderStyles({ size })
                                )}
                              >
                                {children}
                              </Text>
                              {_options?.map(
                                (
                                  {
                                    children: _children,
                                    value: _value,
                                    disabled: _disabled,
                                    ..._props
                                  }: SelectOptionProps,
                                  _i
                                ) => (
                                  <Listbox.Option
                                    key={`select_${name}_${value}_option_${_i}`}
                                    disabled={_disabled}
                                    value={returnValue({
                                      value: _value,
                                      props: _props,
                                    })}
                                    className={({ active }) =>
                                      cn(
                                        getDropDownOptionsStyles({
                                          size,
                                          active,
                                          disabled: _disabled,
                                        }),
                                        _hideActive &&
                                          isChecked(_value) &&
                                          "hidden"
                                      )
                                    }
                                  >
                                    {_children}
                                    <Icon
                                      size={capSize(size, "md")}
                                      color="primary"
                                      icon={CheckIcon}
                                      className={
                                        isChecked(_value)
                                          ? "visible"
                                          : "invisible"
                                      }
                                    />
                                  </Listbox.Option>
                                )
                              )}
                            </div>
                          );
                        if (_options?.length === 0) return null;
                        return (
                          <Listbox.Option
                            key={`select_${name}_option_${i}`}
                            disabled={disabled}
                            value={returnValue({ value, props })}
                            className={({ active }) =>
                              cn(
                                getDropDownOptionsStyles({
                                  size,
                                  active,
                                  disabled,
                                }),
                                _hideActive && isChecked(value) && "hidden"
                              )
                            }
                          >
                            {children}
                            <Icon
                              size={capSize(size, "md")}
                              color="primary"
                              icon={CheckIcon}
                              className={
                                isChecked(value) ? "visible" : "invisible"
                              }
                            />
                          </Listbox.Option>
                        );
                      }
                    )}
                    {!options ||
                      (options.length === 0 && (
                        <NoOptionsFound
                          size={size}
                          message={noOptionsMessage}
                        />
                      ))}
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
          </FormElement>
        )}
      />
    );
  }
);

export default memo(Select);

Select.displayName = "Select";

Select.defaultProps = {
  size: "md",
  variant: "outline",
  buttonClassName: undefined,
  optionsClassName: undefined,
  required: false,
  returned: "value",
  multiple: false,
  defaultMessage: "Auswählen...",
  noOptionsMessage: "Keine Optionen gefunden.",
  removeAll: true,
  multipleStyle: "tags",
  hideActive: false,
  label: undefined,
  helper: undefined,
};

type TagProps = {
  size: keyof Sizes;
  onClick: Function;
  onKeyUp: Function;
  children: any;
};

const Tag = forwardRef(
  (
    { size, onClick, onKeyUp, children }: TagProps,
    ref: ForwardedRef<Element>
  ) => (
    <ButtonGroup>
      <Button
        as="div"
        size={iconButtonSizes[size]}
        className="pointer-events-none"
      >
        {children}
      </Button>
      <IconButton
        ref={ref}
        as="div"
        focus="bg"
        tabindex="-1"
        role="button"
        ariaLabel="remove"
        size={iconButtonSizes[size]}
        icon={CrossIcon}
        onClick={onClick}
        onKeyUp={onKeyUp}
      />
    </ButtonGroup>
  )
);

Tag.displayName = "Tag";

type NoOptionsProps = {
  size: keyof Sizes;
  message: string | ReactNode;
};

const NoOptionsFound = ({ size, message }: NoOptionsProps) => (
  <div
    className={cn(
      paddings[size],
      textSizes[size],
      textColors.accent,
      "flex items-center justify-center"
    )}
  >
    {message}
  </div>
);
