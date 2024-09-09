import { getImageProps, type ImageProps } from "next/image";

export const getBackgroundImage = (image: ImageProps) => {
  const {
    props: { srcSet },
  } = getImageProps(image);

  const imageSet = (srcSet || "")
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
};
