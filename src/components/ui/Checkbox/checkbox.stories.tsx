import {
  IconChevronDown,
  IconChevronUp,
  IconHome,
  IconPlus,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";

import { checkboxVariants, colors, sizes } from "../../../types";
import { Button, Form } from "..";
import { Icon as IconComponent } from "../Icon";
import { Checkbox } from ".";

export default {
  title: "UI/Form/Checkbox",
  component: Checkbox,

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
        <Checkbox
          control={formMethods.control}
          name="checkbox-1"
          label="Einzelne Option"
          options={[{ label: "Option 1", value: "option-1" }]}
          {...args}
        />
        <Checkbox
          control={formMethods.control}
          name="checkbox-2"
          label="Mehrere Optionen"
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
      </Form>
    );
  },
};

export const Sizes = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {sizes.map((size) => (
          <Checkbox
            key={size}
            control={formMethods.control}
            name={`checkbox_${size}`}
            label={size}
            size={size}
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
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

export const Colors = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {colors.map((color) => (
          <Checkbox
            key={color}
            control={formMethods.control}
            name={`checkbox_${color}`}
            label={color}
            color={color}
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
            ]}
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

export const Variants = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {checkboxVariants.map((variant) => (
          <Checkbox
            key={variant}
            control={formMethods.control}
            name={`checkbox_${variant}`}
            label={variant}
            variant={variant}
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
            ]}
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

export const Icon = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Checkbox
          control={formMethods.control}
          name="checkbox_icons_default"
          label="Default"
          options={[{ label: "Default", value: "option-1" }]}
          {...args}
        />
        <Checkbox
          control={formMethods.control}
          name="checkbox_icons_plus"
          label="Plus"
          icon={IconPlus}
          options={[{ label: "Plus", value: "option-1" }]}
          {...args}
        />
        <Checkbox
          control={formMethods.control}
          name="checkbox_icons_home"
          label="Home"
          icon={IconHome}
          options={[{ label: "Home", value: "option-1" }]}
          {...args}
        />
        <Checkbox
          control={formMethods.control}
          name="checkbox_icons_single"
          label="Einzelnd"
          options={[
            { label: "Default", value: "option-1" },
            { label: "Plus", value: "option-2", icon: IconPlus },
          ]}
          {...args}
        />
      </Form>
    );
  },
};

type DisabledProps = {
  checkbox_disabled: string[];
  checkbox_disabled_single: string[];
};

export const Disabled = {
  render: ({ ...args }) => {
    const formMethods = useForm<DisabledProps>({
      defaultValues: { checkbox_disabled: ["option-2"] },
    });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Checkbox
          control={formMethods.control}
          name="checkbox_disabled"
          label="Alle Disabled"
          disabled
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
        <Checkbox
          control={formMethods.control}
          name="checkbox_disabled_single"
          label="Einzelnd Disabled"
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2", disabled: true },
          ]}
          {...args}
        />
      </Form>
    );
  },
};

type ErrorProps = {
  checkbox_error: string[];
};

export const Error = {
  render: ({ ...args }) => {
    const formMethods = useForm<ErrorProps>();
    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Checkbox
          control={formMethods.control}
          name="checkbox_error"
          label="Alle Error"
          required
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const DefaultValue = {
  render: ({ ...args }) => {
    const formMethods = useForm({
      defaultValues: { checkbox_default: ["option-2"] },
    });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Checkbox
          control={formMethods.control}
          name="checkbox_default"
          label="Default Value"
          required
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const ElementAsLabel = {
  render: ({ ...args }) => {
    const formMethods = useForm({});

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Checkbox
          control={formMethods.control}
          name="checkbox_default"
          label="Default Value"
          required
          options={[
            {
              label: <IconComponent icon={IconChevronUp} />,
              value: "option-1",
            },
            {
              label: <IconComponent icon={IconChevronDown} />,
              value: "option-2",
            },
          ]}
          {...args}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};
