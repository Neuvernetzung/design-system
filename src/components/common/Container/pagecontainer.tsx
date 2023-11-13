import { cn } from "@/utils";
import type { HTMLAttributes, MutableRefObject } from "react";

import { pagePaddings } from "../../../styles";
import { useThemeStateValue } from "../../../theme";
import { useRefDimensions, useWindowSize } from "../../../utils/internal";

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  navbarRef?: MutableRefObject<any>;
  sidenavRef?: MutableRefObject<any>;
  footerRef?: MutableRefObject<any>;
  enablePagePadding?: boolean;
  className?: string;
};

export const PageContainer = ({
  navbarRef,
  sidenavRef,
  footerRef,
  enablePagePadding = true,
  className,
  ...props
}: PageContainerProps) => {
  const navbarHeight = useRefDimensions(navbarRef).height;
  const footerHeight = useRefDimensions(footerRef).height;
  const sidenavWidth = useRefDimensions(sidenavRef).width;

  const pagePadding = useThemeStateValue((state) => state.pagePadding);

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
        "overflow-x-hidden flex flex-col",
        enablePagePadding && pagePaddings[pagePadding],
        className
      )}
      style={{
        paddingTop:
          (isMobile && sidenavRef) || !sidenavRef ? `${navbarHeight}px` : "0",
        marginLeft: !isMobile ? sidenavWidth : "0",
        minHeight: calcHeight(),
      }}
      {...props}
    />
  );
};
