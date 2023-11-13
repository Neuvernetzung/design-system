import { cn } from "@/utils";
import { MouseEventHandler, ReactNode } from "react";

import { gapsSmall } from "../../../../styles";
import { SvgType } from "../../../../types";
import { IconButton } from "../../Button";
import { Tooltip } from "../../Tooltip";

type RichTextMenuItemProps = {
  onClick: MouseEventHandler;
  icon: SvgType;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  ariaLabel: string;
  id: string;
};

export const RichTextMenuItem = ({
  onClick,
  icon,
  active,
  disabled,
  tooltip,
  ariaLabel,
  id,
}: RichTextMenuItemProps) => (
  <Tooltip label={tooltip}>
    <IconButton
      id={id}
      tabIndex={-1}
      size="sm"
      variant={active ? "subtile" : "ghost"}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      ariaLabel={ariaLabel}
    />
  </Tooltip>
);

type RichTextMenuGroupProps = {
  children: ReactNode;
};

export const RichTextMenuGroup = ({ children }: RichTextMenuGroupProps) => (
  <div className={cn("flex flex-row flex-wrap", gapsSmall.xs)}>{children}</div>
);
