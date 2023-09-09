import { Listbox } from "@headlessui/react";
import type { Placement } from "@popperjs/core";
import cn from "classnames";
import isArray from "lodash/isArray";
import isEqual from "lodash/isEqual";
import {
  createRef,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
  useWatch,
} from "react-hook-form";
import { usePopper } from "react-popper";

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
} from "../../../styles/groups";
import { popperOffset } from "../../../styles/popper/offset";
import { CheckIcon, ChevronUpDownIcon, CrossIcon } from "../../../theme/icons";
import type { InputVariant, Size } from "../../../types";
import { capSize, smallerSize } from "../../../utils";
import { typedMemo } from "../../../utils/internal";
import { mergeRefs } from "../../../utils/internal/mergeRefs";
import { Button, ButtonGroup, IconButton } from "../Button";
import { FormElement, RequiredRule } from "../Form";
import { Icon } from "../Icon";
import { Text } from "../Typography";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import type { Locale } from "../../../locales/getText";
import { useRouter } from "next/router";

export type SelectProps = {
  options: SelectOptionProps[];
  size?: Size;
  variant?: InputVariant;
  disabled?: boolean;
  buttonClassName?: string;
  optionsClassName?: string;
  required?: RequiredRule;
  returned?: string;
  multiple?: boolean;
  defaultMessage?: string;
  indicatorMessage?: string;
  noOptionsMessage?: string | ReactNode;
  removeAll?: boolean;
  multipleStyle?: "tags" | "indicator";
  hideActive?: boolean;
  label?: string;
  helper?: string;
  placement?: Placement;
};

export type SelectOptionProps = {
  value?: any;
  [key: string]: any;
  disabled?: boolean;
  children: ReactNode;
  options?: SelectOptionProps[];
};

