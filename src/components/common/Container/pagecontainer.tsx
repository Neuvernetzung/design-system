import { useMemo, type HTMLAttributes, type RefObject } from "react";

import { useBreakPoints, useRefDimensions } from "@/hooks";
import { maxPageWidths, pageGaps, pagePaddings } from "@/styles/page";
import { useThemeStateValue } from "@/theme";
import { cn } from "@/utils/cn";

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  navbarRef?: RefObject<HTMLDivElement>;
  sidenavRef?: RefObject<HTMLDivElement>;
  footerRef?: RefObject<HTMLDivElement>;
  enablePagePadding?: boolean;
  enabledPageGaps?: boolean;
  enabledMaxPageWidth?: boolean;
  className?: string;
};

type CalcHeightProps = { navbarHeight?: number; footerHeight?: number };

const calcHeight = ({
  navbarHeight,
  footerHeight,
}: CalcHeightProps): string => {
  if (navbarHeight && footerHeight)
    return `calc(100vh - ${footerHeight}px - ${navbarHeight}px)`;

  if (navbarHeight) return `calc(100vh - ${navbarHeight}px)`;
  if (footerHeight) return `calc(100vh - ${footerHeight}px)`;

  return "100vh";
};

export const PageContainer = ({
  navbarRef,
  sidenavRef,
  footerRef,
  enablePagePadding = true,
  enabledPageGaps = true,
  enabledMaxPageWidth = true,
  className,
  children,
  ...props
}: PageContainerProps) => {
  const navbarHeight = useRefDimensions(navbarRef).height;

  const footerHeight = useRefDimensions(footerRef).height;

  const sidenavWidth = useRefDimensions(sidenavRef).width;

  const pagePadding = useThemeStateValue((state) => state.pagePadding);
  const maxPageWidth = useThemeStateValue((state) => state.maxPageWidth);

  const { isBreakpointOrLarger } = useBreakPoints();

  const isMobile = !isBreakpointOrLarger("lg");

  const minHeight = useMemo(
    () => calcHeight({ navbarHeight, footerHeight }),
    [navbarHeight, footerHeight]
  );

  return (
    <main
      className={cn(
        "overflow-x-clip",
        enablePagePadding && pagePaddings[pagePadding],
        enabledPageGaps && pageGaps[pagePadding],
        className
      )}
      style={{
        paddingTop:
          (isMobile && sidenavRef) || !sidenavRef ? `${navbarHeight}px` : "0",
        marginLeft: !isMobile ? sidenavWidth : "0",
        minHeight,
      }}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col w-full mx-auto",
          enabledMaxPageWidth && maxPageWidth && maxPageWidths[maxPageWidth]
        )}
      >
        {children}
      </div>
    </main>
  );
};
