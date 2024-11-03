import {
  IconArrowBarRight,
  IconArrowBarToRight,
  IconCalendar,
  IconCalendarCancel,
  IconCheck,
  IconClock,
  IconMapPin,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/utils";
import { isSameDay } from "date-fns";
import isFunction from "lodash/isFunction";
import { useRef, useState } from "react";
import { getEventEnd, type VEvent } from "ts-ics";

import {
  extendedBgColors,
  gaps,
  paddingsEvenly,
  roundings,
} from "../../../../styles";
import { Button, IconButton } from "../../Button";
import { Icon } from "../../Icon";
import { Modal } from "../../Modal";
import { Prose } from "../../Prose";
import { Tag } from "../../Tag";
import { Text } from "../../Typography";
import type { ScheduleProps } from "..";

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

export type ViewEventProps = Pick<
  ScheduleProps,
  | "onDelete"
  | "onUpdate"
  | "disableUpdate"
  | "disableDelete"
  | "onCancelEventStatus"
  | "onConfirmEventStatus"
> &
  Partial<Pick<ScheduleProps, "viewEventProps" | "editEventProps">>;

export const ViewEvent = ({
  viewEventProps,
  onDelete,
  onUpdate,
  onCancelEventStatus,
  onConfirmEventStatus,
  editEventProps,
  disableDelete,
  disableUpdate,
}: ViewEventProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  if (!viewEventProps || !viewEventProps.event) return null;

  const dayFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
  });

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  });

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });

  const event = viewEventProps.event;

  const end = getEventEnd(event);

  const allowDelete = isFunction(onDelete);
  const allowUpdate = isFunction(onUpdate);
  const allowConfirm = isFunction(onConfirmEventStatus) || allowUpdate;
  const allowCancel = isFunction(onCancelEventStatus) || allowUpdate;

  return (
    <Modal
      open={viewEventProps.open}
      setOpen={viewEventProps.setOpen}
      initialFocus={closeRef} // initialFocus auf close, damit Fokus nicht auf löschen liegt.
      header={
        <div
          className={cn(
            "flex flex-row items-center justify-between w-full",
            gaps.md
          )}
        >
          <div className={cn("flex flex-row", gaps.sm)}>
            <Icon icon={IconCalendar} />
            <Text>{event?.summary}</Text>
          </div>
          <div className={cn("flex flex-row", gaps.sm)}>
            {!disableDelete && allowDelete && (
              <IconButton
                icon={IconTrash}
                color="danger"
                size="sm"
                variant="ghost"
                ariaLabel="delete_event"
                onClick={() => {
                  onDelete(event);
                  viewEventProps.onClose();
                }}
              />
            )}
            <IconButton
              ref={closeRef}
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
        <div className={cn("flex flex-col items-start w-full", gaps.xs)}>
          {isSameDay(event?.start.date, end) ? (
            <>
              <Tag leftIcon={IconCalendar} variant="subtile">
                {dayFormatter.format(event.start.date)}
              </Tag>
              <Tag leftIcon={IconClock} variant="subtile">
                {timeFormatter.format(event.start.date)} -{" "}
                {timeFormatter.format(end)}
              </Tag>
            </>
          ) : (
            <>
              <Tag leftIcon={IconArrowBarRight} variant="subtile">
                {formatter.format(event.start.date)}
              </Tag>
              <Tag leftIcon={IconArrowBarToRight} variant="subtile">
                {formatter.format(end)}
              </Tag>
            </>
          )}
          {event.location && (
            <Tag leftIcon={IconMapPin} variant="subtile">
              {event.location}
            </Tag>
          )}
          {event.categories && event.categories.length > 0 && (
            <div className="flex flex-col w-full">
              <Text size="sm">Kategorien</Text>
              <div
                className={cn(
                  "w-full flex flex-row flex-wrap",
                  gaps.sm,
                  paddingsEvenly.md,
                  roundings.md,
                  extendedBgColors.subtile
                )}
              >
                {event.categories.map((category) => (
                  <Tag variant="subtile" key={category}>
                    {category}
                  </Tag>
                ))}
              </div>
            </div>
          )}
          {event.description && (
            <div className="flex flex-col w-full">
              <Text size="sm">Beschreibung</Text>
              <Prose
                className={cn(
                  "w-full",
                  paddingsEvenly.md,
                  roundings.md,
                  extendedBgColors.subtile
                )}
                content={event.description}
              />
            </div>
          )}
          {event.attendees && event.attendees.length > 0 && (
            <div className="flex flex-col w-full">
              <Text size="sm">Personen</Text>
              <div className={cn("flex flex-col", gaps.sm)}>
                {event.attendees.map((attendee, i) => (
                  <div
                    key={`attendee_${i}`}
                    className={cn(
                      "flex flex-row justify-between",
                      gaps.xs,
                      paddingsEvenly.md,
                      roundings.md,
                      extendedBgColors.subtile
                    )}
                  >
                    <div className={cn("flex flex-col", gaps.xs)}>
                      {attendee.name && (
                        <div className={cn("flex flex-col")}>
                          <Text size="xs">Name</Text>
                          <Text>{attendee.name}</Text>
                        </div>
                      )}
                      <div className={cn("flex flex-col")}>
                        <Text size="xs">E-Mail</Text>
                        <Text>{attendee.email}</Text>
                      </div>
                    </div>
                    {attendee.partstat && (
                      <Tag
                        size="sm"
                        variant="outline"
                        color={
                          attendee.partstat === "ACCEPTED"
                            ? "success"
                            : attendee.partstat === "DECLINED"
                            ? "warn"
                            : attendee.partstat === "TENTATIVE"
                            ? "accent"
                            : undefined
                        }
                      >
                        {attendee.partstat === "ACCEPTED"
                          ? "Bestätigt"
                          : attendee.partstat === "DECLINED"
                          ? "Abgesagt"
                          : attendee.partstat === "TENTATIVE"
                          ? "Vorgemerkt"
                          : undefined}
                      </Tag>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      }
      footer={
        <div
          className={cn(
            "flex flex-row w-full items-center justify-between",
            gaps.md
          )}
        >
          {!disableUpdate && event.status !== "CANCELLED" && allowCancel && (
            <Button
              size="sm"
              variant="ghost"
              leftIcon={IconCalendarCancel}
              onClick={() => {
                if (isFunction(onCancelEventStatus)) {
                  onCancelEventStatus({ ...event, status: "CANCELLED" });
                } else {
                  onUpdate?.({ ...event, status: "CANCELLED" }, event);
                }

                viewEventProps.onClose();
              }}
            >
              Stornieren
            </Button>
          )}
          <div className={cn("flex flex-row justify-end w-full", gaps.md)}>
            {!disableUpdate && event.status === "TENTATIVE" && allowConfirm && (
              <Button
                size="sm"
                color="success"
                leftIcon={IconCheck}
                onClick={() => {
                  if (isFunction(onConfirmEventStatus)) {
                    onConfirmEventStatus({ ...event, status: "CONFIRMED" });
                  } else {
                    onUpdate?.({ ...event, status: "CONFIRMED" }, event);
                  }

                  viewEventProps.onClose();
                }}
              >
                Akzeptieren
              </Button>
            )}

            {!disableUpdate && editEventProps && (
              <Button
                size="sm"
                color="primary"
                leftIcon={IconPencil}
                onClick={() => {
                  editEventProps?.setEdit(event);
                  viewEventProps.onClose();
                }}
              >
                Bearbeiten
              </Button>
            )}
          </div>
        </div>
      }
    />
  );
};
