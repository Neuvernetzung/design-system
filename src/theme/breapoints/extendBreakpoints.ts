import type { BreakpointSize } from "@/types";

export const defaultBreakpoints: Record<BreakpointSize, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const twDefaultBreakpoints: Record<BreakpointSize, string> = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
