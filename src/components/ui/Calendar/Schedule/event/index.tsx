import {
  IconArrowBarRight,
  IconArrowBarToRight,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import cn from "classnames";
import { getEventEnd, type VEvent } from "ts-ics";

import {
  bgColors,
  bgColorsInteractive,
  focusBg,
  gapsSmall,
  heights,
  paddingsEvenly,
  roundings,
  roundingsBottom,
  roundingsTop,
  transitionFast,
} from "../../../../../styles";
import { useThemeStateValue } from "../../../../../theme";
import type { Color } from "../../../../../types";
import { Icon } from "../../../Icon";
import { Text } from "../../../Typography";
import { timeFormatter } from "../utils/formatTitle";
import type { UseViewEventProps } from "./view";

export type EventProps = {
  event: VEvent;
  beginsBeforeThisDay?: boolean;
  endsAfterThisDay?: boolean;
  viewEventProps?: UseViewEventProps;
  color?: Color;
};

export const Event = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
  viewEventProps,
  color = "primary",
}: EventProps) => {
  const startsAndEndsOnSameDay = !beginsBeforeThisDay && !endsAfterThisDay;
  const showTime = !beginsBeforeThisDay || !endsAfterThisDay;

  const Component = viewEventProps ? "button" : "div";

  const adjustedTextColor = useThemeStateValue((v) => v.adjustedTextColorState);

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
        viewEventProps ? bgColorsInteractive[color] : bgColors[color],
        transitionFast,
        viewEventProps && focusBg[color],
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
            className={cn(adjustedTextColor[color])}
            color="inherit"
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
          <Text
            size="sm"
            className={cn(adjustedTextColor[color])}
            color="inherit"
          >
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
        <Text
          size="sm"
          className={cn(adjustedTextColor[color])}
          color="inherit"
        >
          {event.summary}
        </Text>
      </div>
    </Component>
  );
};

export const EventSmall = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
  viewEventProps,
  color = "primary",
}: EventProps) => {
  const startsAndEndsOnSameDay = !beginsBeforeThisDay && !endsAfterThisDay;
  const showTime = !beginsBeforeThisDay || !endsAfterThisDay;

  const Component = viewEventProps ? "button" : "div";

  const adjustedTextColor = useThemeStateValue((v) => v.adjustedTextColorState);

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
        viewEventProps ? bgColorsInteractive[color] : bgColors[color],
        transitionFast,
        viewEventProps && focusBg[color],
        paddingsEvenly.sm,
        heights.md,
        roundings.md
      )}
    >
      <div className={cn("flex flex-row items-center truncate", gapsSmall.sm)}>
        {/* Ist absolute, damit Inhalt nicht die Breite bestimmt. */}
        {!startsAndEndsOnSameDay && (
          <Icon
            className={cn(adjustedTextColor[color])}
            color="inherit"
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
          <Text
            size="sm"
            className={cn(adjustedTextColor[color])}
            color="inherit"
          >
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
        <Text
          size="sm"
          className={cn(adjustedTextColor[color])}
          color="inherit"
        >
          {event.summary}
        </Text>
      </div>
    </Component>
  );
};
