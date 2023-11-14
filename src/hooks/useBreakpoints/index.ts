import { useMemo } from "react";

import { useWindowSize } from "@/hooks/useWindowSize";
import { defaultBreakpoints } from "@/theme/breapoints";
import { BreakpointSize, breakpointSizes } from "@/types";

const isBreakpoint = (
  breakpoint: BreakpointSize,
  currentBreakpoint?: BreakpointSize
) => breakpoint === currentBreakpoint;

const isBreakpointOrLarger = (
  breakpoint: BreakpointSize,
  currentBreakpoint?: BreakpointSize
) => {
  if (!currentBreakpoint) return null;
  const breakpointIndex = breakpointSizes.indexOf(breakpoint);
  const currentBreakpointIndex = breakpointSizes.indexOf(currentBreakpoint);
  if (breakpointIndex === undefined || !currentBreakpointIndex === undefined)
    return null;

  return currentBreakpointIndex >= breakpointIndex;
};

export const useBreakPoints = () => {
  const { width } = useWindowSize();

  const currentBreakpoint: BreakpointSize = useMemo(() => {
    if (!width) return "xs";

    if (width < defaultBreakpoints.sm) return "xs";

    if (width < defaultBreakpoints.md) return "sm";

    if (width < defaultBreakpoints.lg) return "md";

    if (width < defaultBreakpoints.xl) return "lg";

    if (width < defaultBreakpoints["2xl"]) return "xl";

    return "2xl";
  }, [width]);

  return {
    breakpoint: currentBreakpoint,
    isBreakpoint: (breakpoint: BreakpointSize) =>
      isBreakpoint(breakpoint, currentBreakpoint),
    isBreakpointOrLarger: (breakpoint: BreakpointSize) =>
      isBreakpointOrLarger(breakpoint, currentBreakpoint),
  };
};
