import { ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";

import {
  extendedBgColors,
  extendedBorders,
  gaps,
  gapsLarge,
  maxPageWidths,
  paddingsX,
  paddingsYLarge,
  pageGaps,
  pagePaddings,
  pagePaddingsX,
} from "@/styles";
import { useThemeStateValue } from "@/theme";
import type { ExtendedColor, Size, SvgType } from "@/types";
import { cn } from "@/utils/cn";
import { smallerSize } from "@/utils/size";

import { Icon } from "../../ui/Icon";
import { Link } from "../../ui/Link";
import { Text } from "../../ui/Typography/Text";

type FooterProps = {
  main?: ReactNode;
  links?: FooterLinkGroupProps[];
  divider?: FooterDividerProps;
  legalSection?: ReactNode;
  className?: string;
  size?: Size;
  color?: ExtendedColor;
};

type FooterDividerProps = {
  logo?: ReactNode;
  className?: string;
};

type FooterLinkGroupProps = {
  icon?: SvgType;
  label?: string | ReactElement;
  links: FooterLinkProps[];
};

type FooterLinkProps = {
  label: string;
  href: string;
  icon?: SvgType;
};

const colsClassName: Record<number, string> = {
  0: "",
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
};

const colsSmallClassName: Record<number, string> = {
  0: "",
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-5",
};

export const Footer = forwardRef(
  (
    {
      divider,
      legalSection,
      links,
      main,
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
        <section
          className={cn(
            "w-full mx-auto flex flex-col",
            main !== undefined && "md:grid md:grid-cols-2 lg:grid-cols-3",
            pageGaps[pagePadding],
            pagePaddings[pagePadding],
            maxPageWidth && maxPageWidths[maxPageWidth]
          )}
        >
          {main && main}
          <div
            className={cn(
              "grid col-span-1 lg:col-span-2 xl",
              main
                ? colsSmallClassName[links?.length || 0]
                : colsClassName[links?.length || 0],
              gapsLarge[size],
              paddingsYLarge[size]
            )}
          >
            {links &&
              links?.map(({ icon, label, links }, i) => (
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
                  {links.map(({ label, href, icon }, _i) => (
                    <Text
                      size={smallerSize(size)}
                      color="inherit"
                      className={cn(
                        "flex flex-row items-center",
                        gaps.sm,
                        adjustedColors[color]
                      )}
                      key={`footergroup_${i}_el_${_i}`}
                      asChild
                    >
                      <li>
                        {icon && <Icon icon={icon} />}
                        <Link href={href}>{label}</Link>
                      </li>
                    </Text>
                  ))}
                </ul>
              ))}
          </div>
        </section>
        {divider && (
          <section
            className={cn(
              "flex flex-col items-center",
              gaps[size],
              paddingsYLarge[size],
              divider.className
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
              {divider.logo && (
                <div className={cn("flex", paddingsX[size])}>
                  {divider.logo}
                </div>
              )}
              <div
                className={cn(
                  "border-b w-full flex-grow opacity-50",
                  extendedBorders.inherit,
                  adjustedColors[color]
                )}
              />
            </div>
          </section>
        )}
        {legalSection && (
          <section className={cn("w-full", pagePaddingsX[pagePadding])}>
            {legalSection}
          </section>
        )}
      </footer>
    );
  }
);

Footer.displayName = "Footer";
