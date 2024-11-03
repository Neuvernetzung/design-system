import { Meta, StoryObj } from "@storybook/react";
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

const meta: Meta<typeof IconButton> = {
  title: "UI/Buttons/IconButton",
  component: IconButton,
};

export default meta;

type Story = StoryObj<typeof IconButton>;

const Container = ({ ...props }) => (
  <div className="flex flex-row items-start gap-5" {...props} />
);

export const Variants: Story = {
  render: ({ ariaLabel: argsAriaLabel, icon: argsIcon, ...args }) => (
    <Container>
      {buttonVariants.map((variant) => (
        <IconButton
          ariaLabel={argsAriaLabel || "home"}
          variant={variant}
          key={variant}
          icon={argsIcon || IconHome}
          {...args}
        />
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "variant" },
  },
};

export const Colors: Story = {
  render: ({ ariaLabel: argsAriaLabel, icon: argsIcon, ...args }) => (
    <Container>
      {colors.map((color) => (
        <IconButton
          ariaLabel={argsAriaLabel || "home"}
          color={color}
          key={color}
          icon={argsIcon || IconHome}
          {...args}
        />
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};

export const Focuses: Story = {
  render: ({ ariaLabel: argsAriaLabel, icon: argsIcon, ...args }) => (
    <Container>
      {focusesVariants.map((focus) => (
        <IconButton
          ariaLabel={argsAriaLabel || "home"}
          focus={focus}
          key={focus}
          icon={argsIcon || IconHome}
          {...args}
        />
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "focus" },
  },
};

export const Sizes: Story = {
  render: ({ ariaLabel: argsAriaLabel, icon: argsIcon, ...args }) => (
    <Container>
      {sizes.map((size) => (
        <IconButton
          ariaLabel={argsAriaLabel || "home"}
          size={size}
          key={size}
          icon={argsIcon || IconHome}
          {...args}
        />
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "size" },
  },
};

export const AsChild: Story = {
  render: ({
    ariaLabel: argsAriaLabel,
    icon: argsIcon,
    children,
    asChild,
    ...args
  }) => (
    <Container>
      <IconButton
        asChild={asChild || true}
        ariaLabel={argsAriaLabel || "home"}
        icon={argsIcon || IconHome}
        {...args}
      >
        {children || <Link href="#" />}
      </IconButton>
    </Container>
  ),
};

export const Rounded: Story = {
  render: ({ ariaLabel: argsAriaLabel, icon: argsIcon, ...args }) => (
    <Container>
      <IconButton
        rounded
        ariaLabel={argsAriaLabel || "home"}
        icon={argsIcon || IconHome}
        {...args}
      />
    </Container>
  ),
};

export const Disabled: Story = {
  render: ({ ariaLabel: argsAriaLabel, icon: argsIcon, ...args }) => (
    <Container>
      <IconButton
        disabled
        ariaLabel={argsAriaLabel || "home"}
        icon={argsIcon || IconHome}
        {...args}
      />
      <IconButton
        variant="ghost"
        disabled
        ariaLabel={argsAriaLabel || "home"}
        icon={argsIcon || IconHome}
        {...args}
      />
      <IconButton
        variant="outline"
        disabled
        ariaLabel={argsAriaLabel || "home"}
        icon={argsIcon || IconHome}
        {...args}
      />
      <IconButton
        variant="subtile"
        disabled
        ariaLabel={argsAriaLabel || "home"}
        icon={argsIcon || IconHome}
        {...args}
      />
    </Container>
  ),
};

export const IsLoading: Story = {
  render: function Render({
    ariaLabel: argsAriaLabel,
    icon: argsIcon,
    ...args
  }) {
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
            ariaLabel={argsAriaLabel || "button"}
            icon={argsIcon || IconHome}
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
