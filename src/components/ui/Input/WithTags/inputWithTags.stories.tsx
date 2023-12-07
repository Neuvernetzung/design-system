import { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { Button, Form } from "../..";
import { InputWithTags } from ".";

export default {
  title: "UI/Form/InputWithTags",
  component: InputWithTags,
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

const formClassName = "flex flex-col gap-5";

export const Default = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <InputWithTags
        control={formMethods.control}
        name="input"
        placeholder="Hashtag eingeben"
        notFoundText="Keine Hashtags gefunden."
        {...args}
      />
    </Form>
  );
};

export const Disabled = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <InputWithTags
        control={formMethods.control}
        name="input"
        disabled
        placeholder="Hashtag eingeben"
        notFoundText="Keine Hashtags gefunden."
        {...args}
      />
    </Form>
  );
};

export const DefaultValue = ({ ...args }) => {
  const formMethods = useForm({ defaultValues: { input: ["Test", "Tag"] } });

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <InputWithTags
        control={formMethods.control}
        name="input"
        placeholder="Hashtag eingeben"
        notFoundText="Keine Hashtags gefunden."
        {...args}
      />
    </Form>
  );
};

export const Error = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <InputWithTags
        control={formMethods.control}
        name="input"
        required
        placeholder="Hashtag eingeben"
        notFoundText="Keine Hashtags gefunden."
        {...args}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
