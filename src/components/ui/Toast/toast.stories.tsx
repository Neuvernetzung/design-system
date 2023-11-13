import { IconAlertTriangle } from "@tabler/icons-react";
import { Meta } from "@storybook/react";

import { colors, toastVariants } from "../../../types";
import { Toast } from "./toast";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";

export default {
  title: "UI/Overlay/Toast",
  component: Toast,
  argTypes: {
    size: {
      control: { type: "select" },
    },
  },
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Variants = ({ ...args }) => (
  <Container>
    <ToastProvider>
      {toastVariants.map((variant) => (
        <Toast
          variant={variant}
          key={variant}
          icon={IconAlertTriangle}
          message={`Dies ist eine ${variant} Benachrichtigung`}
          open
          setOpen={() => {}}
          {...args}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  </Container>
);

export const Colors = ({ ...args }) => (
  <Container>
    <ToastProvider>
      {colors.map((color) => (
        <Toast
          color={color}
          key={color}
          icon={IconAlertTriangle}
          message={`Dies ist eine ${color} Benachrichtigung`}
          open
          setOpen={() => {}}
          {...args}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};
export const LongWords = ({ ...args }) => (
  <Container>
    <ToastProvider>
      <Toast
        icon={IconAlertTriangle}
        message="Dies ist eine seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeehr lange Benachrichtigung"
        open
        setOpen={() => {}}
        {...args}
      />
      <Toast
        icon={IconAlertTriangle}
        message="Dies ist eine error Benachrichtigung für den Pfad test.pfad.irgendwas.langes"
        open
        setOpen={() => {}}
        {...args}
      />
      <ToastViewport />
    </ToastProvider>
  </Container>
);

export const Title = ({ ...args }) => (
  <Container>
    <ToastProvider>
      <Toast
        icon={IconAlertTriangle}
        title="Dies ist ein Titel"
        message="Dies ist die Beschreibung"
        open
        setOpen={() => {}}
        {...args}
      />
      <ToastViewport />
    </ToastProvider>
  </Container>
);
