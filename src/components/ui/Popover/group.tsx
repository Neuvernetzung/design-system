import { Popover } from "@headlessui/react";
import cn from "classnames";
import { FC, ReactNode } from "react";
import { typedMemo } from "../../../utils/internal";

export type PopoverGroupProps = {
  children: ReactNode;
  className?: string;
};

export const PopoverGroup: FC<PopoverGroupProps> = ({
  children,
  className,
}) => <Popover.Group className={cn("", className)}>{children}</Popover.Group>;

export default typedMemo(PopoverGroup);
