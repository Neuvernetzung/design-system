import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { ExtendColors, setColors, ThemeProvider, useColorState } from ".";
import { Button, Form, ColorPicker } from "../components/ui";

export default {
  title: "THEME/ThemeProvider",
  component: ThemeProvider,
  argTypes: {},
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => {
  const { colorState } = useColorState();

  const { control, handleSubmit } = useForm<Partial<ExtendColors>>({
    defaultValues: {
      brand: colorState?.brand[500],
      primary: colorState?.primary[500],
    },
  });

  const onSubmit = (data: Partial<ExtendColors>) => {
    setColors(":root", data);
  };

  return (
    <Container>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <ColorPicker name="brand" label="brand" control={control} />
        <ColorPicker name="primary" label="primary" control={control} />
        <Button type="submit" color="brand">
          Bestätigen
        </Button>
      </Form>
    </Container>
  );
};

Default.parameters = {
  a11y: {
    disable: true,
  },
};
