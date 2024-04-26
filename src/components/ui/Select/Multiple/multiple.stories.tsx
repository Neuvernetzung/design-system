import { useController, useForm } from "react-hook-form";

import { inputVariants, sizes } from "../../../../types";
import { Button, Form, SelectOptionProps } from "../..";
import { SelectMultiple } from ".";

export default {
  title: "UI/Form/SelectMultiple",
  component: SelectMultiple,

  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

const formClassName = "flex flex-col gap-5";

export const Variants = {
  render: ({ ...args }) => {
    const { control, handleSubmit } = useForm();

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <div className="flex flex-col items-center">
          <div className="w-32">
            <SelectMultiple
              allowReset
              control={control}
              name="select"
              label="Default"
              options={[
                { children: "Option 1", value: "option-1" },
                { children: "Option 2", value: "option-2" },
              ]}
              {...args}
            />
          </div>
        </div>
        {inputVariants.map((variant) => (
          <SelectMultiple
            key={variant}
            allowReset
            label={variant}
            control={control}
            variant={variant}
            name={`select_${variant}`}
            options={[
              { children: "Option 1", value: "option-1" },
              { children: "Option 2", value: "option-2" },
            ]}
            {...args}
          />
        ))}
      </Form>
    );
  },

  parameters: {
    controls: { exclude: "variant" },
  },
};

export const Sizes = {
  render: ({ ...args }) => {
    const { control, handleSubmit } = useForm();

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {sizes.map((size) => (
          <SelectMultiple
            key={size}
            allowReset
            control={control}
            size={size}
            name={`select_${size}`}
            options={[
              { children: "Option 1", value: "option-1" },
              { children: "Option 2", value: "option-2" },
            ]}
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

export const Checked = {
  render: ({ ...args }) => {
    const formMethods = useForm();
    const options: SelectOptionProps[] = [
      { children: "Option 1", value: "option-1" },
      { children: "Option 2", value: "option-2" },
      { children: "Option 3", value: "option-3" },
      { children: "Option 4", value: "option-4" },
      { children: "Option 5", value: "option-5" },
      { type: "separator" },
      { children: "Option 6", value: "option-6" },
      { children: "Option 7", value: "option-7" },
      { children: "Option 8", value: "option-8" },
      { children: "Option 9", value: "option-9" },
    ];

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <SelectMultiple
          control={formMethods.control}
          name="select_multiple"
          options={options}
          label="CheckMark"
          {...args}
        />
        <SelectMultiple
          control={formMethods.control}
          name="select_multiple"
          options={options}
          label="Hide active"
          checkedType="hidden"
          {...args}
        />
        <SelectMultiple
          control={formMethods.control}
          name="select_multiple"
          options={options}
          label="Checkbox"
          checkedType="checkbox"
          {...args}
        />
      </Form>
    );
  },
};

export const MultipleType = {
  render: ({ ...args }) => {
    const formMethods = useForm();
    const options = [
      { children: "Option 1", value: "option-1" },
      { children: "Option 2", value: "option-2" },
      { children: "Option 3", value: "option-3" },
      { children: "Option 4", value: "option-4" },
      { children: "Option 5", value: "option-5" },
      { children: "Option 6", value: "option-6" },
      { children: "Option 7", value: "option-7" },
      { children: "Option 8", value: "option-8" },
      { children: "Option 9", value: "option-9" },
    ];

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <SelectMultiple
          control={formMethods.control}
          name="select_multiple"
          options={options}
          label="Indikator"
          {...args}
        />
        <SelectMultiple
          control={formMethods.control}
          name="select_multiple_tags"
          options={options}
          label="Tags"
          multipleType="tags"
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
        <SelectMultiple
          control={formMethods.control}
          label="Komplett disabled"
          name="select_all_disabled"
          options={[
            {
              children: "Option 1",
              value: "option-1",
            },
            {
              children: "Option 2",
              value: "option-2",
            },
          ]}
          disabled
          {...args}
        />
      </Form>
    );
  },
};

export const DefaultValue = {
  render: ({ ...args }) => {
    const { control, handleSubmit } = useForm({
      defaultValues: { default_value: ["option-2"] },
    });

    const options = [
      {
        children: "Option 1",
        value: "option-1",
      },
      {
        children: "Option 2",
        value: "option-2",
      },
    ];

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <SelectMultiple
          control={control}
          name="default_value"
          options={options}
          {...args}
        />
      </Form>
    );
  },
};

export const Reset = {
  render: ({ ...args }) => {
    const { control, handleSubmit, watch } = useForm({
      defaultValues: { reset: "option-1" },
    });

    const {
      field: { onChange },
    } = useController({ control, name: "reset" });

    const values = watch();

    const options = [
      {
        children: "Option 1",
        value: "option-1",
      },
      {
        children: "Option 2",
        value: "option-2",
      },
    ];

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <SelectMultiple
          control={control}
          name="reset"
          options={options}
          allowReset
          {...args}
        />
        <Button onClick={() => onChange([])}>Reset</Button>
        {JSON.stringify(values)}
      </Form>
    );
  },
};
