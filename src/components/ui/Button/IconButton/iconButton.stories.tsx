import { IconHome } from "@tabler/icons-react";
import Link from "next/link";

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

export default {
  title: "UI/Buttons/IconButton",
  component: IconButton,
};

const Container = ({ ...props }) => (
  <div className="flex flex-row items-start gap-5" {...props} />
);

export const Variants = {
  render: ({ ...args }) => (
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
  ),

  parameters: {
    controls: { exclude: "variant" },
  },
};

export const Colors = {
  render: ({ ...args }) => (
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
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};

export const Focuses = {
  render: ({ ...args }) => (
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
  ),

  parameters: {
    controls: { exclude: "focus" },
  },
};

export const Sizes = {
  render: ({ ...args }) => (
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
  ),

  parameters: {
    controls: { exclude: "size" },
  },
};

export const AsChild = {
  render: ({ ...args }) => (
    <Container>
      <IconButton asChild ariaLabel="home" icon={IconHome} {...args}>
        <Link href="#" />
      </IconButton>
    </Container>
  ),
};

export const Rounded = {
  render: ({ ...args }) => (
    <Container>
      <IconButton ariaLabel="home" rounded icon={IconHome} {...args} />
    </Container>
  ),
};

export const Disabled = {
  render: ({ ...args }) => (
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
  ),
};

export const IsLoading = {
  render: ({ ...args }) => {
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
  },
};
