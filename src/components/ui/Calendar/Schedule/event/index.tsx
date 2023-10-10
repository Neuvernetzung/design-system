import { useDraggable } from "@dnd-kit/core";
import { Coordinates, CSS } from "@dnd-kit/utilities";
import {
  IconArrowBarRight,
  IconArrowBarToRight,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import cn from "classnames";
import { addDays, addHours, addMinutes } from "date-fns";
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
  shadows,
  transitionFast,
} from "../../../../../styles";
import { useThemeStateValue } from "../../../../../theme";
import type { Color } from "../../../../../types";
import { Icon } from "../../../Icon";
import { Text } from "../../../Typography";
import { dayGridDeltaToTime } from "../DayGrid/dragAndDrop";
import { timeFormatter } from "../utils/formatTitle";
import type { UseViewEventProps } from "./view";

export type EventProps = {
  event: VEvent;
  beginsBeforeThisDay?: boolean;
  endsAfterThisDay?: boolean;
  viewEventProps?: UseViewEventProps;
  color?: Color;
  className?: string;
};

export const DraggableEvent = ({ ...props }: EventProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: props.event.uid,
    });

  return (
    <span
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
    >
      <Event {...props} className={cn(isDragging && "opacity-50")} />
    </span>
  );
};

export type DragOverLayEventProps = Partial<Pick<EventProps, "event">> & {
  innerHeight: number;
  precisionInMinutes: number;
  delta: Coordinates;
  innerWidth: number;
  cols: number;
};

export const DragOverlayEvent = ({
  event,
  innerHeight,
  precisionInMinutes,
  delta,
  cols,
  innerWidth,
}: DragOverLayEventProps) => {
  if (!event) return null;

  const { days, hours, minutes } = dayGridDeltaToTime({
    delta,
    innerWidth,
    cols,
    innerHeight,
    precisionInMinutes,
  });

  const newEvent = {
    ...event,
    start: {
      ...event.start,
      date: addDays(
        addHours(addMinutes(event.start.date, minutes), hours),
        days
      ),
    },
    end: !event.duration
      ? {
          ...event.end,
          date: addDays(
            addHours(addMinutes(event.end.date, minutes), hours),
            days
          ),
        }
      : undefined,
  } as VEvent;

  return <Event event={newEvent} className={cn(shadows.xl)} />;
};

export const Event = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
  viewEventProps,
  color = "primary",
  className,
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
        "flex w-full h-full relative overflow-hidden truncate",
        viewEventProps ? bgColorsInteractive[color] : bgColors[color],
        transitionFast,
        viewEventProps && focusBg[color],
        paddingsEvenly.sm,
        !beginsBeforeThisDay && roundingsTop.md,
        !endsAfterThisDay && roundingsBottom.md,
        className
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

export const DraggableEventSmall = ({ ...props }: EventProps) => {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: props.event.uid,
  });

  return (
    <span {...attributes} {...listeners} ref={setNodeRef}>
      <EventSmall {...props} className={cn(isDragging && "opacity-50")} />
    </span>
  );
};

export type DragOverLayEventSmallProps = Partial<Pick<EventProps, "event">>;

export const DragOverlayEventSmall = ({
  event,
}: DragOverLayEventSmallProps) => {
  if (!event) return null;

  return <EventSmall event={event} className={cn(shadows.xl)} />;
};

export const EventSmall = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
  viewEventProps,
  color = "primary",
  className,
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
        "flex-shrink-0 w-full flex flex-col justify-center relative truncate",
        viewEventProps ? bgColorsInteractive[color] : bgColors[color],
        transitionFast,
        viewEventProps && focusBg[color],
        paddingsEvenly.sm,
        heights.md,
        roundings.md,
        className
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
