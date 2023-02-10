import { Dialog } from "@headlessui/react";
import cn from "classnames";
import { FC, memo, MutableRefObject, ReactNode, SVGProps } from "react";

import {
  bgColors,
  borders,
  gaps,
  paddingsLargeEvenly,
  shadows,
  transition,
  zIndexes,
} from "../../../styles";
import { CrossIcon } from "../../../theme/icons";
import { ExtendedSizes, Sizes } from "../../../types";
import { Backdrop } from "../Backdrop";
import { IconButton } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type DrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialFocus?: MutableRefObject<HTMLElement>;
  size?: keyof DrawerSizes;
  icon?: FC<SVGProps<SVGSVGElement>>;
  title?: string;
  content?: ReactNode;
  placement?: keyof Placements;
};

export interface DrawerSizes extends Sizes, Pick<ExtendedSizes, "2xl" | "3xl"> {
  full: any;
}

const widths: DrawerSizes = {
  xs: "max-w-md",
  sm: "max-w-lg",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
  "2xl": "max-w-4xl",
  "3xl": "max-w-5xl",
  full: "max-w-none",
};

type Placements = {
  top: any;
  bottom: any;
  left: any;
  right: any;
};

const placements = (
  size: keyof DrawerSizes
): Record<keyof Placements, string> => ({
  right: cn(widths[size], "right-0 inset-y-0"),
  left: cn(widths[size], "left-0 inset-y-0"),
  top: cn("top-0 inset-x-0"),
  bottom: cn("bottom-0 inset-x-0"),
});

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
    className={cn(zIndexes.modal, "relative")}
    open={open}
    onClose={() => setOpen(false)}
  >
    <Backdrop />

    <Dialog.Panel
      className={cn(
        transition,
        borders.accent,
        bgColors.white,
        paddingsLargeEvenly.lg,
        gaps.md,
        placements(size)[placement],
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
          icon={CrossIcon}
          variant="ghost"
          onClick={() => setOpen(false)}
        />
      </div>
      {content}
    </Dialog.Panel>
  </Dialog>
);

export default memo(Drawer);
