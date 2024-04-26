import {
  autoUpdate,
  flip,
  offset,
  size as sizeMiddleware,
  useFloating,
} from "@floating-ui/react-dom";
import { IconSelector, IconX } from "@tabler/icons-react";
import { useMultipleSelection, useSelect } from "downshift";
import compact from "lodash/compact";
import { type ForwardedRef, forwardRef, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  FieldError,
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import { useRefDimensions } from "@/hooks";
import {
  focus,
  gapsSmall,
  placeholderAsText,
  roundings,
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
} from "../../../../styles/groups";
import { smallerSize } from "../../../../utils";
import { requiredInputRule } from "../../../../utils/internal/inputRule";
import { IconButton } from "../../Button";
import { FormElement } from "../../Form";
import { Icon } from "../../Icon";
import { InputElement } from "../../Input/InputElement";
import { Tag } from "../../Tag";
import { NoOptionsFound } from "../components/NoOptions";
import { SelectOption } from "../Option";
import type { SelectProps, SelectValue } from "../select";
import { useFlatSelectOptions } from "../utils/getFlatSelectOptions";
import isArray from "lodash/isArray";

export type SelectMultipleProps<TValue extends SelectValue = SelectValue> =
  SelectProps<TValue> & {
    indicatorMessage?: string;
    multipleType?: "indicator" | "tags";
  };

export const SelectMultipleInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends SelectValue = SelectValue
>(
  {
    control,
    name,
    required,
    ...props
  }: SelectMultipleProps<TValue> & UseControllerProps<TFieldValues, TName>,
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
    <SelectMultipleRaw
      {...props}
      ref={mergeRefs([controllerRef, ref])}
      id={name}
      value={value || []}
      onChange={onChange}
      error={error}
      required={required}
    />
  );
};

export type SelectMultipleRawProps<TValue extends SelectValue = SelectValue> =
  SelectMultipleProps<TValue> & {
    id: string;
    value?: TValue[];
    defaultValue?: TValue[];
    onChange?: (value: TValue[] | undefined) => void;
    error?: FieldError;
  };

export const SelectMultipleRawInner = <
  TValue extends SelectValue = SelectValue
