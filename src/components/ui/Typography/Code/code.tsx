import type { ReactNode } from "react";
import type {
  CodeVariant,
  Color,
  ExtendedColor,
  Size,
} from "../../../../types";
import cn from "classnames";
import {
  bgColors,
  borders,
  paddingsXSmall,
  roundings,
  textColors,
  textSizes,
} from "../../../../styles";
import { useThemeStateValue } from "../../../../theme";

export type CodeProps = {
  children: ReactNode;
  size?: Size;
  color?: Color;
  variant?: CodeVariant;
};

const codeBaseStyle = ({ size }: Required<Pick<CodeProps, "size">>) =>
  cn("font-mono", paddingsXSmall[size], textSizes[size], roundings[size]);

const codeVariantStyle = ({
  color,
  adjustedTextColors,
}: Required<Pick<CodeProps, "color">> & {
  adjustedTextColors: Record<ExtendedColor, string>;
}): Record<CodeVariant, string> => ({
  ghost: cn(textColors[color]),
  outline: cn("border", textColors[color], borders[color]),
  solid: cn(bgColors[color], adjustedTextColors[color]),
  subtile: cn("bg-opacity-20", bgColors[color], textColors[color]),
});

export const CodeInline = ({
  children,
  size = "md",
  color = "accent",
  variant = "subtile",
}: CodeProps) => {
  const adjustedTextColors = useThemeStateValue(
    (state) => state.adjustedTextColorState
  );

  return (
    <code
      className={cn(
        codeBaseStyle({ size }),
        codeVariantStyle({ color, adjustedTextColors })[variant]
      )}
    >
      {children}
    </code>
  );
};

export const Code = ({
  children,
  size = "md",
  color = "accent",
  variant = "subtile",
}: CodeProps) => {
  const adjustedTextColors = useThemeStateValue(
    (state) => state.adjustedTextColorState
  );

  return (
    <code
      className={cn(
        "block",
        codeBaseStyle({ size }),
        codeVariantStyle({ color, adjustedTextColors })[variant]
      )}
    >
      {children}
    </code>
  );
};
