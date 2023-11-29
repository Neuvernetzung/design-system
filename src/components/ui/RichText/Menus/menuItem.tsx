import {
  ToolbarButton,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@radix-ui/react-toolbar";
import type { MouseEventHandler, ReactNode } from "react";

import { cn } from "@/utils";

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
  value: string;
};

export const RichTextMenuGroupItem = ({
  onClick,
  icon,
  active,
  disabled,
  tooltip,
  ariaLabel,
  value,
}: RichTextMenuItemProps) => (
  <Tooltip label={tooltip} delay={500}>
    <ToolbarToggleItem asChild value={value}>
      <IconButton
        size="sm"
        variant={active ? "subtile" : "ghost"}
        onClick={onClick}
        disabled={disabled}
        icon={icon}
        ariaLabel={ariaLabel}
      />
    </ToolbarToggleItem>
  </Tooltip>
);

export const RichTextMenuItem = ({
  onClick,
  icon,
  active,
  disabled,
  tooltip,
  ariaLabel,
}: Omit<RichTextMenuItemProps, "value">) => (
  <Tooltip label={tooltip} delay={500}>
    <ToolbarButton asChild>
      <IconButton
        size="sm"
        variant={active ? "subtile" : "ghost"}
        onClick={onClick}
        disabled={disabled}
        icon={icon}
        ariaLabel={ariaLabel}
      />
    </ToolbarButton>
  </Tooltip>
);

type RichTextMenuGroupProps = {
  children: ReactNode;
  type: "multiple" | "single";
};

export const menuGroupClassName = cn("flex flex-row flex-nowrap", gapsSmall.xs);

export const RichTextMenuGroup = ({
  type,
  children,
}: RichTextMenuGroupProps) => (
  <ToolbarToggleGroup type={type} className={menuGroupClassName}>
    {children}
  </ToolbarToggleGroup>
);
