import cn from "classnames";
import { HTMLAttributes, MutableRefObject, useEffect, useState } from "react";
import { pagePaddings } from "../../../styles";
import { Sizes } from "../../../types";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  navbarRef?: MutableRefObject<any>;
  footerRef?: MutableRefObject<any>;
  pagePaddingSize?: keyof Sizes;
  enablePagePadding?: boolean;
}

export const PageContainer = ({
  navbarRef,
  footerRef,
  pagePaddingSize = "md",
  enablePagePadding = true,
  ...props
}: PageContainerProps) => {
  const [navbarHeight, setNavbarHeight] = useState();
  const [footerHeight, setFooterHeight] = useState();
  useEffect(() => {
    if (navbarRef) setNavbarHeight(navbarRef?.current?.clientHeight);
    if (footerRef) setFooterHeight(footerRef?.current?.clientHeight);
  }, []);

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
        "overflow-x-hidden flex",
        enablePagePadding && pagePaddings[pagePaddingSize]
      )}
      style={{
        paddingTop: `${navbarHeight}px`,
        minHeight: calcHeight(),
      }}
      {...props}
    />
  );
};

PageContainer.defaultProps = {
  navbarRef: undefined,
  footerRef: undefined,
};
