import cn from "classnames";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import {
  Controller,
  FieldPathByValue,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import { Locales } from "../../../../locales/getText";
import {
  bordersInteractive,
  gaps,
  paddingsEvenly,
  roundings,
  transition,
} from "../../../../styles";
import { CloudArrowUpIcon } from "../../../../theme/icons";
import { Sizes } from "../../../../types";
import { smallerSize } from "../../../../utils";
import { typedMemo } from "../../../../utils/internal";
import { requiredInputRule } from "../../../../utils/internal/inputRule";
import { FormElement, RequiredRule } from "../../Form";
import { Icon } from "../../Icon";
import { Tag } from "../../Tag";
import { Text } from "../../Typography";
import { fileListToArray } from "./utils/fileListToArray";

export type DropzoneProps = {
  required?: RequiredRule;
  disabled?: boolean;
  size?: keyof Sizes;
  label?: string;
  helper?: string;
  accept?: string;
  flexRow?: boolean;
  info?: ReactElement;
};

const Dropzone = <
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
  const locale = useRouter().locale as Locales;

  return (
    <Controller
      control={control}
      rules={{ required: requiredInputRule(required, locale) }}
      name={name}
      render={({
        field: { onChange, value: files },
        fieldState: { error },
      }) => (
        <FormElement
          size={size}
          label={label}
          helper={helper}
          error={error}
          name={name}
        >
          <label
            htmlFor={name}
            className={cn(
              "flex flex-col items-center justify-center w-full border-dashed border cursor-pointer",
              transition,
              error ? bordersInteractive.danger : bordersInteractive.accent,
              roundings[size]
            )}
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
                icon={CloudArrowUpIcon}
                color={error ? "danger" : "subtile"}
                size={size}
              />
              {info || (
                <Text
                  color={error ? "danger" : "subtile"}
                  size={smallerSize(size)}
                >
                  <span className="font-semibold">Zum hochladen klicken</span>{" "}
                  oder Medien hereinziehen.{" "}
                  {files?.length > 0 && (
                    <Tag
                      size="xs"
                      variant="subtile"
                      label={`${files.length} ausgewählt.`}
                    />
                  )}
                </Text>
              )}
            </div>
            <input
              id={name}
              onChange={(e) => {
                if (!e.target.files) {
                  onChange([]);
                  return;
                }
                const fileListArray = fileListToArray(e.target.files); // damit files als Array nutzbar sind, FileList kann nicht gemappt werden
                const newFiles = [...(files || []), ...fileListArray];
                onChange(newFiles);
              }}
              type="file"
              accept={accept}
              disabled={disabled}
              className="hidden"
              multiple
            />
          </label>
        </FormElement>
      )}
    />
  );
};

export default typedMemo(Dropzone);
