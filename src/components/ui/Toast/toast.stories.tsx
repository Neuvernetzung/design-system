import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Colors as ColorsType } from "../../../types";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
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

export const Colors = ({ ...args }) => {
  const colors: (keyof ColorsType)[] = [
    "primary",
    "accent",
    "success",
    "warn",
    "danger",
  ];

  return (
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
};
