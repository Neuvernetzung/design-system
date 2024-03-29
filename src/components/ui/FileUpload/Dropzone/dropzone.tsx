import { IconCloudUpload } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { DragEvent, ReactElement, useRef, useState } from "react";
import {
  Controller,
  FieldPathByValue,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import type { Locale } from "@/locales/getText";
import { gaps, paddingsEvenly } from "@/styles";
import type { Size } from "@/types";
import { smallerSize } from "@/utils";
import { cn } from "@/utils/cn";
import { requiredInputRule } from "@/utils/internal/inputRule";

import { Button } from "../../Button";
import { DropButton } from "../../Button/DropButton";
import { FormElement, RequiredRule } from "../../Form";
import { Icon } from "../../Icon";
import { Tag } from "../../Tag";
import { fileListToArray } from "./utils/fileListToArray";

export type DropzoneProps = {
  required?: RequiredRule;
  disabled?: boolean;
  size?: Size;
  label?: string;
  helper?: string;
  accept?: string;
  flexRow?: boolean;
  info?: ReactElement;
};

export const Dropzone = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathByValue<TFieldValues, File[]> = FieldPathByValue<
    TFieldValues,
    File[]
  >
>({
  control,
  name,
  required,
  disabled,
  size = "md",
  label,
  helper,
  accept,
  flexRow,
  info,
}: DropzoneProps & UseControllerProps<TFieldValues, TName>) => {
  const locale = useRouter().locale as Locale;

  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>, currentFiles: File[]) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      return handleChange(e.dataTransfer.files, currentFiles);
    }
    return undefined;
  };

  const handleChange = (files: FileList | null, currentFiles: File[]) => {
    if (!files) {
      return [];
    }
    const fileListArray = fileListToArray(files); // damit files als Array nutzbar sind, FileList kann nicht gemappt werden
    const newFiles = [...(currentFiles || []), ...fileListArray];

    return newFiles;
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <Controller
      control={control}
      rules={{ required: requiredInputRule(required, locale) }}
      name={name}
      render={({
        field: { onChange, value: currentFiles, ref: controllerRef },
        fieldState: { error },
      }) => (
        <FormElement
          required={required}
          size={size}
          label={label}
          helper={helper}
          error={error}
          name={name}
        >
          <DropButton
            size={size}
            color={error ? "danger" : "accent"}
            className={cn(dragActive && "bg-opacity-10")}
            asChild
          >
            <label
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => onChange(handleDrop(e, currentFiles))}
              htmlFor={name}
              className={cn("cursor-pointer")}
            >
              <div
                className={cn(
                  "flex items-center justify-center select-none",
                  flexRow ? "flex-row" : "flex-col",
                  gaps[size],
                  paddingsEvenly[size]
                )}
              >
                <Icon
                  icon={IconCloudUpload}
                  color={error ? "danger" : "subtile"}
                  size={size}
                />
                {info || (
                  <Button
                    ref={controllerRef}
                    onClick={onButtonClick}
                    className="pointer-events-none"
                    variant="ghost"
                    color={error ? "danger" : "accent"}
                    size={smallerSize(size)}
                  >
                    <span className="font-semibold">Zum hochladen klicken</span>{" "}
                    oder Medien hereinziehen.{" "}
                    {currentFiles?.length > 0 && (
                      <Tag
                        size="xs"
                        variant="subtile"
                      >{`${currentFiles.length} ausgewählt.`}</Tag>
                    )}
                  </Button>
                )}
              </div>
              <input
                ref={inputRef}
                id={name}
                onChange={(e) =>
                  onChange(handleChange(e.target.files, currentFiles))
                }
                type="file"
                accept={accept}
                disabled={disabled}
                className="hidden"
                multiple
              />
            </label>
          </DropButton>
        </FormElement>
      )}
    />
  );
};
