import { Meta } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FileInputButton } from ".";
import { Modal } from "../Modal";
import { Button, IconButton } from "../Button";
import { FileInputProps, FilePreviewProps } from "./fileinput";
import { isArray } from "lodash";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Form } from "../Form";

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
    _id: "a1",
  },
  {
    name: "Datei 2",
    _id: "a2",
  },
  {
    name: "Datei 3",
    _id: "a3",
  },
  {
    name: "Datei 4",
    _id: "a4",
  },
  {
    name: "Datei 5",
    _id: "a5",
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
  useEffect(() => {
    setInternalFiles(files);
  }, [files]);

  const handleOnClick = (id: string) => {
    if (!multiple) {
      setInternalFiles(id as typeof files);
      return;
    }
    if (internalFiles && internalFiles.includes(id)) {
      const newFiles = [...internalFiles].filter((file) => file !== id);

      setInternalFiles(newFiles as typeof files);
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
              onClick={() => handleOnClick(file._id)}
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

const FilePreview = <T extends boolean>({
  files,
  setFiles,
}: FilePreviewProps<T>) => (
  <div>
    {isArray(files) &&
      files.map((file, i) => (
        <div
          key={`delete_${i}`}
          className="flex flex-row gap-4 items-center justify-start"
        >
          {file}
          <IconButton
            ariaLabel={`delete_${i}`}
            color="danger"
            variant="ghost"
            size="sm"
            icon={XMarkIcon}
            onClick={() => {
              setFiles(files.filter((f) => f !== file) as typeof files);
            }}
          />
        </div>
      ))}
  </div>
);

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
      FilePreview={FilePreview}
      {...args}
    />
  );
};

export const MinMax = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      className="flex flex-col gap-4"
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
    >
      <FileInputButton
        label="Min 3"
        control={formMethods.control}
        required
        multiple
        name="min"
        min={3}
        FileInput={FileInput}
        FilePreview={FilePreview}
        {...args}
      />
      <FileInputButton
        label="Max 1"
        control={formMethods.control}
        required
        multiple
        name="max"
        max={1}
        FileInput={FileInput}
        FilePreview={FilePreview}
        {...args}
      />
      <Button type="submit">Bestätigen</Button>
    </Form>
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
