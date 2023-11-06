import { Dialog } from "@headlessui/react";
import cn from "classnames";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { MutableRefObject, ReactNode } from "react";

import {
  bgColors,
  borders,
  gaps,
  paddingsLargeEvenly,
  shadows,
  transition,
  zIndexes,
} from "../../../styles";
import { IconX } from "@tabler/icons-react";
import type { ExtendedSize, SvgType } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Backdrop } from "../Backdrop";
import { IconButton } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type DrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialFocus?: MutableRefObject<HTMLElement>;
  size?: DrawerSize;
  icon?: SvgType;
  title?: string;
  content?: ReactNode;
  placement?: DrawerPlacement;
};

export type DrawerSize = Exclude<ExtendedSize, "4xl" | "5xl" | "6xl"> | "full";

const widths: Record<DrawerSize, string> = {
  xs: "max-w-md",
  sm: "max-w-lg",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
  "2xl": "max-w-4xl",
  "3xl": "max-w-5xl",
  full: "max-w-none",
};

const drawerPlacements = ["top", "bottom", "left", "right"] as const;

type DrawerPlacement = (typeof drawerPlacements)[number];

const placements = (
  size: DrawerSize
): Record<
  DrawerPlacement,
  {
    className: string;
    animate: Record<string, any>;
    initial: Record<string, any>;
  }
> => ({
  right: {
    className: cn(widths[size], "right-0 inset-y-0"),
    animate: { translateX: "0%" },
    initial: { translateX: "100%" },
  },
  left: {
    className: cn(widths[size], "left-0 inset-y-0"),
    animate: { translateX: "0%" },
    initial: { translateX: "-100%" },
  },
  top: {
    className: cn("top-0 inset-x-0"),
    animate: { translateY: "0%" },
    initial: { translateY: "-100%" },
  },
  bottom: {
    className: cn("bottom-0 inset-x-0"),
    animate: { translateY: "0%" },
    initial: { translateY: "100%" },
  },
});

const animations = (
  open: boolean,
  size: DrawerSize,
  placement: DrawerPlacement
) => ({
  animate: open ? "animate" : "initial",
  initial: "initial",
  variants: {
    animate: placements(size)[placement].animate,
    initial: placements(size)[placement].initial,
  },
  transition: { duration: 0.075 },
});

const MotionPanel = m(Dialog.Panel);

export const Drawer = ({
  open,
  setOpen,
  initialFocus,
  size = "md",
  icon,
  title,
  content,
  placement = "right",
}: DrawerProps) => (
  <Dialog
    as="div"
    initialFocus={initialFocus}
    open={open}
    className={cn("relative", zIndexes.modal)}
    onClose={() => setOpen(false)}
  >
    <Backdrop isOpen={open} />
    <LazyMotion features={domAnimation}>
      <MotionPanel
        {...animations(open, size, placement)}
        className={cn(
          transition,
          borders.accent,
          bgColors.white,
          paddingsLargeEvenly.lg,
          gaps.md,
          placements(size)[placement].className,
          shadows.xl,

          "fixed overflow-y-hidden hover:overflow-y-auto w-full flex flex-col"
        )}
      >
        <div
          className={cn(gaps.md, "flex flex-row justify-between items-center")}
        >
          {icon && <Icon icon={icon} />}
          <Text size="lg">{title}</Text>
          <IconButton
            ariaLabel="closeDrawer"
            icon={IconX}
            variant="ghost"
            onClick={() => setOpen(false)}
          />
        </div>
        {content}
      </MotionPanel>
    </LazyMotion>
  </Dialog>
);

export default typedMemo(Drawer);
