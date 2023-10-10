import { IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import cn from "classnames";
import { useState } from "react";
import { getEventEnd, type VEvent } from "ts-ics";

import { gaps } from "../../../../../styles";
import { Button, IconButton } from "../../../Button";
import { Modal } from "../../../Modal";
import { Prose } from "../../../Prose";
import { Text } from "../../../Typography";
import type { ScheduleProps } from "..";
import type { UseEditEventProps } from "./edit";

export type UseViewEventProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  event?: VEvent;
  setEvent: (event: VEvent) => void;
  setView: (event: VEvent) => void;
  onClose: () => void;
};

export const useViewEvent = (): UseViewEventProps => {
  const [open, setOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<VEvent>();

  const setView = (event: VEvent) => {
    if (event) setEvent(event);
    setOpen(true);
  };

  const onClose = () => {
    setEvent(undefined);
    setOpen(false);
  };

  return { open, setOpen, event, setEvent, setView, onClose };
};

export type ViewEventProps = Pick<ScheduleProps, "onDelete"> & {
  viewEventProps: UseViewEventProps;
  editEventProps: UseEditEventProps;
};

export const ViewEvent = ({
  viewEventProps,
  onDelete,
  editEventProps,
}: ViewEventProps) => {
  if (!viewEventProps || !viewEventProps.event) return null;

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <Modal
      open={viewEventProps.open}
      onClose={viewEventProps.onClose}
      setOpen={viewEventProps.setOpen}
      header={
        <div
          className={cn(
            "flex flex-row items-center justify-between w-full",
            gaps.md
          )}
        >
          <Text>Termin</Text>
          <div className={cn("flex flex-row", gaps.sm)}>
            <IconButton
              icon={IconTrash}
              color="danger"
              size="sm"
              variant="ghost"
              ariaLabel="delete_event"
              onClick={() => {
                if (!viewEventProps.event) return;
                onDelete(viewEventProps.event);
                viewEventProps.onClose();
              }}
            />
            <IconButton
              size="sm"
              variant="ghost"
              icon={IconX}
              ariaLabel="close_view_event"
              onClick={() => {
                viewEventProps.onClose();
              }}
            />
          </div>
        </div>
      }
      content={
        <div className={cn("flex flex-col", gaps.xs)}>
          <Text>Titel: {viewEventProps.event?.summary}</Text>
          <Text>
            Start: {formatter.format(viewEventProps.event?.start.date)}
          </Text>
          <Text>
            Ende: {formatter.format(getEventEnd(viewEventProps.event))}
          </Text>
          {viewEventProps.event.location && (
            <Text>Ort: {viewEventProps.event.location}</Text>
          )}
          {viewEventProps.event.description && (
            <div>
              <Text size="sm">Beschreibung</Text>
              <Prose content={viewEventProps.event.description} />
            </div>
          )}
        </div>
      }
      footer={
        <div
          className={cn(
            "flex flex-row w-full items-center justify-end",
            gaps.md
          )}
        >
          <Button
            size="sm"
            color="primary"
            leftIcon={IconPencil}
            onClick={() => {
              viewEventProps.onClose();
              editEventProps.setEdit(viewEventProps.event);
            }}
          >
            Bearbeiten
          </Button>
        </div>
      }
    />
  );
};
