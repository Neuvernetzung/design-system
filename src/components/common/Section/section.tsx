import type { ImageProps } from "next/image";
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  useMemo,
} from "react";

import { useBreakPoints } from "@/hooks";
import {
  extendedBgColors,
  gapsLarge,
  maxPageWidths,
  pagePaddingsX,
} from "@/styles";
import { useThemeStateValue } from "@/theme";
import type { ExtendedColor, Size } from "@/types";
import { cn } from "@/utils";
import { getBackgroundImage } from "@/utils/image";

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  className?: string;
  bgColor?: ExtendedColor;
  maxWidth?: Size;
  disableMaxWidth?: boolean;
  disablePagePadding?: boolean;
};

export const getMediumSectionContainerClassName = (isMobile: boolean) =>
  cn(isMobile ? gapsLarge.md : gapsLarge.xl);

export const Section = forwardRef(
  (
    {
      children,
      className,
      bgColor,
      maxWidth,
      disableMaxWidth,
      disablePagePadding,
      ...props
    }: SectionProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { isBreakpointOrLarger } = useBreakPoints();
    const isMobile = !isBreakpointOrLarger("lg");

    const maxPageWidth = useThemeStateValue((v) => v.maxPageWidth);
    const pagePadding = useThemeStateValue((v) => v.pagePadding);

    const mediumSectionContainerClassName = useMemo(
      () => getMediumSectionContainerClassName(isMobile),
      [isMobile]
    );

    return (
      <section
        ref={ref}
        className={cn(
          "mx-auto w-full flex flex-col",
          "py-12 lg:py-16",
          mediumSectionContainerClassName,
          bgColor && extendedBgColors[bgColor],
          !disablePagePadding && pagePaddingsX[pagePadding],
          !disableMaxWidth &&
            (maxWidth
              ? maxPageWidths[maxWidth]
              : maxPageWidth && maxPageWidths[maxPageWidth]),
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export type SectionWithBackgroundImageProps = SectionProps & {
  backgroundImage: ImageProps;
};

export const SectionWithBackgroundImage = forwardRef(
  (
    { backgroundImage, style, ...props }: SectionWithBackgroundImageProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const backgroundImageString = useMemo(
      () => getBackgroundImage(backgroundImage),
      [backgroundImage]
    );

    const backgroundImageStyle: CSSProperties = useMemo(
      () => ({
        backgroundImage: backgroundImageString,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        ...style,
      }),
      [backgroundImageString, style]
    );

    return <Section ref={ref} style={backgroundImageStyle} {...props} />;
  }
);

SectionWithBackgroundImage.displayName = "SectionWithBackgroundImage";
