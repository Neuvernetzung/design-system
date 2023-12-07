import type { ThemeConfig } from "tailwindcss/types/config";

export const animations: ThemeConfig["animation"] = {
  modal: "modal 100ms linear",
  modalOut: "modalOut 50ms linear",
  popover: "popover 100ms linear",
  popoverOut: "popoverOut 50ms linear",
  tooltip: "tooltip 50ms linear",
  tooltipOut: "tooltipOut 50ms linear",
  backdrop: "backdrop 100ms linear",
  backdropOut: "backdropOut 50ms linear",
  disclosure: "disclosure 100ms linear",
  disclosureOut: "disclosureOut 50ms linear",
  drawerRight: "drawerRight 100ms linear",
  drawerRightOut: "drawerRightOut 100ms linear",
  drawerLeft: "drawerLeft 100ms linear",
  drawerLeftOut: "drawerLeftOut 100ms linear",
  drawerTop: "drawerTop 100ms linear",
  drawerTopOut: "drawerTopOut 100ms linear",
  drawerBottom: "drawerBottom 100ms linear",
  drawerBottomOut: "drawerBottomOut 100ms linear",
  checkbox: "checkbox 150ms linear",
  checkboxOut: "checkboxOut 100ms linear",
};

export const animationKeyframes: ThemeConfig["keyframes"] = {
  modal: {
    "0%": { transform: "scale(95%) translateY(5px)", opacity: "0" },
    "100%": { transform: "scale(100%) translateY(0px)", opacity: "1" },
  },
  modalOut: {
    "0%": { transform: "scale(100%) translateY(0px)", opacity: "1" },
    "100%": { transform: "scale(95%) translateY(5px)", opacity: "0" },
  },
  popover: {
    "0%": { transform: "scale(95%) translateY(5px)", opacity: "0" },
    "100%": { transform: "scale(100%) translateY(0px)", opacity: "1" },
  },
  popoverOut: {
    "0%": { transform: "scale(100%) translateY(0px)", opacity: "1" },
    "100%": { transform: "scale(95%) translateY(5px)", opacity: "0" },
  },
  tooltip: {
    "0%": { transform: "scale(95%)", opacity: "0" },
    "100%": { transform: "scale(100%)", opacity: "1" },
  },
  tooltipOut: {
    "0%": { transform: "scale(100%)", opacity: "1" },
    "100%": { transform: "scale(95%)", opacity: "0" },
  },
  backdrop: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  backdropOut: {
    "0%": { opacity: "1" },
    "100%": { opacity: "0" },
  },
  disclosure: {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  disclosureOut: {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  drawerRight: {
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(0%)" },
  },
  drawerRightOut: {
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(100%)" },
  },
  drawerLeft: {
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
  },
  drawerLeftOut: {
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(-100%)" },
  },
  drawerTop: {
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
  },
  drawerTopOut: {
    from: { transform: "translateY(0%)" },
    to: { transform: "translateY(-100%)" },
  },
  drawerBottom: {
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0%)" },
  },
  drawerBottomOut: {
    from: { transform: "translateY(0%)" },
    to: { transform: "translateY(100%)" },
  },
  checkbox: {
    from: { opacity: "0", strokeDashoffset: "100%", scale: "0.5" },
    to: {
      opacity: "1",
      strokeDashoffset: "0",
      scale: "1",
    },
  },
  checkboxOut: {
    from: { opacity: "1", strokeDashoffset: "0", scale: "1" },
    to: {
      opacity: "0",
      strokeDashoffset: "100%",
      scale: "0.5",
    },
  },
};
