import { useEffect, useState } from "react";

// Es werden 6 verschiedene spans mit Größe 0 gerendert, danach abgefragt ob das span jeweils sichtbar ist.
// Dies ist kleiner im finalen Bundle als tailwindcss/resolve Config, außerdem kann die finale Config nicht abgefragt werden, ohne einen Pfad, der vom Benutzer gegeben werden müsste.

export const breakpoints = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

export type Breakpoints = typeof breakpoints;

export type Breakpoint = Breakpoints[number];

const breakPointName = (breakpoint: Breakpoint) => `breakpoint-${breakpoint}`;

const getCurrentBreakpoint = (): Breakpoint | undefined => {
  if (document.getElementById(breakPointName("xs"))?.offsetParent !== null)
    return "xs";
  if (document.getElementById(breakPointName("sm"))?.offsetParent !== null)
    return "sm";
  if (document.getElementById(breakPointName("md"))?.offsetParent !== null)
    return "md";
  if (document.getElementById(breakPointName("lg"))?.offsetParent !== null)
    return "lg";
  if (document.getElementById(breakPointName("xl"))?.offsetParent !== null)
    return "xl";
  if (document.getElementById(breakPointName("2xl"))?.offsetParent !== null)
    return "2xl";
  return undefined;
};

const isBreakpoint = (breakpoint: Breakpoint, currentBreakpoint?: Breakpoint) =>
  breakpoint === currentBreakpoint;

const isBreakpointOrLarger = (
  breakpoint: Breakpoint,
  currentBreakpoint?: Breakpoint
) => {
  if (!currentBreakpoint) return null;
  const breakpointIndex = breakpoints.indexOf(breakpoint);
  const currentBreakpointIndex = breakpoints.indexOf(currentBreakpoint);
  if (breakpointIndex === undefined || !currentBreakpointIndex === undefined)
    return null;

  return currentBreakpointIndex >= breakpointIndex;
};

export const useBreakPoints = () => {
  const [containerItems] = useState(() => {
    const elements: { breakpoint: Breakpoint; className: string }[] = [
      { breakpoint: "xs", className: "block sm:hidden" },
      { breakpoint: "sm", className: "hidden sm:block md:hidden" },
      { breakpoint: "md", className: "hidden md:block lg:hidden" },
      { breakpoint: "lg", className: "hidden lg:block xl:hidden" },
      { breakpoint: "xl", className: "hidden xl:block 2xl:hidden" },
      { breakpoint: "2xl", className: "hidden 2xl:block" },
    ];

    return elements.map((element) => {
      const el = document.createElement("span");
      el.setAttribute("class", `${element.className} h-0 w-0`);
      el.setAttribute("id", breakPointName(element.breakpoint));

      return el;
    });
  });

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>();

  const handleGetCurrentBreakpoint = () => {
    setCurrentBreakpoint(getCurrentBreakpoint());
  };

  useEffect(() => {
    containerItems.forEach((container) => {
      document.body.appendChild(container);
    });
    handleGetCurrentBreakpoint();
    return () => {
      containerItems.forEach((container) => {
        document.body.appendChild(container);
      });
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleGetCurrentBreakpoint, false);

    return () => {
      window.removeEventListener("resize", handleGetCurrentBreakpoint, false);
    };
  }, []);

  return {
    breakpoint: currentBreakpoint,
    isBreakpoint: (breakpoint: Breakpoint) =>
      isBreakpoint(breakpoint, currentBreakpoint),
    isBreakpointOrLarger: (breakpoint: Breakpoint) =>
      isBreakpointOrLarger(breakpoint, currentBreakpoint),
  };
};
