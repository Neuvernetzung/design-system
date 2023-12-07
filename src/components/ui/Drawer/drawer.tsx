import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogClose,
  Root,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/utils";
import type { MutableRefObject, ReactElement, ReactNode } from "react";

import {
  bgColors,
  borders,
  gaps,
  paddingsLargeEvenly,
  shadows,
  transition,
  zIndexes,
} from "../../../styles";
import type { ExtendedSize, SvgType } from "../../../types";
import { Backdrop } from "../Backdrop";
import { IconButton } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  setOpen?: (open: boolean) => void;
  initialFocus?: MutableRefObject<HTMLElement>;
  size?: DrawerSize;
  icon?: SvgType;
  title?: string;
  content?: ReactNode;
  placement?: DrawerPlacement;
  children?: ReactElement;
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

export const drawerPlacements = ["top", "bottom", "left", "right"] as const;

export type DrawerPlacement = (typeof drawerPlacements)[number];

const placements = (
  size: DrawerSize
): Record<
  DrawerPlacement,
  {
    className: string;
  }
> => ({
  right: {
    className: cn(
      widths[size],
      "right-0 inset-y-0 data-[state=open]:animate-drawerRight data-[state=closed]:animate-drawerRightOut"
    ),
  },
  left: {
    className: cn(
      widths[size],
      "left-0 inset-y-0 data-[state=open]:animate-drawerLeft data-[state=closed]:animate-drawerLeftOut"
    ),
  },
  top: {
    className: cn(
      "top-0 inset-x-0 data-[state=open]:animate-drawerTop data-[state=closed]:animate-drawerTopOut"
    ),
  },
  bottom: {
    className: cn(
      "bottom-0 inset-x-0 data-[state=open]:animate-drawerBottom data-[state=closed]:animate-drawerBottomOut"
    ),
  },
});

export const Drawer = ({
  open,
  defaultOpen,
  setOpen,
  initialFocus,
  size = "md",
  icon,
  title,
  content,
  placement = "right",
  children,
}: DrawerProps) => (
  <Root open={open} defaultOpen={defaultOpen} onOpenChange={setOpen}>
    {children && <DialogTrigger asChild>{children}</DialogTrigger>}
    <DialogPortal>
      <DialogOverlay className={zIndexes.modal} asChild>
        <Backdrop isOpen />
      </DialogOverlay>
      <DialogContent
        onOpenAutoFocus={
          initialFocus
            ? (e) => {
                e.preventDefault();
                initialFocus.current.focus();
              }
            : undefined
        }
        className={cn(
          zIndexes.modal,
          transition,
          borders.accent,
          bgColors.white,
          paddingsLargeEvenly.lg,
          gaps.md,
          placements(size)[placement].className,
          shadows.xl,
          "fixed overflow-y-hidden hover:overflow-y-auto w-full flex flex-col will-change-transform"
        )}
      >
        <div
          className={cn(gaps.md, "flex flex-row justify-between items-center")}
        >
          {icon && <Icon icon={icon} />}
          <Text size="lg">{title}</Text>
          <DialogClose asChild>
            <IconButton
              ariaLabel="closeDrawer"
              icon={IconX}
              variant="ghost"
              onClick={() => setOpen?.(false)}
            />
          </DialogClose>
        </div>
        {content}
      </DialogContent>
    </DialogPortal>
  </Root>
);
