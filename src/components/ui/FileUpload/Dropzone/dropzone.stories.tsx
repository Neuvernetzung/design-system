import { useState } from "react";
import { useForm } from "react-hook-form";
import { sizes } from "../../../../types";

import { Button, Form } from "../..";
import { FileUploadPreview } from "../UploadPreview";
import { Dropzone } from ".";
import { Input } from "../../Input";
import { cn } from "@/utils";

export default {
  title: "UI/Form/Dropzone",
  component: Dropzone,

  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

const formClassName = "flex flex-col gap-5";

export const Default = {
  render: ({ ...args }) => {
    const formMethods = useForm<{ dropzone: File[] }>();
    const files = formMethods.watch("dropzone");
    const remove = (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);

      formMethods.setValue("dropzone", newFiles);
    };

    const [started, setStarted] = useState(false);

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {
          setStarted(!started);
        }}
        className={formClassName}
      >
        <Dropzone
          label="Dateiupload"
          control={formMethods.control}
          required
          name="dropzone"
          {...args}
        />
        {files?.map((file, i) => (
          <FileUploadPreview
            key={i}
            started={started}
            uploaded={0}
            file={file}
            progress={0}
            remove={() => remove(i)}
          />
        ))}
        <Button color={started ? "accent" : "primary"} type="submit">
          {started ? "Abbruch" : "Start"}
        </Button>
      </Form>
    );
  },
};

export const Sizes = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    const [started, setStarted] = useState(false);

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {
          setStarted(!started);
        }}
        className={formClassName}
      >
        {sizes.map((size) => (
          <Dropzone
            label={size}
            size={size}
            key={size}
            control={formMethods.control}
            required
            name={size}
            {...args}
          />
        ))}
      </Form>
    );
  },
};

export const Direction = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    const [started, setStarted] = useState(false);

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {
          setStarted(!started);
        }}
        className={cn(formClassName, "!flex-row")}
      >
        <Input label="test" control={formMethods.control} name="test" />
        <Dropzone
          label="row"
          control={formMethods.control}
          required
          name="row"
          flexRow
          {...args}
        />
      </Form>
    );
  },
};