>(
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
    indicatorMessage = "ausgewählt.",
    multipleType = "indicator",
    optionsClassName,
    placement = "bottom",
    required,
    size = "md",
    variant = "outline",
    value: values,
    defaultValue: defaultValues,
    error,
    onChange,
    afterChildren,
    beforeChildren,
  }: SelectMultipleRawProps<TValue>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const { valueOptions, indexedOptions } = useFlatSelectOptions(options);

  const closeButtonRef = useRef<HTMLDivElement>(null);
  const { width: closeButtonWidth } = useRefDimensions(closeButtonRef);

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    reset,
  } = useMultipleSelection({
    selectedItems: isArray(values)
      ? values.map((value) => valueOptions.find((v) => v.value === value))
      : undefined,
    defaultSelectedItems: isArray(defaultValues)
      ? defaultValues.map((value) =>
          valueOptions.find((v) => v.value === value)
        )
      : undefined,
    onSelectedItemsChange: onChange
      ? ({ selectedItems }) => {
          onChange(compact(selectedItems?.map((item) => item?.value)));
        }
      : undefined,
  });

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useSelect({
    toggleButtonId: id,
    items: valueOptions,
    isItemDisabled: (item) => !!item.disabled,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // Select geöffnet lassen nach Item Auswahl.
            highlightedIndex: state.highlightedIndex, // HighlightedIndex beibehalten nach Selektion
          };
        default:
      }
      return changes;
    },
    onStateChange: ({ type, selectedItem: newSelectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.ToggleButtonBlur:
          if (newSelectedItem) {
            if (
              selectedItems.find(
                (item) => item?.value === newSelectedItem.value
              )
            ) {
              removeSelectedItem(newSelectedItem);
            } else {
              addSelectedItem(newSelectedItem);
            }
          }
          selectItem(null); //  State auf null setzen, damit ein Item auch direkt wieder abgewählt werden kann, nachdem es ausgewählt wurde.
          break;
        default:
          break;
      }
    },
  });

  const { ref: toggleRef, ...toggleButtonProps } = getToggleButtonProps(
    getDropdownProps({ preventKeyAction: isOpen })
  );

  const { ref: menuRef, ...menuProps } = getMenuProps(
    {},
    { suppressRefError: true }
  );

  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  const { x, y, strategy, refs } = useFloating({
    open: isOpen,
    whileElementsMounted: autoUpdate,
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
      sizeMiddleware({
        apply({ availableHeight }) {
          flushSync(() => setMaxHeight(availableHeight));
        },
        rootBoundary: "viewport",
        padding: offsetSizes[size],
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
          <div
            ref={mergeRefs([refs.setReference])}
            className={cn(
              "relative text-start",
              !selectedItems || (selectedItems.length === 0 && "truncate"),
              getInputStyles({
                disabled,
                error: !!error,
                size,
                variant,
              }),
              (!selectedItems || selectedItems.length === 0) &&
                placeholderAsText[variant],
              buttonClassName
            )}
            style={{
              paddingRight: closeButtonRef && closeButtonWidth,
            }}
          >
            <button
              className={cn(
                "absolute inset-0 w-full",
                roundings[size],
                focus.accent
              )}
              ref={mergeRefs(compact([toggleRef, ref]))}
              disabled={disabled}
              type="button"
              aria-label={`open-select-${id}`}
              {...toggleButtonProps}
            />
            {!selectedItems || selectedItems.length === 0 ? (
              defaultMessage
            ) : multipleType === "tags" ? (
              <div className={cn("flex flex-row flex-wrap", gapsSmall[size])}>
                {selectedItems.map((item, i) => (
                  <Tag
                    size={smallerSize(size)}
                    className={cn("relative", focus.accent)}
                    key={`selected-item-${i}`}
                    {...getSelectedItemProps({
                      selectedItem: item,
                      index: i,
                    })}
                    rightElement={
                      <IconButton
                        variant="filled"
                        ariaLabel={`remove-selected-item-${i}`}
                        size={smallerSize(size)}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelectedItem(item);
                        }}
                        icon={IconX}
                      />
                    }
                  >
                    {item?.children}
                  </Tag>
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  "flex flex-row truncate items-center",
                  gapsSmall[size]
                )}
              >
                <Tag size={smallerSize(size)} variant="subtile">
                  {selectedItems.length.toString()}
                </Tag>
                {indicatorMessage}
              </div>
            )}
          </div>

          <InputElement size={size} type="right" ref={closeButtonRef}>
            {allowReset && selectedItems && selectedItems.length !== 0 ? (
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
      <div
        ref={mergeRefs(compact([refs.setFloating, menuRef]))}
        data-state={isOpen ? "open" : "closed"}
        style={{
          top: y,
          left: x,
          position: strategy,
          width: buttonWidth,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          visibility: !isOpen ? "hidden" : "visible",
        }}
        className={cn(getDropdownContainerStyles({ size }), optionsClassName)}
      >
        {isOpen && (
          <>
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
                  isSelected={(value) =>
                    !!selectedItems.find((item) => item?.value === value)
                  }
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
          </>
        )}
      </div>
    </>
  );
};

export const SelectMultipleRaw = forwardRef(SelectMultipleRawInner) as <
  TValue extends SelectValue = SelectValue
>(
  props: SelectMultipleRawProps<TValue> & {
    ref?: ForwardedRef<HTMLButtonElement>;
  }
) => ReturnType<typeof SelectMultipleRawInner>;

export const SelectMultiple = forwardRef(SelectMultipleInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends SelectValue = SelectValue
>(
  props: SelectMultipleProps<TValue> &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLButtonElement>;
    }
) => ReturnType<typeof SelectMultipleInner>;
