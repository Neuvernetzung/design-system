import { IconShoppingCart } from "@tabler/icons-react";
import { Meta } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../Button";
import { Drawer } from "./drawer";

export default {
  title: "UI/Overlay/Drawer",
  component: Drawer,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => setOpen(true)}>Öffnen</Button>
      <Drawer
        title="Test"
        icon={IconShoppingCart}
        open={open}
        setOpen={setOpen}
        content="Drawer Content"
        {...args}
      />
    </Container>
  );
};
