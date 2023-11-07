import { IconShoppingCart } from "@tabler/icons-react";
import { Meta } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../Button";
import { Drawer, drawerPlacements } from "./drawer";

export default {
  title: "UI/Overlay/Drawer",
  component: Drawer,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Drawer
      title="Test"
      icon={IconShoppingCart}
      content="Drawer Content"
      {...args}
    >
      <Button>Öffnen</Button>
    </Drawer>
  </Container>
);

export const Directions = ({ ...args }) => (
  <Container>
    {drawerPlacements.map((placement) => (
      <Drawer
        key={placement}
        placement={placement}
        title="Test"
        icon={IconShoppingCart}
        content="Drawer Content"
        {...args}
      >
        <Button>{placement}</Button>
      </Drawer>
    ))}
  </Container>
);

export const Controlled = ({ ...args }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Button
        color={open ? "success" : "accent"}
        onClick={() => {
          setOpen(true);
        }}
      >
        {open ? "Offen" : "Zu"}
      </Button>
      <Drawer
        open={open}
        setOpen={setOpen}
        title="Test"
        icon={IconShoppingCart}
        content="Drawer Content"
        {...args}
      />
    </Container>
  );
};
