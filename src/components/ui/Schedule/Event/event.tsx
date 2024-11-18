import { useDraggable } from "@dnd-kit/core";
import type { Coordinates } from "@dnd-kit/utilities";
import {
  IconArrowBarRight,
  IconArrowBarToRight,
  IconArrowNarrowRight,
  IconCalendarCancel,
} from "@tabler/icons-react";
import { cn } from "@/utils";
import { addDays, addHours, addMinutes } from "date-fns";
import { getEventEnd, type VEvent } from "ts-ics";

import { gapsSmall, shadows } from "../../../../styles";
import type { Color } from "../../../../types";
import { Button } from "../../Button";
import { Icon } from "../../Icon";
import { Text } from "../../Typography";
import { dayGridDeltaToTime } from "../DayGrid/dragAndDrop";
import { dayAndMonthFormatter, timeFormatter } from "../utils/formatTitle";
import type { UseViewEventProps } from "./view";
import { ScheduleDayProps } from "../View/day";
import { ScheduleMonthViewProps } from "../View/month";
import { CSSProperties } from "react";

export type EventProps = {
  event: VEvent;
  beginsBeforeThisDay?: boolean;
  endsAfterThisDay?: boolean;
  viewEventProps?: UseViewEventProps;
  isDragoverlay?: boolean;
  color?: Color;
  className?: string;
  style?: CSSProperties;
  isReverse?: boolean;
  showStartDate?: boolean;
};

export const DraggableEvent = ({
  disableDrag,
  ...props
}: EventProps & Pick<ScheduleDayProps, "disableDrag">) => {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: props.event.uid,
    disabled: disableDrag,
  });

  return (
    <div className="h-full" {...attributes} {...listeners} ref={setNodeRef}>
      <Event {...props} className={cn(isDragging && "opacity-50")} />
    </div>
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

  return <Event isDragoverlay event={newEvent} className={cn(shadows.xl)} />;
};

const formatEventTitle = (event: VEvent) =>
  `${event.summary}\nStart: ${event.start.date}\nEnde: ${getEventEnd(event)}${
    event.description ? `\n\nBeschreibung:\n${event.description}` : ""
  }`;

export const Event = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
  isReverse,
  viewEventProps,
  color = "primary",
  className,
  isDragoverlay,
  showStartDate,
  style,
}: EventProps) => {
  const startsAndEndsOnSameDay = !beginsBeforeThisDay && !endsAfterThisDay;
  const showTime = !beginsBeforeThisDay || !endsAfterThisDay;

  return (
    <Button
      title={formatEventTitle(event)}
      asChild={!!viewEventProps}
      color={color}
      disabled={!viewEventProps ? !isDragoverlay : false}
      variant={
        event.status === "TENTATIVE"
          ? "subtile"
          : event.status === "CANCELLED"
          ? "outline"
          : "filled"
      }
      onClick={
        viewEventProps
          ? () => {
              viewEventProps?.setView(event);
            }
          : undefined
      }
      type={viewEventProps ? "button" : undefined}
      className={cn(
        "flex items-start justify-start w-full h-full relative overflow-hidden truncate",
        beginsBeforeThisDay &&
          (isReverse ? "rounded-b-none" : "rounded-t-none"),
        endsAfterThisDay && (isReverse ? "rounded-t-none" : "rounded-b-none"),
        className
      )}
      style={style}
    >
      <div
        className={cn(
          "absolute overflow-hidden flex flex-col",
          gapsSmall.xs,
          event.status === "CANCELLED" && "line-through"
        )}
      >
        {/* Ist absolute, damit Inhalt nicht die Breite bestimmt. */}
        <div className={cn("flex flex-row items-center", gapsSmall.sm)}>
          {showStartDate && (
            <Text size="xs" color="inherit">
              {dayAndMonthFormatter.format(event.start.date)}
            </Text>
          )}
          {(!startsAndEndsOnSameDay || event.status === "CANCELLED") && (
            <Icon
              color="inherit"
              size="xs"
              icon={
                event.status === "CANCELLED"
                  ? IconCalendarCancel
                  : beginsBeforeThisDay && endsAfterThisDay
                  ? IconArrowNarrowRight
                  : beginsBeforeThisDay
                  ? IconArrowBarToRight
                  : IconArrowBarRight
              }
            />
          )}
          {showTime && (
            <Text size="xs" color="inherit">
              {showTime &&
                (beginsBeforeThisDay
                  ? timeFormatter.format(getEventEnd(event))
                  : endsAfterThisDay
                  ? timeFormatter.format(event.start.date)
                  : startsAndEndsOnSameDay &&
                    timeFormatter.format(event.start.date))}
            </Text>
          )}
        </div>
        <div className={cn("flex flex-row", gapsSmall.sm)}>
          <Text size="sm" color="inherit">
            {event.summary}
          </Text>
        </div>
      </div>
    </Button>
  );
};

