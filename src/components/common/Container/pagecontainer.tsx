import { type HTMLAttributes, type RefObject, useEffect } from "react";
import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";

import { maxPageWidths, pageGaps, pagePaddings } from "@/styles/page";
import { useThemeStateValue } from "@/theme";
import { cn } from "@/utils/cn";
import { useRefDimensions, useWindowSize } from "@/hooks";

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  navbarRef?: RefObject<HTMLDivElement>;
  sidenavRef?: RefObject<HTMLDivElement>;
  footerRef?: RefObject<HTMLDivElement>;
  enablePagePadding?: boolean;
  enabledPageGaps?: boolean;
  className?: string;
};

export const pageContainerStore = create(
  persist(() => ({ navbarHeight: 0, footerHeight: 0, sidenavWidth: 0 }), {
    name: "pageContainer",
  })
);

export const PageContainer = ({
  navbarRef,
  sidenavRef,
  footerRef,
  enablePagePadding = true,
  enabledPageGaps = true,
  className,
  children,
  ...props
}: PageContainerProps) => {
  const pageContainerState = useStore(pageContainerStore);

  const navbarHeight =
    useRefDimensions(navbarRef).height || pageContainerState.navbarHeight;

  useEffect(() => {
    pageContainerStore.setState({ navbarHeight });
  }, [navbarHeight]);

  const footerHeight =
    useRefDimensions(footerRef).height || pageContainerState.footerHeight;

  useEffect(() => {
    pageContainerStore.setState({ footerHeight });
  }, [footerHeight]);

  const sidenavWidth =
    useRefDimensions(sidenavRef).width || pageContainerState.sidenavWidth;

  useEffect(() => {
    pageContainerStore.setState({ sidenavWidth });
  }, [sidenavWidth]);

  const pagePadding = useThemeStateValue((state) => state.pagePadding);
  const maxPageWidth = useThemeStateValue((state) => state.maxPageWidth);

  const windowWidth = useWindowSize().width;

  const LG_MEDIA_QUERY_SIZE = 1024;

  const isMobile = windowWidth < LG_MEDIA_QUERY_SIZE;

  const calcHeight = () => {
    if (navbarHeight && footerHeight)
      return `calc(100vh - ${footerHeight}px - ${navbarHeight}px)`;

    if (navbarHeight) return `calc(100vh - ${navbarHeight}px)`;
    if (footerHeight) return `calc(100vh - ${footerHeight}px)`;

    return "100vh";
  };

  return (
    <main
      className={cn(
        "overflow-x-hidden",
        enablePagePadding && pagePaddings[pagePadding],
        enabledPageGaps && pageGaps[pagePadding],
        className
      )}
      style={{
        paddingTop:
          (isMobile && sidenavRef) || !sidenavRef ? `${navbarHeight}px` : "0",
        marginLeft: !isMobile ? sidenavWidth : "0",
        minHeight: calcHeight(),
      }}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col w-full mx-auto",
          maxPageWidth && maxPageWidths[maxPageWidth]
        )}
      >
        {children}
      </div>
    </main>
  );
};
