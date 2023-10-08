import cn from "classnames";
import type { VEvent } from "ts-ics";

import {
  bgColors,
  paddingsEvenly,
  roundingsBottom,
  roundingsTop,
} from "../../../../../styles";
import { Text } from "../../../Typography";

export type EventProps = {
  event: VEvent;
  beginsBeforeThisDay?: boolean;
  endsAfterThisDay?: boolean;
};

export const Event = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
}: EventProps) => (
  <div
    className={cn(
      "h-full overflow-hidden",
      bgColors.primary,
      paddingsEvenly.sm,
      !beginsBeforeThisDay && roundingsTop.md,
      !endsAfterThisDay && roundingsBottom.md
    )}
  >
    <Text size="sm" className="whitespace-nowrap">
      {event.summary}
    </Text>
  </div>
);