export const DraggableEventSmall = ({
  disableDrag,
  ...props
}: EventProps & Pick<ScheduleMonthViewProps, "disableDrag">) => {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: props.event.uid,
    disabled: disableDrag,
  });

  return (
    <li {...attributes} {...listeners} ref={setNodeRef}>
      <EventSmall {...props} className={cn(isDragging && "opacity-50")} />
    </li>
  );
};

export type DragOverLayEventSmallProps = Partial<Pick<EventProps, "event">>;

export const DragOverlayEventSmall = ({
  event,
}: DragOverLayEventSmallProps) => {
  if (!event) return null;

  return <EventSmall isDragoverlay event={event} className={cn(shadows.xl)} />;
};

export const EventSmall = ({
  event,
  beginsBeforeThisDay,
  endsAfterThisDay,
  viewEventProps,
  color = "primary",
  className,
  isDragoverlay,
  showStartDate,
  style,
}: Omit<EventProps, "isReverse">) => {
  const startsAndEndsOnSameDay = !beginsBeforeThisDay && !endsAfterThisDay;
  const showTime = !beginsBeforeThisDay || !endsAfterThisDay;

  return (
    <Button
      asChild={!!viewEventProps}
      title={formatEventTitle(event)}
      disabled={!viewEventProps ? !isDragoverlay : false}
      color={color}
      variant={
        event.status === "TENTATIVE"
          ? "subtile"
          : event.status === "CANCELLED"
          ? "outline"
          : "filled"
      }
      onClick={
        viewEventProps
          ? () => {
              viewEventProps?.setView(event);
            }
          : undefined
      }
      type={viewEventProps ? "button" : undefined}
      className={cn(
        "flex-shrink-0 w-full flex flex-row justify-start relative truncate",
        className
      )}
      style={style}
    >
      <div
        className={cn(
          "absolute overflow-hidden flex flex-col items-start",
          gapsSmall.xs,
          event.status === "CANCELLED" && "line-through"
        )}
      >
        {/* Ist absolute, damit Inhalt nicht die Breite bestimmt. */}
        <div className={cn("flex flex-row items-center w-full", gapsSmall.sm)}>
          {(!startsAndEndsOnSameDay || event.status === "CANCELLED") && (
            <Icon
              color="inherit"
              size="xs"
              icon={
                event.status === "CANCELLED"
                  ? IconCalendarCancel
                  : beginsBeforeThisDay && endsAfterThisDay
                  ? IconArrowNarrowRight
                  : beginsBeforeThisDay
                  ? IconArrowBarToRight
                  : IconArrowBarRight
              }
            />
          )}
          {showTime && (
            <Text size="xs" color="inherit">
              {showTime &&
                (beginsBeforeThisDay
                  ? timeFormatter.format(getEventEnd(event))
                  : endsAfterThisDay
                  ? timeFormatter.format(event.start.date)
                  : startsAndEndsOnSameDay &&
                    timeFormatter.format(event.start.date))}
            </Text>
          )}
          {showStartDate && (
            <Text size="xs" color="inherit" className="w-full">
              {dayAndMonthFormatter.format(event.start.date)}
            </Text>
          )}
        </div>
        <div
          className={cn(
            "flex flex-row justify-start w-full items-center",
            gapsSmall.sm
          )}
        >
          <Text size="sm" color="inherit">
            {event.summary}
          </Text>
        </div>
      </div>
    </Button>
  );
};
