import { IconX } from "@tabler/icons-react";
import cn from "classnames";
import type { VEvent } from "ts-ics";

import { gaps, gapsSmall } from "../../../../styles";
import { IconButton } from "../../Button";
import { Modal } from "../../Modal";
import { Text } from "../../Typography";
import { titleFormatter } from "../utils/formatTitle";
import { EventSmall } from "./event";
import { type UseViewEventProps } from "./view";
import type { ScheduleProps } from "..";

export type EventListModal = Pick<ScheduleProps, "eventColor"> & {
  open: boolean;
  setOpen: (open: boolean) => void;
  events: {
    event: VEvent;
    beginsBeforeThisDay: boolean;
    endsAfterThisDay: boolean;
  }[];
  day: Date;
  viewEventProps?: UseViewEventProps;
};

export const EventListModal = ({
  open,
  setOpen,
  events,
  day,
  viewEventProps,
  eventColor,
}: EventListModal) => (
  <Modal
    open={open}
    setOpen={setOpen}
    header={
      <div
        className={cn(
          "flex flex-row w-full justify-between align-center",
          gaps.md
        )}
      >
        <Text>{titleFormatter.format(day)}</Text>
        <IconButton
          onClick={() => {
            setOpen(false);
          }}
          icon={IconX}
          variant="ghost"
          size="sm"
          ariaLabel="close_modal"
        />
      </div>
    }
    content={
      <div className={cn("flex flex-col w-full", gapsSmall.sm)}>
        {events.map(({ event, beginsBeforeThisDay, endsAfterThisDay }, i) => (
          <EventSmall
            key={`event_${event.summary}_${i}`}
            beginsBeforeThisDay={beginsBeforeThisDay}
            endsAfterThisDay={endsAfterThisDay}
            event={event}
            viewEventProps={viewEventProps}
            color={eventColor}
          />
        ))}
      </div>
    }
  />
);
