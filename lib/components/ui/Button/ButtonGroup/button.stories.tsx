import { HomeIcon } from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import ButtonGroup from "./buttonGroup";
import { Button, IconButton } from "../../";

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

export const Variants = ({ ...args }) => {
  return (
    <Container>
      <ButtonGroup>
        <Button {...args}>Button 1</Button>
        <Button {...args}>Button 2</Button>
        <IconButton ariaLabel="home" icon={HomeIcon} {...args} />
      </ButtonGroup>
    </Container>
  );
};
