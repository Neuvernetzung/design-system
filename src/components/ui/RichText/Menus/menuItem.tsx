import { FC, SVGProps, ReactNode } from "react";
import { Tooltip } from "../../Tooltip";
import { IconButton } from "../../Button";
import cn from "classnames";
import { gapsSmall } from "../../../../styles";

type RichTextMenuItemProps = {
  onClick: (data: any[]) => void;
  icon: FC<SVGProps<SVGSVGElement>>;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  ariaLabel: string;
};

export const RichTextMenuItem = ({
  onClick,
  icon,
  active,
  disabled,
  tooltip,
  ariaLabel,
}: RichTextMenuItemProps) => (
  <Tooltip label={tooltip} placement="top">
    <IconButton
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
