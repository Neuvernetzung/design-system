import { Meta, Story } from "@storybook/react/types-6-0";
import cn from "classnames";
import React from "react";
import { useForm } from "react-hook-form";

import { Button, ColorPicker, Form, Select, Tag } from "../components/ui";
import { borders } from "../styles";
import { Sizes, sizes } from "../types";
import {
  ExtendColors,
  setBorderRadius,
  setColors,
  ThemeProvider,
  useThemeState,
} from ".";

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

type FormProps = {
  colors: Partial<ExtendColors>;
  radius: keyof Sizes;
};

export const Default = ({ ...args }) => {
  const { colorState } = useThemeState();

  const { control, handleSubmit } = useForm<FormProps>({
    values: {
      colors: {
        brand: colorState?.brand[500],
        primary: colorState?.primary[500],
      },
      radius: "md",
    },
  });

  const onSubmit = (data: FormProps) => {
    setColors(":root", data.colors);
    setBorderRadius(":root", data.radius);
  };

  return (
    <Container>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <ColorPicker name="colors.brand" label="brand" control={control} />
        <ColorPicker name="colors.primary" label="primary" control={control} />
        <Select
          name="radius"
          label="border Radius"
          control={control}
          options={sizes.map((size) => ({ children: size, value: size }))}
        />
        <Button type="submit" color="brand">
          Bestätigen
        </Button>
      </Form>
    </Container>
  );
};

export const NestedTheme = ({ ...args }) => {
  const { colorState } = useThemeState();

  const { control, handleSubmit } = useForm<Partial<ExtendColors>>({
    defaultValues: {
      brand: colorState?.brand[500],
    },
  });
  const { control: nestedControl, handleSubmit: handleNestedSubmit } = useForm<
    Partial<ExtendColors>
  >({
    defaultValues: {
      brand: colorState?.primary[500],
    },
  });

  const onSubmit = (data: Partial<ExtendColors>) => {
    setColors(":root", data);
  };

  const onNestedSubmit = (data: Partial<ExtendColors>) => {
    setColors(".container", data);
  };

  return (
    <Container>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <ColorPicker name="brand" label="brand" control={control} />
        <Button type="submit" color="brand">
          Bestätigen
        </Button>
      </Form>
      <div
        className={cn(
          "flex flex-col gap-2 items-start p-4 border",
          borders.accent
        )}
      >
        <Tag color="brand" label=":root" />
        <div className={cn("container border p-4", borders.accent)}>
          <Tag color="brand" label=".container" />
        </div>
      </div>
      <Form
        handleSubmit={handleNestedSubmit}
        onSubmit={onNestedSubmit}
        className="flex flex-col gap-4"
      >
        <ColorPicker name="brand" label="brand" control={nestedControl} />
        <Button type="submit" color="brand">
          Bestätigen
        </Button>
      </Form>
    </Container>
  );
};
