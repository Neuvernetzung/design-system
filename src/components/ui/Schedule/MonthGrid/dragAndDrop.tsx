import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  type SensorDescriptor,
  type SensorOptions,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Coordinates } from "@dnd-kit/utilities";
import { getDate, getMonth, setDate, setMonth } from "date-fns";
import set from "lodash/set";
import { type ReactNode, useState } from "react";

import type { ScheduleProps } from "..";
import { activationConstraint } from "../utils/activationConstraint";
import isFunction from "lodash/isFunction";

export type UseMonthGridDraggablePropsReturn = {
  sensors: SensorDescriptor<SensorOptions>[];
  activeItem?: UniqueIdentifier;
  setActiveItem: (activeItem?: UniqueIdentifier) => void;
};

export const useMonthGridDraggable = (): UseMonthGridDraggablePropsReturn => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const [activeItem, setActiveItem] = useState<UniqueIdentifier>();

  return {
    sensors,
    activeItem,
    setActiveItem,
  };
};

export type MonthGridDndContextProps = Omit<
  UseMonthGridDraggablePropsReturn,
  "activeItem" | "transformDelta"
> &
  Pick<ScheduleProps, "onUpdate" | "events" | "disableDrag"> & {
    children: ReactNode;
  };

export type MonthGridDeltaToTimeProps = {
  innerHeight: number;
  innerWidth: number;
  cols: number;
  rows: number;
  delta: Coordinates | null;
};

export const MonthGridDndContext = ({
  sensors,
  events,
  onUpdate,
  setActiveItem,
  children,
  disableDrag,
}: MonthGridDndContextProps) => {
  const isDisabled = !isFunction(onUpdate) || disableDrag;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        if (isDisabled) return;
        setActiveItem(active.id);
      }}
      onDragCancel={() => {
        if (isDisabled) return;
        setActiveItem(undefined);
      }}
      onDragEnd={({ active, over }) => {
        if (isDisabled) return;
        const id = active.id;
        if (!id || !over) {
          setActiveItem(undefined);

          return;
        }

        const event = events?.find((event) => event.uid === id);
        if (!event) {
          setActiveItem(undefined);
          return;
        }

        const date = new Date(over.id);
        const month = getMonth(date);
        const day = getDate(date);

        const usesDuration = event.duration;
        const newEvent = { ...event };
        set(
          newEvent,
          "start.date",
          setMonth(setDate(event.start.date, day), month)
        );
        if (!usesDuration) {
          set(
            newEvent,
            "end.date",
            setMonth(setDate(event.end.date, day), month)
          );
        }

        setActiveItem(undefined);
        onUpdate(newEvent, event);
      }}
    >
      {children}
    </DndContext>
  );
};
