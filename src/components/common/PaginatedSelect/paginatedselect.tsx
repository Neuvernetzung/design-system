import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
} from "react-hook-form";

import { Locales } from "../../../locales/getText";
import { Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import {
  Button,
  ButtonProps,
  FormElement,
  Modal,
  RequiredRule,
} from "../../ui";
import { ModalSizes } from "../../ui/Modal/modal";
import { Pagination, PaginationProps } from "../Pagination";

export type PaginatedSelectValue<TMultiple extends boolean> =
  TMultiple extends true ? string[] : string;

export type PaginatedSelectItems<TItem, TMultiple extends boolean> = ({
  items,
  value,
  multiple,
  handleSelect,
  isActive,
}: {
  items: TItem[];
  value?: PaginatedSelectValue<TMultiple>;
  multiple?: TMultiple;
  handleSelect: (item: string) => void;
  isActive: (item: string) => boolean;
}) => ReactElement;

export type PaginatedSelectPreview<TMultiple extends boolean = boolean> = ({
  multiple,
  value,
  setValue,
}: {
  multiple?: TMultiple;
  value: PaginatedSelectValue<TMultiple>;
  setValue: (
    value:
      | PaginatedSelectValue<TMultiple>
      | (TMultiple extends true ? [] : undefined)
  ) => void;
}) => ReactElement | null;

export type PaginatedSelectProps<TItem, TMultiple extends boolean> = {
  label?: string;
  helper?: string;
  size?: keyof Sizes;
  items: TItem[];
  pagination: PaginationProps;
  buttonProps?: ButtonProps;
  SelectItems: PaginatedSelectItems<TItem, TMultiple>;
  Preview?: PaginatedSelectPreview<TMultiple>;
  header?: ReactElement;
  multiple?: TMultiple;
  disabled?: boolean;
  required?: RequiredRule;
  modalSize?: keyof ModalSizes;
};

const PaginatedSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
  TItem extends any = any,
  TMultiple extends boolean = boolean
>({
  control,
  helper,
  label,
  size = "md",
  modalSize,
  name,
  items = [],
  header,
  buttonProps,
  pagination,
  SelectItems,
  Preview,
  disabled,
  required,
  multiple,
}: PaginatedSelectProps<TItem, TMultiple> &
  UseControllerProps<TFieldValues, TName>) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] =
    useState<PaginatedSelectValue<TMultiple>>();

  const onOpen = (value?: PaginatedSelectValue<TMultiple>) => {
    setOpen(true);
    setInternalValue(value);
  };

  const onSubmit = (value?: PaginatedSelectValue<TMultiple>) => {
    setOpen(false);
    return value;
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSelect = (item: string) => {
    if (!multiple) {
      if (internalValue === item) {
        setInternalValue(undefined);
        return;
      }
      setInternalValue(item as PaginatedSelectValue<TMultiple>);
      return;
    }
    if (
      internalValue &&
      internalValue.length > 0 &&
      internalValue.includes(item)
    ) {
      const newItems = (internalValue as PaginatedSelectValue<true>)?.filter(
        (value) => value !== item
      );
      setInternalValue(newItems as PaginatedSelectValue<TMultiple>);
      return;
    }
    setInternalValue([
      ...(internalValue || []),
      item,
    ] as PaginatedSelectValue<TMultiple>);
  };

  const isActive = (item: string) => {
    if (!multiple) return internalValue === item;
    return !!(
      internalValue &&
      internalValue.length > 0 &&
      internalValue.includes(item)
    );
  };

  const locale = useRouter().locale as Locales;

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: requiredInputRule(required, locale) }}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <>
          <FormElement
            name={name}
            error={error}
            helper={helper}
            label={label}
            size={size}
          >
            <div className="flex flex-col gap-2">
              <Button
                ref={ref}
                disabled={disabled}
                onClick={() => {
                  onOpen(value);
                }}
                size={size}
                {...buttonProps}
                {...(error && { color: "danger" })}
              >
                {buttonProps?.children || `Items auswählen`}
              </Button>
              {Preview && (
                <Preview
                  value={value}
                  setValue={onChange}
                  multiple={multiple}
                />
              )}
            </div>
          </FormElement>
          <Modal
            open={open}
            setOpen={setOpen}
            header={header || label}
            size={modalSize || size}
            content={
              <div className="flex flex-col gap-4 w-full">
                <SelectItems
                  items={items}
                  value={internalValue}
                  multiple={multiple}
                  handleSelect={handleSelect}
                  isActive={isActive}
                />
                <Pagination size={size} {...pagination} />
              </div>
            }
            footer={
              <div className="flex flex-row gap-4 justify-between w-full">
                <Button size={size} onClick={onClose} variant="ghost">
                  Abbrechen
                </Button>
                <Button
                  size={size}
                  color="primary"
                  onClick={() => onChange(onSubmit(internalValue))}
                >
                  Bestätigen
                </Button>
              </div>
            }
          />
        </>
      )}
    />
  );
};

export default typedMemo(PaginatedSelect);
