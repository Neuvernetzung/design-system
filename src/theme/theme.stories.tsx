import { Meta } from "@storybook/react";
import { cn } from "@/utils";
import { useForm } from "react-hook-form";

import {
  Button,
  ColorPicker,
  Form,
  Icon,
  Select,
  Tag,
  Text,
} from "../components/ui";
import { borders } from "../styles";
import { Size, sizes } from "../types";
import {
  ExtendColors,
  setBorderRadius,
  setColors,
  setDarkColors,
  ThemeProvider,
  useThemeState,
  useThemeStore,
} from ".";
import { Icon360, IconHome, IconPlus, IconUpload } from "@tabler/icons-react";

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
  radius: Size;
};

export const Default = () => {
  const { colorState } = useThemeState();
  const themeStore = useThemeStore();

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
    if (!themeStore) return;
    setColors(themeStore, ":root", data.colors);
    setBorderRadius(themeStore, ":root", data.radius);
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

export const DarkTheme = () => {
  const { colorState } = useThemeState();
  const themeStore = useThemeStore();

  const { control, handleSubmit } = useForm<Partial<ExtendColors>>({
    defaultValues: {
      brand: colorState?.brand[500],
    },
  });
  const { control: darkControl, handleSubmit: handleDarkSubmit } = useForm<
    Partial<ExtendColors>
  >({
    defaultValues: {
      brand: colorState?.primary[500],
    },
  });

  const onSubmit = (data: Partial<ExtendColors>) => {
    if (!themeStore) return;
    setColors(themeStore, ":root", data);
  };

  const onDarkSubmit = (data: Partial<ExtendColors>) => {
    if (!themeStore) return;
    setDarkColors(themeStore, `:root`, data);
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
      </div>
      <Form
        handleSubmit={handleDarkSubmit}
        onSubmit={onDarkSubmit}
        className="flex flex-col gap-4"
      >
        <ColorPicker name="brand" label="brand" control={darkControl} />
        <Button type="submit" color="brand">
          Bestätigen
        </Button>
      </Form>
    </Container>
  );
};

export const NestedTheme = () => {
  const { colorState } = useThemeState();
  const themeStore = useThemeStore();

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
  const { control: nestedDarkControl, handleSubmit: handleNestedDarkSubmit } =
    useForm<Partial<ExtendColors>>({
      defaultValues: {
        brand: colorState?.primary[500],
      },
    });

  const onSubmit = (data: Partial<ExtendColors>) => {
    if (!themeStore) return;
    setColors(themeStore, ":root", data);
  };

  const onNestedSubmit = (data: Partial<ExtendColors>) => {
    if (!themeStore) return;
    setColors(themeStore, ".container", data);
  };

  const onNestedDarkSubmit = (data: Partial<ExtendColors>) => {
    if (!themeStore) return;
    setDarkColors(themeStore, ".container", data);
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
        <ColorPicker
          name="brand"
          label="nested brand"
          control={nestedControl}
        />
        <Button type="submit" color="brand">
          Bestätigen
        </Button>
      </Form>
      <Form
        handleSubmit={handleNestedDarkSubmit}
        onSubmit={onNestedDarkSubmit}
        className="flex flex-col gap-4"
      >
        <ColorPicker
          name="brand"
          label="nested dark brand"
          control={nestedDarkControl}
        />
        <Button type="submit" color="brand">
          Bestätigen
        </Button>
      </Form>
    </Container>
  );
};

export const IconStrokeWidth = () => {
  const { iconStrokeWidth } = useThemeState();
  const themeStore = useThemeStore();

  return (
    <Container>
      <div>
        <div className="flex flex-row gap-2">
          <Icon icon={Icon360} />
          <Icon icon={IconPlus} />
          <Icon icon={IconHome} />
          <Icon icon={IconUpload} />
        </div>{" "}
        <Text>Größe: {iconStrokeWidth}</Text>
      </div>
      <div className="flex flex-row gap-2">
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 0.5 })}>
          0.5
        </Button>
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 0.75 })}>
          0.75
        </Button>
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 1 })}>
          1
        </Button>
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 1.25 })}>
          1.25
        </Button>
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 1.5 })}>
          1.5
        </Button>
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 1.75 })}>
          1.75
        </Button>
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 2 })}>
          2
        </Button>
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 2.25 })}>
          2.25
        </Button>
        <Button onClick={() => themeStore?.setState({ iconStrokeWidth: 2.5 })}>
          2.5
        </Button>
      </div>
    </Container>
  );
};
