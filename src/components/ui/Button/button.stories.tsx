import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { IconHome, IconLink, IconStack } from "@tabler/icons-react";

import { ThemeProvider } from "../../../theme";
import {
  buttonVariants,
  extendedColors,
  focusesVariants,
  sizes,
} from "../../../types";
import { loading } from "../Loading";
import { useIsLoading } from "../Loading/loading";
import { notify } from "../Notify";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Buttons/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

const Container = ({ ...props }) => (
  <div className="flex flex-row items-start gap-5" {...props} />
);

export const Variants: Story = {
  render: ({ ...args }) => (
    <Container>
      {buttonVariants.map((variant) => (
        <Button variant={variant} key={variant} {...args}>
          {variant}
        </Button>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "variant" },
  },
};

export const Colors: Story = {
  render: ({ ...args }) => (
    <Container>
      {extendedColors.map((color) => (
        <Button color={color} key={color} {...args}>
          {color}
        </Button>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};

export const Focuses: Story = {
  render: ({ ...args }) => (
    <Container>
      {focusesVariants.map((focus) => (
        <Button focus={focus} key={focus} {...args}>
          {focus}
        </Button>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "focus" },
  },
};

export const Sizes: Story = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <Button size={size} key={size} {...args}>
          {size}
        </Button>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "size" },
  },
};

export const AsChild: Story = {
  render: ({ ...args }) => (
    <Container>
      <Button leftIcon={IconLink} asChild {...args}>
        <a href="#">Anchor</a>
      </Button>
      <Button leftIcon={IconStack} asChild {...args}>
        <div>Div</div>
      </Button>
    </Container>
  ),
};

export const FullWidth: Story = {
  render: ({ ...args }) => (
    <Container>
      <Button className="w-full" {...args}>
        full width
      </Button>
    </Container>
  ),
};

export const ContentAlignment: Story = {
  render: ({ ...args }) => (
    <Container>
      <Button className="!justify-start w-full" {...args}>
        left
      </Button>
      <Button className="!justify-end w-full" {...args}>
        right
      </Button>
    </Container>
  ),
};

export const Rounded: Story = {
  render: ({ ...args }) => (
    <Container>
      <Button rounded {...args}>
        rounded
      </Button>
    </Container>
  ),
};

export const WithIcon: Story = {
  render: ({ ...args }) => (
    <Container>
      <Button leftIcon={IconHome} {...args}>
        left Icon
      </Button>
      <Button rightIcon={IconHome} {...args}>
        right Icon
      </Button>
    </Container>
  ),
};

export const Disabled: Story = {
  render: ({ ...args }) => (
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
  ),
};

export const VeryLong: Story = {
  render: ({ ...args }) => (
    <Container className="flex flex-col gap-4">
      <Button {...args}>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Button>
      <Button {...args}>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        diese Zeile trotzdem anzeigen
      </Button>
      <Button leftIcon={IconHome} {...args}>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Button>
      <Button leftIcon={IconHome} {...args}>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        diese Zeile trotzdem anzeigen
      </Button>
    </Container>
  ),
};

export const IsLoading: Story = {
  render: function Render({ ...args }) {
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
          <Button
            onClick={() => {
              action("button");
              load();
            }}
            isLoading={isLoading}
            {...args}
          >
            Click
          </Button>
        </Container>
      </ThemeProvider>
    );
  },
};
