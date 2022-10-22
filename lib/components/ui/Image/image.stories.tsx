import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Image } from "./image";

export default {
  title: "UI/Image",
  component: Image,
  argTypes: {
    size: {
      control: { type: "select" },
    },
  },
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => {
  return (
    <Container>
      <Image
        src="/testImage.jpg"
        alt="test Bild"
        isLocal
        className="aspect-video rounded-lg"
      />
    </Container>
  );
};
