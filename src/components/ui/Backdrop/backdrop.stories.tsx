import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Backdrop } from ".";

export default {
  title: "UI/Overlay/Backdrop",
  component: Backdrop,
  argTypes: {},
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Backdrop />
  </Container>
);
