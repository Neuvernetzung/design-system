import { IconShoppingCart } from "@tabler/icons-react";

import { useState } from "react";

import { Button } from "../Button";
import { Drawer, drawerPlacements } from "./drawer";

export default {
  title: "UI/Overlay/Drawer",
  component: Drawer,
} ;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
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
  ),
};

export const Directions = {
  render: ({ ...args }) => (
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
  ),
};

export const Controlled = {
  render: ({ ...args }) => {
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
  },
};
