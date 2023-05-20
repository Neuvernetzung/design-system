import cn from "classnames";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import {
  Controller,
  FieldPathByValue,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import { Locales } from "../../../locales/getText";
import {
  borders,
  extendedBgColors,
  gapsSmall,
  paddingsEvenly,
  roundings,
} from "../../../styles";
import { DocumentPlusIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import {
  maxInputRule,
  minInputRule,
  requiredInputRule,
} from "../../../utils/internal/inputRule";
import { Button, ButtonProps, IconButtonProps } from "../Button";
import { FormElement, MaxRule, MinRule, RequiredRule } from "../Form";
import { Text } from "../Typography";

export type FileInputButtonProps<T extends boolean> = {
  required?: RequiredRule;
  label?: string;
  helper?: string;
  disabled?: boolean;
  size?: keyof Sizes;
  buttonTitle?: string;
  multiple?: T;
  min?: MinRule;
  max?: MaxRule;
  FileInput: FC<FileInputProps<T>>;
  FilePreview?: FC<FilePreviewProps<T>>;
} & VariantProps;

type VariantProps =
  | { variant?: "default"; buttonProps?: ButtonProps; backgroundImage?: never }
  | {
      variant: "square";
      buttonProps?: IconButtonProps;
      backgroundImage?: string;
    };

export type FileInputProps<T extends boolean> = {
  multiple?: T;
  files: T extends true ? string[] : string;
  setFiles: (files: T extends true ? string[] : string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  min?: MinRule;
  max?: MaxRule;
};

export type FilePreviewProps<T extends boolean> = {
  files: T extends true ? string[] : string;
  setFiles: (files: T extends true ? string[] : string) => void;
};

const FileInputButton = <
  TMultiple extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathByValue<
    TFieldValues,
    TMultiple extends true ? string[] : string
  > = FieldPathByValue<TFieldValues, TMultiple extends true ? string[] : string>
>({
  required,
  min,
  max,
  label,
  helper,
  control,
  name,
  size = "md",
  disabled,
  buttonTitle,
  FileInput,
  FilePreview,
  multiple,
  variant = "default",
  buttonProps,
  backgroundImage,
}: FileInputButtonProps<TMultiple> &
  UseControllerProps<TFieldValues, TName>) => {
  const [open, setOpen] = useState<boolean>(false);
  const locale = useRouter().locale as Locales;

  return (
    <Controller
      control={control}
      rules={{
        required: requiredInputRule(required, locale),
        min: minInputRule(min, locale),
        max: maxInputRule(max, locale),
      }}
      name={name}
      render={({
        field: { value: files, onChange: setFiles },
        fieldState: { error },
      }) => (
        <FormElement
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
        >
          {variant === "default" && (
            <div className={cn("flex flex-col", gapsSmall[size])}>
              <Button
                variant="outline"
                onClick={() => setOpen(true)}
                color={error ? "danger" : "accent"}
                size={size}
                disabled={disabled}
                leftIcon={DocumentPlusIcon}
                {...buttonProps}
              >
                {buttonTitle || "Datei auswählen"}
                {files &&
                  (multiple ? files.length > 0 : true) &&
                  ` - ${multiple ? files?.length : files ? 1 : 0}`}
              </Button>
              {files && (multiple ? files.length > 0 : true) && FilePreview && (
                <div
                  className={cn(
                    "border w-full",
                    paddingsEvenly[size],
                    borders.accent,
                    roundings[size],
                    extendedBgColors.subtile
                  )}
                >
                  <FilePreview files={files} setFiles={setFiles} />
                </div>
              )}
            </div>
          )}
          {variant === "square" && (
            <div className="flex flex-row gap ">
              <Button
                ariaLabel={`file_input_${name}`}
                variant="outline"
                onClick={() => setOpen(true)}
                color={error ? "danger" : "accent"}
                size={size}
                disabled={disabled}
                leftIcon={DocumentPlusIcon}
                {...(buttonProps as IconButtonProps | undefined)}
                className={cn(
                  "relative overflow-hidden",
                  buttonProps?.className
                )}
              >
                <>
                  <span
                    className="absolute w-full h-full inset-0 opacity-20"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: "cover",
                    }}
                  />
                  {files && (
                    <Text className="relative" size={size}>
                      {multiple ? files?.length : files ? 1 : 0}
                    </Text>
                  )}
                </>
              </Button>
            </div>
          )}
          <FileInput
            files={files}
            setFiles={setFiles}
            open={open}
            setOpen={setOpen}
            multiple={multiple}
            min={min}
            max={max}
          />
        </FormElement>
      )}
    />
  );
};

export default typedMemo(FileInputButton);
