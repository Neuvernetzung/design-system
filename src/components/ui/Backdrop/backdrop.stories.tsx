import { Meta } from "@storybook/react";

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
    <Backdrop isOpen {...args} />
  </Container>
);
