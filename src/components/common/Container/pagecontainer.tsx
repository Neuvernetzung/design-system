import { type HTMLAttributes, type RefObject, useEffect } from "react";
import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";

import { useRefDimensions, useWindowSize } from "@/hooks";
import { maxPageWidths, pageGaps, pagePaddings } from "@/styles/page";
import { useThemeStateValue } from "@/theme";
import { cn } from "@/utils/cn";

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

  const navbarHeight = useRefDimensions(navbarRef, {
    defaultValue: { height: pageContainerState.navbarHeight, width: 0 },
  }).height;

  useEffect(() => {
    pageContainerStore.setState({ navbarHeight });
  }, [navbarHeight]);

  const footerHeight = useRefDimensions(footerRef, {
    defaultValue: { height: pageContainerState.footerHeight, width: 0 },
  }).height;

  useEffect(() => {
    pageContainerStore.setState({ footerHeight });
  }, [footerHeight]);

  const sidenavWidth = useRefDimensions(sidenavRef, {
    defaultValue: { height: 0, width: pageContainerState.sidenavWidth },
  }).width;

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
        "overflow-x-clip",
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
