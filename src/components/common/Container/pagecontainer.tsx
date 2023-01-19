import cn from "classnames";
import { HTMLAttributes, MutableRefObject, useEffect, useState } from "react";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  navbarRef?: MutableRefObject<any>;
  footerRef?: MutableRefObject<any>;
}

export const PageContainer = ({
  navbarRef,
  footerRef,
  ...props
}: PageContainerProps) => {
  const [navbarHeight, setNavbarHeight] = useState();
  const [footerHeight, setFooterHeight] = useState();
  useEffect(() => {
    if (navbarRef) setNavbarHeight(navbarRef?.current?.clientHeight);
    if (footerRef) setFooterHeight(footerRef?.current?.clientHeight);
  }, []);

  return (
    <main
      className={cn("overflow-x-hidden flex")}
      style={{
        paddingTop: `${navbarHeight}px`,
        minHeight: `calc(100vh - ${footerHeight}px - ${navbarHeight}px)`,
      }}
      {...props}
    />
  );
};

PageContainer.defaultProps = {
  navbarRef: undefined,
  footerRef: undefined,
};
