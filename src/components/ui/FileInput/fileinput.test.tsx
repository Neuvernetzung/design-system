import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { FileInputButton } from ".";
import { FileInputProps } from "./fileinput";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { useState } from "react";

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
          {[{ _id: "1", name: "1" }].map((file, i) => (
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

const ExtendedForm = () => {
  const { control } = useForm();

  return (
    <FileInputButton
      control={control}
      name="FileInput"
      label="FileInput"
      FileInput={FileInput}
    />
  );
};

it("FileInput axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
