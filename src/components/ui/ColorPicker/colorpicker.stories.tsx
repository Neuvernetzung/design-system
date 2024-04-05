import { useForm } from "react-hook-form";

import { Button, Form } from "..";
import { ColorPicker } from "./colorpicker";

export default {
  title: "UI/Form/ColorPicker",
  component: ColorPicker,
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
        <ColorPicker
          control={formMethods.control}
          name="colorpicker"
          label="Color Picker"
          {...args}
        />
      </Form>
    );
  },
};

export const Disabled = {
  render: ({ ...args }) => {
    const formMethods = useForm({
      defaultValues: { colorpicker: undefined, colorpicker_default: "#b33636" },
    });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <ColorPicker
          control={formMethods.control}
          name="colorpicker"
          label="Color Picker"
          disabled
          {...args}
        />
        <ColorPicker
          control={formMethods.control}
          name="colorpicker_default"
          label="Color Picker"
          disabled
          {...args}
        />
      </Form>
    );
  },
};

export const Error = {
  render: ({ ...args }) => {
    const formMethods = useForm({
      defaultValues: { error: undefined },
    });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <ColorPicker
          control={formMethods.control}
          name="error"
          label="Color Picker"
          required
          {...args}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};
