import { IconX, IconHome } from "@tabler/icons-react";
import { Button, IconButton } from "../..";
import { ButtonGroup } from "./buttonGroup";

export default {
  title: "UI/Buttons/ButtonGroup",
  component: Button,
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Variants = {
  render: ({ ...args }) => (
    <Container>
      <ButtonGroup>
        <Button {...args}>Button 1</Button>
        <Button {...args}>Button 2</Button>
        <IconButton ariaLabel="home" icon={IconHome} {...args} />
      </ButtonGroup>
    </Container>
  ),
};

export const DifferentSizes = {
  render: ({ ...args }) => (
    <Container>
      <ButtonGroup>
        <Button className="h-12" {...args}>
          Close
        </Button>
        <IconButton size="sm" ariaLabel="home" icon={IconX} {...args} />
      </ButtonGroup>
    </Container>
  ),
};

export const Directions = {
  render: ({ ...args }) => (
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
  ),
};
