import { IconGripVertical } from "@tabler/icons-react";
import {
  bgColors,
  borders,
  paddingsEvenly,
  roundings,
  shadows,
} from "../../../../styles";
import { IconButton } from "../../Button/IconButton";
import { Text } from "../../Typography/Text";
import { cn } from "@/utils/cn";
import type { Size } from "../../../../types";
import { Tag } from "../../Tag";
import { smallerSize } from "@/utils/size";

type DragOverlayProps = {
  size?: Size;
  handle?: boolean;
  itemCount?: number;
};

export const DragOverlay = ({
  size = "md",
  handle,
  itemCount,
}: DragOverlayProps) => (
  <div
    className={cn(
      "w-min border flex flex-row gap-4 items-center",
      bgColors.white,
      roundings[size],
      borders.accent,
      shadows.md,
      paddingsEvenly[size]
    )}
  >
    {handle && (
      <IconButton
        icon={IconGripVertical}
        variant="ghost"
        size="sm"
        ariaLabel="drag_overlay_handle"
      />
    )}
    <Text className="whitespace-nowrap">
      {itemCount && itemCount > 1 ? "Items" : "Item"}
    </Text>
    {itemCount && <Tag size={smallerSize(size)}>{String(itemCount)}</Tag>}
  </div>
);
