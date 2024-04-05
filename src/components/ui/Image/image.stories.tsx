import { Image } from "./index";

export default {
  title: "UI/Media/Image",
  component: Image,
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5 w-64 aspect-video" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"
        alt="test Bild"
        className="aspect-video rounded-lg"
        {...args}
      />
    </Container>
  ),
};

export const Internal = {
  render: ({ ...args }) => (
    <Container>
      <Image
        src="/testImage.jpg"
        alt="test Bild"
        className="aspect-video rounded-lg"
        {...args}
      />
    </Container>
  ),
};

export const Fallback = {
  render: ({ ...args }) => (
    <Container>
      <Image
        src="https://play.min.io:9000/upload/Gruppe%2027.png123"
        alt="ohne Bild"
        className="aspect-video rounded-lg"
        {...args}
      />
    </Container>
  ),
};

export const FallbackShrinked = {
  render: ({ ...args }) => (
    <Container className="max-w-[6rem]">
      <Image
        src="https://play.min.io:9000/upload/Gruppe%2027.png123"
        alt="ohne Bild"
        className="aspect-video rounded-lg"
        {...args}
      />
    </Container>
  ),
};

export const DynamicRatio = {
  render: ({ ...args }) => (
    <Container className="">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"
        alt="ohne Bild"
        className="object-contain"
        dynamicRatio
        {...args}
      />
    </Container>
  ),
};
