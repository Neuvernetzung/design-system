import { NextImageWithFallback } from "./index";

export default {
  title: "UI/Media/Image",
  component: NextImageWithFallback,
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5 w-64 aspect-video" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <NextImageWithFallback
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"
        alt="test Bild"
        className="aspect-video rounded-lg"
        height={800}
        width={800}
        {...args}
      />
    </Container>
  ),
};

export const Internal = {
  render: ({ ...args }) => (
    <Container>
      <NextImageWithFallback
        src="/testImage.jpg"
        alt="test Bild"
        className="aspect-video rounded-lg"
        height={800}
        width={800}
        {...args}
      />
    </Container>
  ),
};

export const Fallback = {
  render: ({ ...args }) => (
    <Container>
      <NextImageWithFallback
        src="https://play.min.io:9000/upload/Gruppe%2027.png123"
        alt="ohne Bild"
        className="aspect-video rounded-lg"
        height={800}
        width={800}
        {...args}
      />
    </Container>
  ),
};

export const FallbackShrinked = {
  render: ({ ...args }) => (
    <Container className="max-w-[6rem]">
      <NextImageWithFallback
        src="https://play.min.io:9000/upload/Gruppe%2027.png123"
        alt="ohne Bild"
        className="aspect-video rounded-lg"
        height={800}
        width={800}
        {...args}
      />
    </Container>
  ),
};

export const DynamicRatio = {
  render: ({ ...args }) => (
    <Container className="">
      <NextImageWithFallback
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"
        alt="ohne Bild"
        height={800}
        width={800}
        {...args}
      />
    </Container>
  ),
};
