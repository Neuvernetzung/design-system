import { Portal } from "@radix-ui/react-portal";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { ReactNode, RefObject, useEffect, useMemo, useState } from "react";

import { useRefDimensions } from "@/hooks";
import { bgColors, paddingsEvenly } from "@/styles";
import { cn } from "@/utils";

import { IconButton } from "../../../ui/Button";
import type { NavbarProps, SubNavProps } from "../navbar";
import { MobileNavItems } from "./items";

export const MobileNav = ({
  navItems,
  navbarRef,
  footer,
  footerClassName,
  mobileNavClassName,
  textColor,
}: SubNavProps &
  Pick<NavbarProps, "footer" | "footerClassName" | "mobileNavClassName">) => {
  if (!navItems || navItems.length === 0) return null;

  return (
    <div className={cn("flex lg:hidden")}>
      <MobileNavButton
        containerClassName={mobileNavClassName}
        navbarRef={navbarRef}
        textColor={textColor}
      >
        <MobileNavItems navItems={navItems} />
        {footer && (
          <MobileNavFooter textColor={textColor} className={footerClassName}>
            {footer}
          </MobileNavFooter>
        )}
      </MobileNavButton>
    </div>
  );
};

export type MobileNavButtonProps = {
  textColor?: string;
  navbarRef?: RefObject<HTMLElement>;
  children: ReactNode;
  containerClassName?: string;
};

export const MobileNavButton = ({
  textColor,
  navbarRef,
  children,
  containerClassName,
}: MobileNavButtonProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Ermöglicht das schließen des Nav Menüs, wenn ein Navlink geklickt wurde.
    const handleMobileClose = () => {
      setMobileNavOpen(false);
    };

    router.events.on("routeChangeStart", handleMobileClose);
    router.events.on("hashChangeStart", handleMobileClose);

    return () => {
      router.events.off("routeChangeStart", handleMobileClose);
      router.events.off("hashChangeStart", handleMobileClose);
    };
  }, [router]);

  const navbarHeight = useRefDimensions(navbarRef).height;

  const containerHeight = useMemo(() => {
    if (!navbarHeight) return "100vh";

    return `calc(100vh - ${navbarHeight}px)`;
  }, [navbarHeight]);

  return (
    <>
      <IconButton
        className={cn(textColor)}
        icon={mobileNavOpen ? IconX : IconMenu2}
        variant="ghost"
        ariaLabel={mobileNavOpen ? "Navigation schließen" : "Navigation öffnen"}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      />
      {mobileNavOpen && (
        <Portal>
          <div
            className={cn(
              bgColors.white,
              "fixed inset-x-0 flex flex-col justify-between lg:hidden",
              containerClassName
            )}
            style={{ top: navbarHeight, height: containerHeight }}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

export type MobileNavFooterProps = Pick<MobileNavButtonProps, "textColor"> & {
  children: ReactNode;
  className?: string;
};

export const MobileNavFooter = ({
  children,
  className,
  textColor,
}: MobileNavFooterProps) => (
  <div className={cn("flex w-full", paddingsEvenly.md, textColor, className)}>
    {children}
  </div>
);
