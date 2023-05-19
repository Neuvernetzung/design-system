import cn from "classnames";
import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import { useState } from "react";

import { PhotoIcon } from "../../../theme/icons";
import { typedMemo } from "../../../utils/internal";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export interface ImageProps extends NextImageProps {
  alt: string;
}

export const Image = ({ src, alt, quality, className }: ImageProps) => {
  const [error, setError] = useState<boolean>(false);

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
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={quality || "75"}
          alt={alt}
          onError={() => setError(true)}
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
