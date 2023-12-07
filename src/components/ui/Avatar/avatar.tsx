import Image, { type ImageProps } from "next/image";

import { Text } from "@/components/ui/Typography/Text";
import { borders, heights } from "@/styles";
import { useThemeStateValue } from "@/theme";
import type { Color, HEX, Size } from "@/types";
import { cn } from "@/utils";
import { blendColor } from "@/utils/internal";

export type AvatarProps = {
  image?: Pick<ImageProps, "src" | "alt">;
  name: string;
  size?: Size;
  color?: Color;
};

function lettersToColor(letters: string): HEX {
  const formatted = letters.slice(0, 2).toUpperCase();

  let hash = 0;

  for (let i = 0; i < formatted.length; i += 1) {
    hash += formatted.charCodeAt(i) - 65; // 65 ist 0 in Unix, danach fangen Großbuchstaben an
  }

  const color = (16 ** 6 * ((1 / 26) * hash)).toString(16).padStart(6, "0");

  return `#${color}`;
}

export const Avatar = ({
  image,
  name,
  color = "accent",
  size = "md",
}: AvatarProps) => {
  const colorState = useThemeStateValue((v) => v.colorState);

  const initials = name
    .split(" ")
    .splice(0, 2)
    .map((str) => str[0].toUpperCase())
    .join("");

  const c = colorState?.[color]?.[500];
  const randomBgColor = blendColor(`#${c}`, lettersToColor(initials), 0.5);

  return (
    <div
      className={cn(
        "flex flex-col w-min items-center justify-center aspect-square rounded-full border overflow-hidden",
        borders.accent, // Ist immer accent, jedoch die Hintergrundfarbe mischt sich aus color zusammen.
        heights[size]
      )}
      style={{ backgroundColor: `${randomBgColor}33` }} // 33 für 20% opacity
    >
      {image ? (
        <Image height={100} width={100} src={image.src} alt={image.alt} />
      ) : (
        <Text size={size}>{initials}</Text>
      )}
    </div>
  );
};
