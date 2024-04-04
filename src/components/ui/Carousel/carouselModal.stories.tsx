import { Button } from "../Button";
import { Image } from "../Image";
import { Carousel, CarouselProps } from ".";
import { CarouselModal, useCarousel } from "./carouselModal";

export default {
  title: "UI/Media/CarouselModal",
  component: CarouselModal,

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

const slides: CarouselProps["slides"] = [
  { children: <Image src="/testImage.jpg" alt="Test-Bild" /> },
  { children: <Image src="/testImage-2.jpg" alt="Test-Bild" /> },
  {
    children: (
      <div className="w-full flex justify-center items-center h-full">Test</div>
    ),
  },
];

export const Default = {
  render: ({ ...args }) => {
    const { setSlideAndOpen, swiperController, swiperModalController } =
      useCarousel({});

    return (
      <Container>
        <Carousel
          controller={swiperController}
          className="h-96"
          slides={slides.map((slide, i) => ({
            children: (
              <Button
                className="w-full h-full !p-0"
                variant="ghost"
                onClick={() => setSlideAndOpen(i)}
                key={i}
              >
                {slide.children}
              </Button>
            ),
          }))}
        />
        <CarouselModal
          controller={swiperModalController}
          slides={slides}
          withThumbs
          {...args}
        />
      </Container>
    );
  },
};
