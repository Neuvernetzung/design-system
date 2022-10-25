import cn from "classnames";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { memo } from "react";

export interface ImageProps extends NextImageProps {
  isLocal?: boolean;
  alt: string;
}

export const Image = ({
  src,
  alt,
  quality,
  isLocal = false,
  className,
}: ImageProps) => (
  <div
    className={cn(
      "relative w-full h-full flex items-center justify-center object-cover overflow-hidden",
      className
    )}
  >
    <NextImage
      className="object-cover object-center"
      src={`${!isLocal ? process.env.IMG_URL : ""}${src}`}
      layout="fill"
      quality={quality || "75"}
      alt={alt}
    />
  </div>
);

export default memo(Image);
