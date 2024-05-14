import { IconPhotoOff } from "@tabler/icons-react";
import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import { HTMLAttributes, useState } from "react";

import { cn } from "@/utils";

import { Icon } from "../Icon";
import { Text } from "../Typography";

export type ImageProps = NextImageProps & {
  alt: string;
  dynamicRatio?: boolean | "natural";
  containerProps?: HTMLAttributes<HTMLDivElement>;
  containerClassName?: string;
};

// TODO: Remove once https://github.com/vercel/next.js/issues/52216 is resolved.
// `next/image` seems to be affected by a default + named export bundling bug.
let ResolvedImage = NextImage;
if ("default" in ResolvedImage) {
  ResolvedImage = (ResolvedImage as unknown as { default: typeof NextImage })
    .default;
}

/**
 * @deprecated Use next/image instead of if Fallback needed NextImageWithFallback
 */
export const Image = ({
  src,
  alt,
  quality,
  className,
  containerClassName,
  dynamicRatio,
  containerProps,
  ...imageProps
}: ImageProps) => {
  const [error, setError] = useState<boolean>(false);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  return (
    <div
      {...containerProps}
      className={cn(
        "relative w-full flex items-center justify-center object-cover overflow-hidden",
        !dynamicRatio && "h-full",
        containerClassName
      )}
    >
      {!error && src ? (
        <ResolvedImage
          className={cn("object-cover object-center", className)}
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
          {...imageProps}
        />
      ) : (
        <ImageFallback src={String(src)} alt={alt} className={className} />
      )}
    </div>
  );
};

export type NextImageWithFallbackProps = NextImageProps;

export const NextImageWithFallback = ({
  src,
  alt,
  className,
  ...imageProps
}: NextImageWithFallbackProps) => {
  const [error, setError] = useState<boolean>(false);

  if (!src || error)
    return <ImageFallback src={String(src)} alt={alt} className={className} />;

  return (
    <ResolvedImage
      className={cn(className)}
      alt={alt}
      src={src}
      onError={() => setError(true)}
      {...imageProps}
    />
  );
};

type ImageFallbackProps = { src?: string; alt?: string; className?: string };

export const ImageFallback = ({ src, alt, className }: ImageFallbackProps) => (
  <div
    aria-describedby={src}
    aria-label={alt}
    className={cn(
      "w-full h-full flex items-center justify-center bg-accent-100 dark:bg-accent-800",
      className
    )}
  >
    <div className="p-2 truncate">
      <Icon size="sm" className="mx-auto" icon={IconPhotoOff} />
      <Text size="xs" className="mx-auto">
        Bild konnte nicht geladen werden.
      </Text>
    </div>
  </div>
);
