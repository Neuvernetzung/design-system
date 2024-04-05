import { useForm } from "react-hook-form";

import { Color, Size, colors, sizes } from "../../../types";
import { Button, Form } from "..";
import { Switch } from ".";
import { SwitchInner } from "./switch";

export default {
  title: "UI/Form/Switch",
  component: SwitchInner,

  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

const formClassName = "flex flex-col gap-5";

export const Sizes = {
  render: ({ ...args }) => {
    const formMethods = useForm<Record<Size, string>>();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {sizes.map((size) => (
          <Switch
            key={size}
            control={formMethods.control}
            size={size}
            name={size}
            content={size}
            {...args}
          />
        ))}
      </Form>
    );
  },

  parameters: {
    controls: { exclude: "size" },
  },
};

export const Colors = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {(
          colors.filter((v) => v !== ("accent" as const)) as Exclude<
            Color,
            "accent"
          >[]
        ).map((color) => (
          <Switch
            key={color}
            control={formMethods.control}
            color={color}
            name={`select_${color}`}
            content={color}
            {...args}
          />
        ))}
      </Form>
    );
  },

  parameters: {
    controls: { exclude: "color" },
  },
};

export const Order = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Switch
          control={formMethods.control}
          name="select_after"
          content="after"
          {...args}
        />
        <Switch
          control={formMethods.control}
          name="select_before"
          content="before"
          reverse
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
        <Switch
          control={formMethods.control}
          name="select_error"
          content="error"
          required
          {...args}
        />
        <Button type="submit">Submit</Button>
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
        <Switch
          control={formMethods.control}
          name="select_disabled"
          content="disabled"
          disabled
          {...args}
        />
      </Form>
    );
  },
};

export const DefaultChecked = {
  render: ({ ...args }) => {
    const formMethods = useForm({ defaultValues: { default_checked: true } });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Switch
          control={formMethods.control}
          name="default_checked"
          {...args}
        />
      </Form>
    );
  },
};
