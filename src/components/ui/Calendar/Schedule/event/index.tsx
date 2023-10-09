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
      "flex h-full overflow-hidden relative truncate",
      bgColors.primary,
      paddingsEvenly.sm,
      !beginsBeforeThisDay && roundingsTop.md,
      !endsAfterThisDay && roundingsBottom.md
    )}
  >
    <div className="absolute overflow-hidden">
      {/* Ist absolute, damit Inhalt nicht die Breite bestimmt. */}
      <Text size="sm">{event.summary}</Text>
    </div>
  </div>
);
