import cn from "classnames";
import { FC, useState } from "react";
import {
  Controller,
  FieldPathByValue,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

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
import { Button, ButtonProps, IconButtonProps } from "../Button";
import { FormElement, RequiredRule } from "../Form";
import { Text } from "../Typography";

export type FileInputButtonProps<T extends boolean> = {
  required?: RequiredRule;
  label?: string;
  helper?: string;
  disabled?: boolean;
  size?: keyof Sizes;
  buttonTitle?: string;
  multiple?: T;
  FileInput: FC<FileInputProps<T>>;
  FilePreview?: FC<{ file: string }>;
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

  return (
    <Controller
      control={control}
      rules={{ required }}
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
              </Button>
              {files && (
                <div
                  className={cn(
                    "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border w-full",
                    paddingsEvenly[size],
                    borders.accent,
                    roundings[size],
                    extendedBgColors.subtile
                  )}
                >
                  {multiple ? (
                    files.map((file: string, i: number) =>
                      FilePreview ? (
                        <FilePreview file={file} key={`file_${name}_${i}`} />
                      ) : (
                        <Text key={`file_${name}_${i}`}>{file}</Text>
                      )
                    )
                  ) : FilePreview ? (
                    <FilePreview file={files} />
                  ) : (
                    <Text>{files}</Text>
                  )}
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
          />
        </FormElement>
      )}
    />
  );
};

export default typedMemo(FileInputButton);
