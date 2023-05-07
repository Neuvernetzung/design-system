import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Meta } from "@storybook/react";
import React from "react";

import { colors } from "../../../types";
import { Toast, ToastVariants } from "./toast";

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

export const Variants = ({ ...args }) => {
  const variants: (keyof ToastVariants)[] = ["outline", "solid"];

  return (
    <Container>
      {variants.map((variant) => (
        <Toast
          variant={variant}
          key={variant}
          icon={ExclamationTriangleIcon}
          message={`Dies ist eine ${variant} Benachrichtigung`}
          handleClose={() => {}}
          {...args}
        />
      ))}
    </Container>
  );
};

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <Toast
        color={color}
        key={color}
        icon={ExclamationTriangleIcon}
        message={`Dies ist eine ${color} Benachrichtigung`}
        handleClose={() => {}}
        {...args}
      />
    ))}
  </Container>
);

Colors.parameters = {
  controls: { exclude: "color" },
};
export const LongWords = ({ ...args }) => (
  <Container>
    <Toast
      icon={ExclamationTriangleIcon}
      message="Dies ist eine seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeehr lange Benachrichtigung"
      handleClose={() => {}}
      {...args}
    />
    <Toast
      icon={ExclamationTriangleIcon}
      message="Dies ist eine error Benachrichtigung für den Pfad test.pfad.irgendwas.langes"
      handleClose={() => {}}
      {...args}
    />
  </Container>
);
