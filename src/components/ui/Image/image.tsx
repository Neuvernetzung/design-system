import cn from "classnames";
import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import { useState } from "react";

import { PhotoIcon } from "../../../theme/icons";
import { typedMemo } from "../../../utils/internal";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type ImageProps = NextImageProps & {
  alt: string;
  dynamicRatio?: boolean | "natural";
};

export const Image = ({
  src,
  alt,
  quality,
  className,
  dynamicRatio,
}: ImageProps) => {
  const [error, setError] = useState<boolean>(false);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center object-cover overflow-hidden",
        className
      )}
    >
      {!error && src ? (
        <NextImage
          className="object-cover object-center"
          src={src}
          {...(!width && !height && { fill: true })}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={quality || "75"}
          alt={alt}
          width={width}
          height={height}
          onError={() => setError(true)}
          onLoadingComplete={({
            naturalWidth,
            naturalHeight,
            width,
            height,
          }) => {
            if (!dynamicRatio) return;
            setWidth(dynamicRatio === "natural" ? naturalWidth : width);
            setHeight(dynamicRatio === "natural" ? naturalHeight : height);
          }}
        />
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default typedMemo(Image);

const Fallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-accent-100 dark:bg-accent-800">
    <div className="p-2 truncate">
      <Icon size="sm" className="mx-auto" icon={PhotoIcon} />
      <Text size="xs" className="mx-auto">
        Bild konnte nicht geladen werden.
      </Text>
    </div>
  </div>
);