export const SelectInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    control,
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
    indicatorMessage = "ausgewählt.",
    noOptionsMessage = "Keine Optionen gefunden.",
    removeAll = false,
    hideActive = false,
    multipleStyle = "tags",
    label,
    helper,
    placement = "bottom",
  }: SelectProps & UseControllerProps<TFieldValues, TName>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const offset = popperOffset({ size });

  const {
    styles,
    attributes,
    update: updatePopper,
  } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [{ name: "offset", options: { offset } }],
  });

  const formValue = useWatch({ control, name });

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
    updatePopper?.();
    return [...e.map((item: any) => item)];
  };

  const handleRemove = (values: Array<string>, i: number) => {
    if (multiple) {
      const newArray = [...selected];
      newArray.splice(i, 1);
      setSelected(newArray);
      removeButtonRefs.splice(i, 1); // Ref entfernen
      const dataArray = values;
      dataArray.splice(i, 1);
      updatePopper?.();
      return dataArray;
    }
    return null;
  };

  const handleRemoveAll = () => {
    if (!multiple) {
      setSelected(null);
      return null;
    }

    setSelected([]);
    return [];
  };

  const buttonRef = useRef<HTMLButtonElement>();
  const removeButtonRefs: any =
    isArray(selected) &&
    selected?.map((value: any) => ({
      id: value,
      ref: createRef(),
    }));

  const handleLeftAndRightArrow = (e: KeyboardEvent, index?: number) => {
    if (!multiple) return;
    if (!removeButtonRefs || removeButtonRefs?.length === 0) return;
    let _index =
      index !== undefined
        ? index
        : removeButtonRefs?.length
        ? removeButtonRefs.length - 1
        : 0;

    if (removeButtonRefs[_index]?.ref?.current) {
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

  const rightElementRef = useRef<HTMLSpanElement>(null);
  const [rightElementWidth, setRightElementWidth] = useState<number>();
  useEffect(() => {
    setRightElementWidth(rightElementRef?.current?.clientWidth);
  }, []);

  const isChecked = (value: any) =>
    isArray(selected) ? selected.includes(value) : selected === value;
  const _hideActive = multipleStyle !== "indicator" ? hideActive : false;

  const locale = useRouter().locale as Locale;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
      }}
      render={({
        field: { value: values, onChange, ref: controllerRef },
        fieldState: { error },
      }) => (
        <FormElement
          required={required}
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
        >
          <Listbox
            value={selected}
            onChange={(e) => {
              onChange(handleOnChange(e));
            }}
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
                  ref={mergeRefs([
                    buttonRef,
                    ref,
                    setReferenceElement,
                    controllerRef,
                  ])}
                  onKeyUp={(e: KeyboardEvent) => handleLeftAndRightArrow(e)}
                >
                  {!multiple
                    ? selected
                      ? flattenOptions?.find(
                          (option) => returnValue(option) === selected
                        )?.children
                      : defaultMessage
                    : multipleStyle === "indicator"
                    ? selected?.length > 0
                      ? `${selected.length} ${indicatorMessage}`
                      : defaultMessage
                    : selected?.length > 0
                    ? selected?.map((value: SelectOptionProps, i: number) => (
                        <Tag
                          ref={removeButtonRefs[i].ref}
                          size={size}
                          onClick={(e) => {
                            e.stopPropagation();
                            onChange(handleRemove(values, i));
                          }}
                          onKeyUp={(e: KeyboardEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            handleTabAndArrowsOnRemoveTag(e);
                            handleLeftAndRightArrow(e, i);
                            if (e.key === "Backspace" || e.key === "Delete") {
                              onChange(handleRemove(values, i));
                              if (
                                !removeButtonRefs ||
                                removeButtonRefs.length === 0
                              )
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
                  {removeAll &&
                    (multiple ? selected?.length > 0 : selected) && (
                      <IconButton
                        size={smallerSize(size)}
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
                  <div
                    className={cn(
                      "flex items-center justify-center",
                      paddings[capSize(size, "md")]
                    )}
                  >
                    <Icon
                      size={smallerSize(size)}
                      icon={ChevronUpDownIcon}
                      className={cn(
                        "pointer-events-none flex",
                        open ? "rotate-180" : "rotate-0",
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
                          <div className={cn(getDropdownGroupStyles({ size }))}>
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
                                    ..._props,
                                  })}
                                  className={({ active }) =>
                                    cn(
                                      getDropDownOptionsStyles({
                                        size,
                                        active,
                                        disabled: _disabled,
                                      }),
                                      _hideActive &&
                                        isChecked(
                                          returnValue({
                                            value: _value,
                                            ..._props,
                                          })
                                        ) &&
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
                                      isChecked(
                                        returnValue({
                                          value: _value,
                                          ..._props,
                                        })
                                      )
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
                          value={returnValue({ value, ...props })}
                          className={({ active }) =>
                            cn(
                              getDropDownOptionsStyles({
                                size,
                                active,
                                disabled,
                              }),
                              _hideActive &&
                                isChecked(returnValue({ value, ...props })) &&
                                "hidden"
                            )
                          }
                        >
                          {children}
                          <Icon
                            size={capSize(size, "md")}
                            color="primary"
                            icon={CheckIcon}
                            className={
                              isChecked(returnValue({ value, ...props }))
                                ? "visible"
                                : "invisible"
                            }
                          />
                        </Listbox.Option>
                      );
                    }
                  )}
                  {!options ||
                    (options.length === 0 && (
                      <NoOptionsFound size={size} message={noOptionsMessage} />
                    ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </FormElement>
      )}
    />
  );
};

const Select = forwardRef(SelectInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: SelectProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLButtonElement>;
    }
) => ReturnType<typeof SelectInner>;

export default typedMemo(Select);

type TagProps = {
  size: Size;
  onClick: MouseEventHandler;
  onKeyUp: KeyboardEventHandler;
  children: ReactNode;
};

const Tag = forwardRef(
  (
    { size, onClick, onKeyUp, children }: TagProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <ButtonGroup>
      <Button as="div" size={smallerSize(size)} className="pointer-events-none">
        {children}
      </Button>
      <IconButton
        ref={ref}
        as="div"
        focus="bg"
        tabIndex={-1}
        role="button"
        ariaLabel="remove"
        size={smallerSize(size)}
        icon={CrossIcon}
        onClick={onClick}
        onKeyUp={onKeyUp}
      />
    </ButtonGroup>
  )
);

Tag.displayName = "Tag";

type NoOptionsProps = {
  size: Size;
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
