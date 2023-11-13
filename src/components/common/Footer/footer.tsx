import { ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";

import {
  extendedBgColors,
  extendedBorders,
  gaps,
  maxPageWidths,
  paddingsX,
  paddingsYLarge,
  pagePaddings,
} from "@/styles";
import { useThemeStateValue } from "@/theme";
import type { ExtendedColor, Size, SvgType } from "@/types";
import { cn } from "@/utils/cn";
import { smallerSize } from "@/utils/size";

import { Icon } from "../../ui/Icon";
import { Link } from "../../ui/Link";
import { Text } from "../../ui/Typography/Text";

type FooterProps = {
  logo?: ReactNode;
  cols?: LinkGroupProps[];
  copyright?: string;
  className?: string;
  size?: Size;
  color?: ExtendedColor;
};

type LinkGroupProps = {
  icon?: SvgType;
  label?: string | ReactElement;
  links: LinkProps[];
};

type LinkProps = {
  label: string;
  href: string;
};

const colsClassName: Record<number, string> = {
  0: "",
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
};

export const Footer = forwardRef(
  (
    {
      logo,
      cols = [],
      copyright,
      className,
      size = "md",
      color = "white",
    }: FooterProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const pagePadding = useThemeStateValue((state) => state.pagePadding);
    const maxPageWidth = useThemeStateValue((state) => state.maxPageWidth);
    const adjustedColors = useThemeStateValue(
      (state) => state.adjustedTextColorState
    );

    return (
      <footer
        ref={ref}
        className={cn(
          "flex flex-col",
          gaps[size],
          extendedBgColors[color],
          className
        )}
      >
        <div
          className={cn(
            "w-full mx-auto",
            pagePaddings[pagePadding],
            maxPageWidth && maxPageWidths[maxPageWidth]
          )}
        >
          <div
            className={cn(
              "grid",
              colsClassName[cols?.length || 0],
              gaps[size],
              paddingsYLarge[size]
            )}
          >
            {cols &&
              cols?.map(({ icon, label, links }, i) => (
                <ul
                  className="items-start flex flex-col"
                  key={`footerlinkgroup_${i}`}
                >
                  <li className={cn("flex flex-row items-center", gaps.sm)}>
                    {icon && (
                      <Icon
                        icon={icon}
                        color="inherit"
                        size={smallerSize(size)}
                        className={cn(adjustedColors[color])}
                      />
                    )}
                    <Text
                      size={smallerSize(size)}
                      className={cn("font-semibold", adjustedColors[color])}
                    >
                      {label}
                    </Text>
                  </li>
                  {links.map(({ label, href }, _i) => (
                    <Text
                      as="li"
                      size={smallerSize(size)}
                      color="inherit"
                      className={cn(adjustedColors[color])}
                      key={`footergroup_${i}_el_${_i}`}
                    >
                      <Link href={href}>{label}</Link>
                    </Text>
                  ))}
                </ul>
              ))}
          </div>
        </div>
        {(copyright || logo) && (
          <div
            className={cn(
              "flex flex-col items-center",
              gaps[size],
              paddingsYLarge[size]
            )}
          >
            <div className={cn("flex justify-center items-center w-full")}>
              <div
                className={cn(
                  "border-b w-full flex-grow opacity-50",
                  extendedBorders.inherit,
                  adjustedColors[color]
                )}
              />
              {logo && <div className={cn("flex", paddingsX.xl)}>{logo}</div>}
              <div
                className={cn(
                  "border-b w-full flex-grow opacity-50",
                  extendedBorders.inherit,
                  adjustedColors[color]
                )}
              />
            </div>

            {copyright && (
              <Text
                color="inherit"
                className={cn(adjustedColors[color])}
                size="xs"
              >
                {copyright}
              </Text>
            )}
          </div>
        )}
      </footer>
    );
  }
);

Footer.displayName = "Footer";
