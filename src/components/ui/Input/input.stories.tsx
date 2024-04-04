import { IconPhone } from "@tabler/icons-react";

import { cn } from "@/utils";
import { useForm } from "react-hook-form";

import { Button, Form, Icon, Text } from "..";
import { Input } from ".";
import { inputVariants, sizes } from "../../../types";

export default {
  title: "UI/Form/Input",
  component: Input,

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
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {inputVariants.map((variant, i) => (
          <Input
            control={formMethods.control}
            name={`${variant}_input_${i}`}
            variant={variant}
            key={variant}
            placeholder={variant}
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
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {sizes.map((size, i) => (
          <Input
            control={formMethods.control}
            name={`${size}_input_${i}`}
            size={size}
            key={size}
            placeholder={size}
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

export const Error = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {inputVariants.map((variant, i) => (
          <Input
            control={formMethods.control}
            name={`${variant}_input_${i}`}
            variant={variant}
            key={variant}
            placeholder={variant}
            required
            {...args}
          />
        ))}

        <Button type="submit">Bestätigen</Button>
      </Form>
    );
  },
};

export const Addons = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Input
          control={formMethods.control}
          name="input-left-addon"
          placeholder="left Addon"
          leftAddon={{ children: "+49" }}
          required
          {...args}
        />
        <Input
          control={formMethods.control}
          name="input-right-addon"
          placeholder="right Addon"
          rightAddon={{ children: "€" }}
          required
          {...args}
        />
        <Input
          control={formMethods.control}
          name="input-both-addons"
          placeholder="both Addons"
          leftAddon={{ children: "https://" }}
          rightAddon={{ children: ".com" }}
          required
          {...args}
        />
      </Form>
    );
  },
};

export const Elements = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Input
          control={formMethods.control}
          name="input-left-element"
          placeholder="left Element"
          leftElement={{ children: <Icon icon={IconPhone} /> }}
          required
          {...args}
        />
        <Input
          control={formMethods.control}
          name="input-right-element"
          placeholder="right Element"
          rightElement={{ children: <Icon icon={IconPhone} /> }}
          required
          {...args}
        />
        <Input
          control={formMethods.control}
          name="input-both-elements"
          placeholder="both Elements"
          leftElement={{ children: <Icon icon={IconPhone} /> }}
          rightElement={{ children: <Icon icon={IconPhone} /> }}
          required
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
        <Input
          control={formMethods.control}
          name="input-disabled"
          placeholder="disabled"
          disabled
          {...args}
        />
      </Form>
    );
  },
};

export const DefaultValue = {
  render: ({ ...args }) => {
    const formMethods = useForm({
      defaultValues: { "input-default": "Default Value" },
    });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Input
          control={formMethods.control}
          name="input-default"
          placeholder="default"
          {...args}
        />
      </Form>
    );
  },
};

export const Types = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    const types = ["text", "number", "password", "url"] as const;

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {types.map((type) => (
          <Input
            key={type}
            type={type}
            control={formMethods.control}
            name={`input_${type}`}
            placeholder={type}
            {...args}
          />
        ))}
      </Form>
    );
  },
};

export const NumberType = {
  render: ({ ...args }) => {
    const formMethods = useForm<{ number: number; defaultNumber: number }>({
      defaultValues: { defaultNumber: 123 },
    });
    const { number, defaultNumber } = formMethods.watch();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Text>{number}</Text>
        <Input
          type="number"
          control={formMethods.control}
          name="number"
          placeholder="Nummer eingeben."
          step={0.01}
          required
          {...args}
        />
        <Text>{defaultNumber}</Text>
        <Input
          type="number"
          control={formMethods.control}
          name="defaultNumber"
          placeholder="Nummer eingeben."
          required
          step={0.01}
          {...args}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

type TestFormProps = {
  email: string;
  name: string;
  nachname: string;
  straße: string;
  hausnummer: number;
};

export const TestForm = {
  render: ({ ...args }) => {
    const { control, handleSubmit } = useForm<TestFormProps>();

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={() => {}}
        className={cn(formClassName, "max-w-xl")}
      >
        <Input control={control} name="email" label="Email" {...args} />
        <div className="flex flex-row gap-2">
          <Input control={control} name="name" label="Name" {...args} />
          <Input
            control={control}
            name="nachname"
            label="Nachname"
            className="w-full"
            {...args}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Input
            control={control}
            name="straße"
            label="Straße"
            className="w-full"
            {...args}
          />
          <Input
            control={control}
            name="hausnummer"
            label="Hausnummer"
            {...args}
          />
        </div>
      </Form>
    );
  },
};
