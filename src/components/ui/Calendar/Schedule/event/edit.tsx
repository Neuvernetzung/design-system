import { IconLink, IconPencil, IconUnlink, IconX } from "@tabler/icons-react";
import cn from "classnames";
import { type MouseEvent, useState } from "react";
import {
  FieldPathByValue,
  Path,
  UseControllerProps,
  useForm,
} from "react-hook-form";
import {
  getDurationFromInterval,
  getEventEndFromDuration,
  type VEvent,
  type VEventDuration,
} from "ts-ics";

import {
  borders,
  extendedBgColors,
  gaps,
  paddingsEvenly,
  paddingsX,
  roundings,
} from "../../../../../styles";
import { Size } from "../../../../../types";
import { Button, IconButton } from "../../../Button";
import { Datetimepicker } from "../../../Datepicker";
import { FormElement } from "../../../Form";
import { Icon } from "../../../Icon";
import { Input } from "../../../Input";
import { Modal } from "../../../Modal";
import { RichText } from "../../../RichText";
import { Switch } from "../../../Switch";
import { TabGroup, TabItemProps, TabList, TabPanels } from "../../../Tabs";
import { Text } from "../../../Typography";
import type { ScheduleProps } from "..";

export type UseEditEventProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  event?: VEvent;
  setEvent: (event: VEvent) => void;
  setEdit: (event?: VEvent) => void;
  onClose: () => void;
};

export const useEditEvent = (): UseEditEventProps => {
  const [open, setOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<VEvent>();

  const setEdit = (event?: VEvent) => {
    setEvent(event);
    setOpen(true);
  };

  const onClose = () => {
    setEvent(undefined);
    setOpen(false);
  };

  return { open, setOpen, event, setEvent, setEdit, onClose };
};

export type EventEditProps = Pick<ScheduleProps, "onCreate" | "onUpdate"> & {
  editEventProps: UseEditEventProps;
};

export const EventEdit = ({
  editEventProps,
  onCreate,
  onUpdate,
}: EventEditProps) => {
  const isEdit = !!editEventProps.event;

  const { control, handleSubmit, watch, setValue } = useForm<VEvent>({
    values: editEventProps.event ? { ...editEventProps.event } : undefined,
  });

  const onClose = () => {
    editEventProps.onClose();
    setTab(0);
  };

  const { end, duration, start } = watch();

  const isDuration = !!duration;

  const handleDuration = () => {
    if (isDuration) {
      const endDate = getEventEndFromDuration(start.date, duration);
      setValue("end.date", endDate);
      setValue("duration", undefined);
    } else {
      const duration = end?.date
        ? getDurationFromInterval(start?.date, end.date)
        : {};
      setValue("duration", duration);
      setValue("end", undefined);
    }
  };

  const [tab, setTab] = useState<number>(0);

  const tabs: TabItemProps[] = [
    {
      title: "Termin",
      content: (
        <div className={cn("w-full flex flex-col", gaps.sm)}>
          <Input
            name="summary"
            label="Titel"
            control={control}
            size="sm"
            required
          />
          <Datetimepicker
            name="start.date"
            label="Beginn"
            control={control}
            size="sm"
            required
            placeholder="Start auswählen"
          />
          <Button
            size="sm"
            variant={isDuration ? "subtile" : "ghost"}
            leftIcon={isDuration ? IconLink : IconUnlink}
            onClick={handleDuration}
          >
            {isDuration
              ? "Beginn und Ende entknüpfen"
              : "Beginn und Ende verknüpfen"}
          </Button>
          {isDuration ? (
            <ScheduleDurationInput
              name="duration"
              control={control}
              size="sm"
            />
          ) : (
            <Datetimepicker
              name="end.date"
              label="Ende"
              control={control}
              size="sm"
              required
              placeholder="Start auswählen"
            />
          )}
        </div>
      ),
    },
    {
      title: "Erweitert",
      content: (
        <div className={cn("w-full flex flex-col", gaps.sm)}>
          <Input name="location" label="Ort" control={control} size="sm" />
          <Input
            name="categories"
            label="Kategorien"
            control={control}
            size="sm"
          />
          <RichText
            control={control}
            name="description"
            label="Beschreibung"
            size="sm"
          />
        </div>
      ),
    },
  ];

  return (
    <TabGroup selectedIndex={tab} onChange={setTab}>
      <Modal
        open={editEventProps.open}
        headerClassName="pb-0 px-0"
        setOpen={editEventProps.setOpen}
        onClose={onClose}
        header={
          <div className={cn("w-full flex flex-col", gaps.sm)}>
            <div
              className={cn(
                "flex flex-row items-center w-full justify-between",
                gaps.md,
                paddingsX.lg
              )}
            >
              <div className={cn("flex flex-row items-center", gaps.sm)}>
                <Icon icon={IconPencil} />
                <Text>Termin bearbeiten</Text>
              </div>

              <IconButton
                icon={IconX}
                ariaLabel="close_edit_modal"
                onClick={onClose}
                variant="ghost"
                size="sm"
              />
            </div>
            <TabList listClassName={cn(paddingsX.lg)} size="sm" items={tabs} />
          </div>
        }
        content={
          <TabPanels unmount={false} panelsClassName="w-full" items={tabs} />
        }
        footer={
          <div className="flex flex-row justify-between w-full">
            <Button size="sm" variant="ghost" onClick={onClose}>
              Abbrechen
            </Button>
            <Button
              size="sm"
              color="primary"
              onClick={(e: MouseEvent) => {
                handleSubmit((event) => {
                  if (isEdit) {
                    onUpdate(event);
                  } else {
                    onCreate(event);
                  }
                  onClose();
                })(e);
              }}
            >
              Bestätigen
            </Button>
          </div>
        }
      />
    </TabGroup>
  );
};

export type ScheduleDurationInputProps = { size?: Size; required?: boolean };

export const ScheduleDurationInput = <
  TFieldValues extends VEvent = VEvent,
  TName extends FieldPathByValue<
    TFieldValues,
    VEvent["duration"] | VEventDuration
  > = FieldPathByValue<TFieldValues, VEvent["duration"] | VEventDuration>
>({
  name,
  control,
  size = "md",
  required,
}: ScheduleDurationInputProps & UseControllerProps<TFieldValues, TName>) => (
  <FormElement
    name={name}
    label="Dauer"
    error={undefined}
    size={size}
    required={required}
  >
    <div
      className={cn(
        "flex flex-col border",
        borders.accent,
        extendedBgColors.subtile,
        roundings[size],
        paddingsEvenly[size],
        gaps[size]
      )}
    >
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", gaps[size])}>
        <Input
          type="number"
          name={`${name}.minutes` as Path<TFieldValues>}
          label="Minuten"
          control={control}
          size={size}
        />
        <Input
          type="number"
          name={`${name}.hours` as Path<TFieldValues>}
          label="Stunden"
          control={control}
          size={size}
        />
        <Input
          type="number"
          name={`${name}.days` as Path<TFieldValues>}
          label="Tage"
          control={control}
          size={size}
        />
        <Input
          type="number"
          name={`${name}.weeks` as Path<TFieldValues>}
          label="Wochen"
          control={control}
          size={size}
        />
      </div>
      <Switch
        control={control}
        name={`${name}.before` as Path<TFieldValues>}
        content="Negativ"
        size={size}
      />
    </div>
  </FormElement>
);
