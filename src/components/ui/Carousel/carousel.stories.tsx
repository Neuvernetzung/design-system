import { Carousel } from "./carousel";
import { Image } from "../Image";

export default {
  title: "UI/Media/Carousel",
  component: Carousel,

  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <Carousel
        slides={[
          { children: <Image src="/testImage.jpg" alt="Test-Bild" /> },
          { children: <Image src="/testImage-2.jpg" alt="Test-Bild" /> },
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
  ),
};

export const Thumbnails = {
  render: ({ ...args }) => (
    <Container>
      <Carousel
        slides={[
          { children: <Image src="/testImage.jpg" alt="Test-Bild" /> },
          { children: <Image src="/testImage-2.jpg" alt="Test-Bild" /> },
        ]}
        className="aspect-video h-96"
        withThumbs
        {...args}
      />
    </Container>
  ),
};

export const Pagination = {
  render: ({ ...args }) => (
    <Container>
      <Carousel
        slides={[
          { children: <Image src="/testImage.jpg" alt="Test-Bild" /> },
          { children: <Image src="/testImage-2.jpg" alt="Test-Bild" /> },
        ]}
        className="aspect-video h-96"
        withPagination
        {...args}
      />
    </Container>
  ),
};

export const Loop = {
  render: ({ ...args }) => (
    <Container>
      <Carousel
        slides={[
          { children: <Image src="/testImage.jpg" alt="Test-Bild" /> },
          { children: <Image src="/testImage-2.jpg" alt="Test-Bild" /> },
        ]}
        className="aspect-video h-96"
        loop
        {...args}
      />
    </Container>
  ),
};

export const Autoplay = {
  render: ({ ...args }) => (
    <Container>
      <Carousel
        slides={[
          { children: <Image src="/testImage.jpg" alt="Test-Bild" /> },
          { children: <Image src="/testImage-2.jpg" alt="Test-Bild" /> },
        ]}
        className="aspect-video h-96"
        autoplay
        {...args}
      />
    </Container>
  ),
};
