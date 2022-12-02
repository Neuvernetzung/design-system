import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Image } from "./image";

export default {
  title: "UI/Media/Image",
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

export const Default = ({ ...args }) => (
  <Container>
    <Image
      src="/testImage.jpg"
      alt="test Bild"
      isLocal
      className="aspect-video rounded-lg"
    />
  </Container>
);

export const Fallback = ({ ...args }) => (
  <Container>
    <Image
      src="wrong/path.jpg"
      alt="ohne Bild"
      isLocal
      className="aspect-video rounded-lg"
    />
  </Container>
);
