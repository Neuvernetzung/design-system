import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Carousel } from "./carousel";

export default {
  title: "UI/Media/Carousel",
  component: Carousel,
  argTypes: {},
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Carousel
      images={[
        { src: "/testImage.jpg", alt: "Test Bild", isLocal: true },
        { src: "/testImage-2.jpg", alt: "Test Bild 2", isLocal: true },
      ]}
      className="aspect-video h-96"
      {...args}
    />
  </Container>
);

export const Thumbnails = ({ ...args }) => (
  <Container>
    <Carousel
      images={[
        { src: "/testImage.jpg", alt: "Test Bild", isLocal: true },
        { src: "/testImage-2.jpg", alt: "Test Bild 2", isLocal: true },
      ]}
      className="aspect-video h-96"
      withThumbs
      {...args}
    />
  </Container>
);

export const Pagination = ({ ...args }) => (
  <Container>
    <Carousel
      images={[
        { src: "/testImage.jpg", alt: "Test Bild", isLocal: true },
        { src: "/testImage-2.jpg", alt: "Test Bild 2", isLocal: true },
      ]}
      className="aspect-video h-96"
      withPagination
      {...args}
    />
  </Container>
);

export const Loop = ({ ...args }) => (
  <Container>
    <Carousel
      images={[
        { src: "/testImage.jpg", alt: "Test Bild", isLocal: true },
        { src: "/testImage-2.jpg", alt: "Test Bild 2", isLocal: true },
      ]}
      className="aspect-video h-96"
      loop
      {...args}
    />
  </Container>
);

export const Autoplay = ({ ...args }) => (
  <Container>
    <Carousel
      images={[
        { src: "/testImage.jpg", alt: "Test Bild", isLocal: true },
        { src: "/testImage-2.jpg", alt: "Test Bild 2", isLocal: true },
      ]}
      className="aspect-video h-96"
      autoplay
      {...args}
    />
  </Container>
);
