import {
  flip,
  offset,
  type Placement,
  useFloating,
} from "@floating-ui/react-dom";
import { Portal } from "@radix-ui/react-portal";
import { IconSelector, IconX } from "@tabler/icons-react";
import { useSelect } from "downshift";
import compact from "lodash/compact";
import { type ForwardedRef, forwardRef, type ReactNode, useRef } from "react";
import {
  type FieldError,
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import { useRefDimensions } from "@/hooks";
import {
  divides,
  placeholderAsText,
  popoverAnimation,
  transition,
} from "@/styles";
import { offsetSizes } from "@/styles/popper/offset";
import { cn } from "@/utils/cn";
import { mergeRefs } from "@/utils/internal";

import {
  getDropdownContainerStyles,
  getDropdownPadding,
  getInputStyles,
  inputContainerClassName,
} from "../../../styles/groups";
import type { InputVariant, Size } from "../../../types";
import { smallerSize } from "../../../utils";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import { IconButton } from "../Button";
import { FormElement, type RequiredRule } from "../Form";
import { Icon } from "../Icon";
import { InputElement } from "../Input/InputElement";
import { NoOptionsFound } from "./components/NoOptions";
import {
  type CheckedType,
  SelectOption,
  type SelectOptionProps,
} from "./Option";
import { useFlatSelectOptions } from "./utils/getFlatSelectOptions";

export type SelectProps = {
  options: SelectOptionProps[];
  size?: Size;
  variant?: InputVariant;
  disabled?: boolean;
  buttonClassName?: string;
  optionsClassName?: string;
  required?: RequiredRule;
  defaultMessage?: string;
  noOptionsMessage?: string | ReactNode;
  allowReset?: boolean;
  label?: string;
  helper?: string;
  checkedType?: CheckedType;
  placement?: Placement;
  beforeChildren?: ReactNode;
  afterChildren?: ReactNode;
};

export const SelectInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    control,
    name,
    required,
    ...props
  }: SelectProps & UseControllerProps<TFieldValues, TName>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const {
    field: { value, onChange, ref: controllerRef },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: requiredInputRule(required),
    },
  });

  return (
    <SelectRaw
      {...props}
      ref={mergeRefs([controllerRef, ref])}
      id={name}
      value={value || null}
      onChange={onChange}
      error={error}
    />
  );
};

export type SelectRawProps = SelectProps & {
  id: string;
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | undefined) => void;
  error?: FieldError;
};

export const SelectRaw = forwardRef(
  (
    {
      id,
      options,
      allowReset,
      buttonClassName,
      checkedType,
      defaultMessage = "Auswählen ...",
      disabled = false,
      helper,
      label,
      noOptionsMessage = "Keine Optionen gefunden.",
      optionsClassName,
      placement = "bottom",
      required,
      size = "md",
      variant = "outline",
      value,
      defaultValue,
      error,
      onChange,
      afterChildren,
      beforeChildren,
    }: SelectRawProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const { valueOptions, indexedOptions } = useFlatSelectOptions(options);

    const closeButtonRef = useRef<HTMLDivElement>(null);
    const { width: closeButtonWidth } = useRefDimensions(closeButtonRef);

    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
      reset,
    } = useSelect({
      selectedItem: value
        ? valueOptions.find((v) => v.value === value)
        : value === null
        ? null
        : undefined,
      toggleButtonId: id,
      items: valueOptions,
      defaultSelectedItem: defaultValue
        ? valueOptions.find((v) => v.value === defaultValue)
        : undefined,
      isItemDisabled: (item) => !!item.disabled,
      onSelectedItemChange: onChange
        ? ({ selectedItem }) => {
            onChange(selectedItem?.value);
          }
        : undefined,
    });

    const { ref: toggleRef, ...toggleButtonProps } = getToggleButtonProps();

    const { ref: menuRef, ...menuProps } = getMenuProps(
      {},
      { suppressRefError: true }
    );

    const { x, y, strategy, refs } = useFloating({
      open: isOpen,
      placement,
      middleware: [
        offset({ mainAxis: offsetSizes[size] }),
        flip({
          padding: offsetSizes[size],
          fallbackPlacements: [
            "top",
            "bottom-start",
            "top-start",
            "bottom-end",
            "top-end",
          ],
        }),
      ],
    });

    const buttonWidth =
      refs.reference?.current?.getBoundingClientRect().width || 0;

    return (
      <>
        <FormElement
          required={required}
          error={error}
          name={id}
          label={label}
          helper={helper}
          size={size}
        >
          <div className={cn(inputContainerClassName)}>
            <button
              type="button"
              {...toggleButtonProps}
              ref={mergeRefs(compact([refs.setReference, toggleRef, ref]))}
              disabled={disabled}
              className={cn(
                getInputStyles({
                  disabled,
                  error: !!error,
                  size,
                  variant,
                }),
                "truncate text-start",
                !selectedItem && placeholderAsText[variant],
                buttonClassName
              )}
              style={{
                paddingRight: closeButtonRef && closeButtonWidth,
              }}
            >
              {selectedItem?.children || defaultMessage}
            </button>

            <InputElement size={size} type="right" ref={closeButtonRef}>
              {allowReset && !!selectedItem ? (
                <IconButton
                  icon={IconX}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    reset();
                  }}
                  ariaLabel="clear_selection"
                  className="pointer-events-auto aspect-auto"
                  size={smallerSize(size)}
                  variant="ghost"
                />
              ) : (
                <Icon
                  size={smallerSize(size)}
                  icon={IconSelector}
                  className={cn(
                    "pointer-events-none flex",
                    isOpen ? "rotate-180" : "rotate-0",
                    transition
                  )}
                />
              )}
            </InputElement>
          </div>
        </FormElement>
        {isOpen && (
          <Portal>
            <div
              ref={mergeRefs(compact([refs.setFloating, menuRef]))}
              data-state={isOpen ? "open" : "closed"}
              style={{
                top: y,
                left: x,
                position: strategy,
                width: buttonWidth,
              }}
              className={cn(
                getDropdownContainerStyles({ size, disablePadding: true }),
                "flex flex-col will-change-[transform,opacity] divide-y",
                divides.accent,
                popoverAnimation,
                optionsClassName
              )}
            >
              {beforeChildren && (
                <div className={cn(getDropdownPadding(size))}>
                  {beforeChildren}
                </div>
              )}
              <ul className={cn(getDropdownPadding(size))} {...menuProps}>
                {indexedOptions.map((option, i) => (
                  <SelectOption
                    key={i}
                    {...option}
                    size={size}
                    getItemProps={getItemProps}
                    isSelected={(value) => selectedItem?.value === value}
                    highlightedIndex={highlightedIndex}
                    checkedType={checkedType}
                  />
                ))}
                {!indexedOptions ||
                  (indexedOptions.length === 0 && (
                    <NoOptionsFound message={noOptionsMessage} size={size} />
                  ))}
              </ul>
              {afterChildren && (
                <div className={cn(getDropdownPadding(size))}>
                  {afterChildren}
                </div>
              )}
            </div>
          </Portal>
        )}
      </>
    );
  }
);

SelectRaw.displayName = "SelectRaw";

export const Select = forwardRef(SelectInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: SelectProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLButtonElement>;
    }
) => ReturnType<typeof SelectInner>;
