import {
  IconArrowBarRight,
  IconArrowBarToRight,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import cn from "classnames";
import { getEventEnd, type VEvent } from "ts-ics";

import {
  bgColors,
  gapsSmall,
  heights,
  paddingsEvenly,
  roundings,
  roundingsBottom,
  roundingsTop,
} from "../../../../../styles";
import { Icon } from "../../../Icon";
import { Text } from "../../../Typography";
import { timeFormatter } from "../utils/formatTitle";

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

export const EventSmall = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
}: EventProps) => {
  const startsAndEndsOnSameDay = !beginsBeforeThisDay && !endsAfterThisDay;
  const showTime = !beginsBeforeThisDay || !endsAfterThisDay;

  return (
    <div
      className={cn(
        "flex-shrink-0 flex flex-col justify-center overflow-hidden relative truncate",
        bgColors.primary,
        paddingsEvenly.sm,
        heights.md,
        roundings.md
      )}
    >
      <div className={cn("flex flex-row items-center", gapsSmall.sm)}>
        {/* Ist absolute, damit Inhalt nicht die Breite bestimmt. */}
        {!startsAndEndsOnSameDay && (
          <Icon
            size="sm"
            icon={
              beginsBeforeThisDay && endsAfterThisDay
                ? IconArrowNarrowRight
                : beginsBeforeThisDay
                ? IconArrowBarToRight
                : IconArrowBarRight
            }
          />
        )}
        {showTime && (
          <Text size="sm">
            {showTime &&
              (beginsBeforeThisDay
                ? timeFormatter.format(getEventEnd(event))
                : endsAfterThisDay
                ? timeFormatter.format(event.start.date)
                : startsAndEndsOnSameDay &&
                  timeFormatter.format(event.start.date))}
          </Text>
        )}
        <Text size="sm">{event.summary}</Text>
      </div>
    </div>
  );
};
