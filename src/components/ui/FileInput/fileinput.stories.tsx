import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { FileInputButton } from ".";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { FileInputProps } from "./fileinput";
import { isArray } from "lodash";

export default {
  title: "UI/Form/FileInput",
  component: FileInputButton,
  argTypes: {
    variant: {
      control: { type: "select" },
    },
  },
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const dbFiles = [
  {
    name: "Datei 1",
    _id: "1",
  },
  {
    name: "Datei 2",
    _id: "2",
  },
  {
    name: "Datei 3",
    _id: "3",
  },
  {
    name: "Datei 4",
    _id: "4",
  },
  {
    name: "Datei 5",
    _id: "5",
  },
];

const FileInput = <T extends boolean>({
  open,
  setOpen,
  multiple,
  files,
  setFiles,
}: FileInputProps<T>) => {
  const [internalFiles, setInternalFiles] = useState(files);

  const handleOnClick = (id: string, i: number) => {
    if (!multiple) {
      setInternalFiles(id as typeof files);
      return;
    }
    if (internalFiles && internalFiles.includes(id)) {
      const newFiles = [...internalFiles];
      newFiles.splice(i, 1);

      setInternalFiles(newFiles.map((file) => file) as typeof files);
    } else {
      setInternalFiles([...(internalFiles || []), id] as typeof files);
    }
  };

  const isActive = (id: string) => {
    if (!multiple) {
      return id === internalFiles;
    }
    return internalFiles && internalFiles.includes(id);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      header="Dateien auswählen"
      content={
        <div className="grid grid-cols-2 w-full gap-4">
          {dbFiles.map((file, i) => (
            <Button
              color={isActive(file._id) ? "primary" : "accent"}
              onClick={() => handleOnClick(file._id, i)}
              key={i}
            >
              {file.name}
            </Button>
          ))}
        </div>
      }
      footer={
        <div className="flex flex-row justify-end w-full">
          <Button
            onClick={() => {
              setFiles(internalFiles);
              setOpen(false);
            }}
            color="primary"
          >
            Bestätigen
          </Button>
        </div>
      }
    />
  );
};

export const Default = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <FileInputButton
      label="FileInput"
      control={formMethods.control}
      required
      multiple
      name="file"
      FileInput={FileInput}
      {...args}
    />
  );
};

export const Square = ({ ...args }) => {
  const formMethods = useForm();
  const file = formMethods.watch("file");

  return (
    <div className="w-min">
      <FileInputButton
        control={formMethods.control}
        required
        multiple
        name="file"
        variant="square"
        backgroundImage={
          (isArray(file) ? file.length > 0 : file) &&
          "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fyt3.googleusercontent.com%2FG-xQ-34A-GcfZm9ByvMnFEf1TjOatTKrJ3g0XaL1kXqCbin-7hTXhQBDe3VYtcAhx59iKG9C5jA%3Ds900-c-k-c0x00ffffff-no-rj&sp=1684351162T731667cd4de4d1f47af4e71ec2f3e95f1feb56bba784e118922ed2aaf34c7beb"
        }
        FileInput={FileInput}
        {...args}
      />
    </div>
  );
};
