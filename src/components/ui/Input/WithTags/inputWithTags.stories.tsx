import { useForm } from "react-hook-form";

import { Button, Form } from "../..";
import { InputWithTags } from ".";

export default {
  title: "UI/Form/InputWithTags",
  component: InputWithTags,

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
  },
};

export const Disabled = {
  render: ({ ...args }) => {
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
  },
};

export const DefaultValue = {
  render: ({ ...args }) => {
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
  },
};

export const Error = {
  render: ({ ...args }) => {
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
  },
};
