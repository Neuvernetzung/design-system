import { Meta } from "@storybook/react";

import { IconX, IconHome } from "@tabler/icons-react";
import { Button, IconButton } from "../..";
import ButtonGroup from "./buttonGroup";

export default {
  title: "UI/Buttons/ButtonGroup",
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
  <div className="flex flex-col gap-5" {...props} />
);

export const Variants = ({ ...args }) => (
  <Container>
    <ButtonGroup>
      <Button {...args}>Button 1</Button>
      <Button {...args}>Button 2</Button>
      <IconButton ariaLabel="home" icon={IconHome} {...args} />
    </ButtonGroup>
  </Container>
);

export const DifferentSizes = ({ ...args }) => (
  <Container>
    <ButtonGroup>
      <Button className="h-12" {...args}>
        Close
      </Button>
      <IconButton size="sm" ariaLabel="home" icon={IconX} {...args} />
    </ButtonGroup>
  </Container>
);

export const Directions = ({ ...args }) => (
  <Container>
    <ButtonGroup direction="vertical" className="w-16">
      <Button className="h-12" {...args}>
        Close
      </Button>
      <IconButton size="sm" ariaLabel="home" icon={IconX} {...args} />
    </ButtonGroup>
    <ButtonGroup direction="horizontal">
      <Button className="h-12" {...args}>
        Close
      </Button>
      <IconButton size="sm" ariaLabel="home" icon={IconX} {...args} />
    </ButtonGroup>
  </Container>
);
