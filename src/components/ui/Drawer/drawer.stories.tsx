import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { Drawer } from "./drawer";
import { Button } from "../Button";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

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
        icon={ShoppingCartIcon}
        open={open}
        setOpen={setOpen}
        content="Drawer Content"
        {...args}
      />
    </Container>
  );
};
