import { chakra } from "@chakra-ui/react";
import NextImage, {
  ImageLoaderProps,
  ImageProps as NextImageProps,
} from "next/image";

import { type BoxProps, Box } from "../Containers";

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "layout",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
    ].includes(prop),
});

interface ImageProps extends NextImageProps {
  fromPublic?: boolean;
}

const myLoader = (resolverProps: ImageLoaderProps): string =>
  `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`;

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const ImageContainer = (props: ImageProps & BoxProps) => {
  const {
    src,
    alt,
    width,
    quality,
    height,
    layout,
    objectFit = "contain",
    fromPublic = false,
    ...rest
  } = props;
  return (
    <Box
      position="relative"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <ChakraNextUnwrappedImage
        w="auto"
        h="auto"
        loader={myLoader}
        layout={layout}
        width={width}
        quality={quality}
        height={height}
        // placeholder="blur"
        objectFit={objectFit}
        // blurDataURL={`data:image/svg+xml;base64,${shimmer(700, 475)}`}
        src={`${!fromPublic ? process.env.IMG_URL : ""}${src}`}
        alt={alt}
        transition="all 0.2s"
      />
    </Box>
  );
};

ImageContainer.defaultProps = {
  fromPublic: false,
};
