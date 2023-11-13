import { IconHome } from "@tabler/icons-react";
import { Meta } from "@storybook/react";

import { ThemeProvider } from "../../../../theme";
import {
  buttonVariants,
  colors,
  focusesVariants,
  sizes,
} from "../../../../types";
import { loading, useIsLoading } from "../../Loading";
import { notify } from "../../Notify";
import { IconButton } from "./iconButton";
import { ElementType } from "react";

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
    {sizes.map((size) => (
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
  const components: ElementType[] = ["button", "a"];

  return (
    <Container>
      {components.map((component) => (
        <IconButton
          ariaLabel="home"
          as={component}
          href="#"
          key={component.toString()}
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
  const isLoading = useIsLoading();

  const load = () => {
    loading(true);
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
          isLoading={isLoading}
          onClick={() => {
            load();
          }}
          {...args}
        />
      </Container>
    </ThemeProvider>
  );
};
