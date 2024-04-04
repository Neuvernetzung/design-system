import { Backdrop } from ".";

export default {
  title: "UI/Overlay/Backdrop",
  component: Backdrop,
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <Backdrop isOpen {...args} />
    </Container>
  ),
};
