import { HomeIcon } from "@heroicons/react/24/outline";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import React, { ElementType } from "react";

import { ThemeProvider } from "../../../theme";
import {
  buttonVariants,
  extendedColors,
  focusesVariants,
  sizes,
} from "../../../types";
import { loading } from "../Loading";
import { notify } from "../Notify";
import { Button } from "./button";

export default {
  title: "UI/Buttons/Button",
  component: Button,
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
      <Button variant={variant} key={variant} {...args}>
        {variant}
      </Button>
    ))}
  </Container>
);

Variants.parameters = {
  controls: { exclude: "variant" },
};

export const Colors = ({ ...args }) => (
  <Container>
    {extendedColors.map((color) => (
      <Button color={color} key={color} {...args}>
        {color}
      </Button>
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};

export const Focuses = ({ ...args }) => (
  <Container>
    {focusesVariants.map((focus) => (
      <Button focus={focus} key={focus} {...args}>
        {focus}
      </Button>
    ))}
  </Container>
);

Focuses.parameters = {
  controls: { exclude: "focus" },
};

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Button size={size} key={size} {...args}>
        {size}
      </Button>
    ))}
  </Container>
);

Sizes.parameters = {
  controls: { exclude: "size" },
};

export const AsComponent = ({ ...args }) => {
  const components: ElementType[] = ["button", "a"];

  return (
    <Container>
      {components.map((component) => (
        <Button as={component} href="#" key={String(component)} {...args}>
          {String(component)}
        </Button>
      ))}
    </Container>
  );
};

export const FullWidth = ({ ...args }) => (
  <Container>
    <Button fullWidth {...args}>
      full width
    </Button>
  </Container>
);

export const ContentAlignment = ({ ...args }) => (
  <Container>
    <Button className="!justify-start" fullWidth {...args}>
      left
    </Button>
    <Button className="!justify-end" fullWidth {...args}>
      right
    </Button>
  </Container>
);

export const Rounded = ({ ...args }) => (
  <Container>
    <Button rounded {...args}>
      rounded
    </Button>
  </Container>
);

export const WithIcon = ({ ...args }) => (
  <Container>
    <Button leftIcon={HomeIcon} {...args}>
      left Icon
    </Button>
    <Button rightIcon={HomeIcon} {...args}>
      right Icon
    </Button>
  </Container>
);

export const Disabled = ({ ...args }) => (
  <Container>
    <Button disabled {...args}>
      disabled
    </Button>
    <Button variant="ghost" disabled {...args}>
      disabled
    </Button>
    <Button variant="outline" disabled {...args}>
      disabled
    </Button>
    <Button variant="subtile" disabled {...args}>
      disabled
    </Button>
  </Container>
);

export const VeryLong = ({ ...args }) => (
  <Container className="flex flex-col gap-4">
    <Button {...args}>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </Button>
    <Button {...args}>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      diese Zeile trotzdem anzeigen
    </Button>
    <Button leftIcon={HomeIcon} {...args}>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </Button>
    <Button leftIcon={HomeIcon} {...args}>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      diese Zeile trotzdem anzeigen
    </Button>
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
        <Button
          onClick={() => {
            action("button");
            load("button");
          }}
          loadingId="button"
          {...args}
        >
          Click
        </Button>
      </Container>
    </ThemeProvider>
  );
};
