import {
  IconArrowBarRight,
  IconArrowBarToRight,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import cn from "classnames";
import { getEventEnd, type VEvent } from "ts-ics";

import {
  bgColors,
  focus,
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
import type { UseViewEventProps } from "./view";

export type EventProps = {
  event: VEvent;
  beginsBeforeThisDay?: boolean;
  endsAfterThisDay?: boolean;
  viewEventProps?: UseViewEventProps;
};

export const Event = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
  viewEventProps,
}: EventProps) => {
  const startsAndEndsOnSameDay = !beginsBeforeThisDay && !endsAfterThisDay;
  const showTime = !beginsBeforeThisDay || !endsAfterThisDay;

  const Component = viewEventProps ? "button" : "div";

  return (
    <Component
      onClick={
        viewEventProps
          ? () => {
              viewEventProps?.setView(event);
            }
          : undefined
      }
      type={viewEventProps ? "button" : undefined}
      className={cn(
        "flex w-full h-full overflow-hidden relative truncate",
        bgColors.primary,
        focus.primary,
        paddingsEvenly.sm,
        !beginsBeforeThisDay && roundingsTop.md,
        !endsAfterThisDay && roundingsBottom.md
      )}
    >
      <div
        className={cn("absolute overflow-hidden flex flex-row", gapsSmall.sm)}
      >
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
            {" - "}
          </Text>
        )}
        <Text size="sm">{event.summary}</Text>
      </div>
    </Component>
  );
};

export const EventSmall = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
  viewEventProps,
}: EventProps) => {
  const startsAndEndsOnSameDay = !beginsBeforeThisDay && !endsAfterThisDay;
  const showTime = !beginsBeforeThisDay || !endsAfterThisDay;

  const Component = viewEventProps ? "button" : "div";

  return (
    <Component
      onClick={
        viewEventProps
          ? () => {
              viewEventProps?.setView(event);
            }
          : undefined
      }
      type={viewEventProps ? "button" : undefined}
      className={cn(
        "flex-shrink-0 flex flex-col justify-center relative",
        bgColors.primary,
        focus.primary,
        paddingsEvenly.sm,
        heights.md,
        roundings.md
      )}
    >
      <div className={cn("flex flex-row items-center truncate", gapsSmall.sm)}>
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
            {" - "}
          </Text>
        )}
        <Text size="sm">{event.summary}</Text>
      </div>
    </Component>
  );
};
