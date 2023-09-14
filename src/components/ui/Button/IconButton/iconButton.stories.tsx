import { IconHome } from "@tabler/icons-react";
import { Meta } from "@storybook/react";
import React from "react";

import { ThemeProvider } from "../../../../theme";
import {
  buttonVariants,
  colors,
  focusesVariants,
  sizes,
  Sizes as SizesType,
} from "../../../../types";
import { loading } from "../../Loading";
import { notify } from "../../Notify";
import { IconButton } from "./iconButton";

export default {
  title: "UI/Buttons/IconButton",
  component: IconButton,
  argTypes: {
    color: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
    },
    size: {
      control: { type: "select", default: "md" },
    },
    as: { control: false },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row items-start gap-5" {...props} />
);

export const Variants = ({ ...args }) => (
  <Container>
    {buttonVariants.map((variant) => (
      <IconButton
        ariaLabel="home"
        variant={variant}
        key={variant}
        icon={IconHome}
        {...args}
      />
    ))}
  </Container>
);

Variants.parameters = {
  controls: { exclude: "variant" },
};

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <IconButton
        ariaLabel="home"
        color={color}
        key={color}
        icon={IconHome}
        {...args}
      />
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};

export const Focuses = ({ ...args }) => (
  <Container>
    {focusesVariants.map((focus) => (
      <IconButton
        ariaLabel="home"
        focus={focus}
        key={focus}
        icon={IconHome}
        {...args}
      />
    ))}
  </Container>
);

Focuses.parameters = {
  controls: { exclude: "focus" },
};

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size: any) => (
      <IconButton
        ariaLabel="home"
        size={size}
        key={size}
        icon={IconHome}
        {...args}
      />
    ))}
  </Container>
);

Sizes.parameters = {
  controls: { exclude: "size" },
};

export const AsComponent = ({ ...args }) => {
  const components = ["button", "a"];

  return (
    <Container>
      {components.map((component: any) => (
        <IconButton
          ariaLabel="home"
          as={component}
          href="#"
          key={component}
          icon={IconHome}
          {...args}
        />
      ))}
    </Container>
  );
};

export const Rounded = ({ ...args }) => (
  <Container>
    <IconButton ariaLabel="home" rounded icon={IconHome} {...args} />
  </Container>
);

export const Disabled = ({ ...args }) => (
  <Container>
    <IconButton ariaLabel="home" disabled icon={IconHome} {...args} />
    <IconButton
      variant="ghost"
      ariaLabel="home"
      disabled
      icon={IconHome}
      {...args}
    />
    <IconButton
      variant="outline"
      ariaLabel="home"
      disabled
      icon={IconHome}
      {...args}
    />
    <IconButton
      variant="subtile"
      ariaLabel="home"
      disabled
      icon={IconHome}
      {...args}
    />
  </Container>
);

export const IsLoading = ({ ...args }) => {
  const load = (id) => {
    loading(true, { id });
    setTimeout(() => {
      notify({ message: "Nicht mehr laden." });
    }, 2000);
  };

  return (
    <ThemeProvider config={{ allowNotification: true }}>
      <Container className="flex">
        <IconButton
          ariaLabel="button"
          icon={IconHome}
          onClick={() => {
            load("button");
          }}
          loadingId="button"
          {...args}
        >
          Click
        </IconButton>
      </Container>
    </ThemeProvider>
  );
};
