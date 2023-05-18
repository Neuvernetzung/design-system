import { Meta } from "@storybook/react";
import React from "react";

import { Carousel } from "./carousel";
import { Image } from "../Image";

export default {
  title: "UI/Media/Carousel",
  component: Carousel,
  argTypes: {},
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Carousel
      slides={[
        { children: <Image src="/testImage.jpg" alt="Test-Bild" isLocal /> },
        { children: <Image src="/testImage-2.jpg" alt="Test-Bild" isLocal /> },
        {
          children: (
            <div className="w-full flex justify-center items-center h-full">
              Test
            </div>
          ),
        },
      ]}
      className="aspect-video h-96"
      {...args}
    />
  </Container>
);

export const Thumbnails = ({ ...args }) => (
  <Container>
    <Carousel
      slides={[
        { children: <Image src="/testImage.jpg" alt="Test-Bild" isLocal /> },
        { children: <Image src="/testImage-2.jpg" alt="Test-Bild" isLocal /> },
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
      slides={[
        { children: <Image src="/testImage.jpg" alt="Test-Bild" isLocal /> },
        { children: <Image src="/testImage-2.jpg" alt="Test-Bild" isLocal /> },
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
      slides={[
        { children: <Image src="/testImage.jpg" alt="Test-Bild" isLocal /> },
        { children: <Image src="/testImage-2.jpg" alt="Test-Bild" isLocal /> },
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
      slides={[
        { children: <Image src="/testImage.jpg" alt="Test-Bild" isLocal /> },
        { children: <Image src="/testImage-2.jpg" alt="Test-Bild" isLocal /> },
      ]}
      className="aspect-video h-96"
      autoplay
      {...args}
    />
  </Container>
);
