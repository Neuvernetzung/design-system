import {
  DndContext,
  KeyboardSensor,
  type Modifier,
  type Modifiers,
  MouseSensor,
  type SensorDescriptor,
  type SensorOptions,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import type { Coordinates } from "@dnd-kit/utilities";
import { addDays, addHours, addMinutes } from "date-fns";
import compact from "lodash/compact";
import set from "lodash/set";
import { type ReactNode, RefObject, useMemo, useState } from "react";

import { useRefDimensions } from "../../../../../utils/internal";
import type { ScheduleDayViewProps, ScheduleProps } from "..";
import { DEFAULT_PRECISION_IN_MINUTES } from "./layoutDayEvents";

export type UseDayGridDraggableProps = {
  gridInnerRef: RefObject<HTMLDivElement>;
  cols: number;
  rows: number;
};

export type UseDayGridDraggablePropsReturn = {
  modifiers: Modifiers;
  sensors: SensorDescriptor<SensorOptions>[];
  activeItem?: UniqueIdentifier;
  setActiveItem: (activeItem?: UniqueIdentifier) => void;
  innerHeight: number;
  innerWidth: number;
  transformDelta: Coordinates;
  setTransformDelta: (transformDelta: Coordinates) => void;
};

export const createSnapModifier =
  (rows: number, cols: number): Modifier =>
  ({ transform }) => ({
    ...transform,
    x: Math.ceil(transform.x / cols) * cols,
    y: Math.ceil(transform.y / rows) * rows,
  });

export const useDayGridDraggable = ({
  gridInnerRef,
  cols,
  rows,
}: UseDayGridDraggableProps): UseDayGridDraggablePropsReturn => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { height, width } = useRefDimensions(gridInnerRef);

  const snapToGrid = useMemo(
    () => createSnapModifier(height / rows, width / cols),
    [rows, cols, height, width]
  );

  const [activeItem, setActiveItem] = useState<UniqueIdentifier>();
  const [transformDelta, setTransformDelta] = useState<Coordinates>();

  const modifiers = compact([snapToGrid, cols === 1 && restrictToVerticalAxis]);

  return {
    sensors,
    activeItem,
    setActiveItem,
    modifiers,
    innerHeight: height,
    innerWidth: width,
    transformDelta: transformDelta || { x: 0, y: 0 },
    setTransformDelta,
  };
};

export type DayGridDndContextProps = Omit<
  UseDayGridDraggablePropsReturn,
  "activeItem" | "transformDelta"
> &
  Pick<ScheduleProps, "onUpdate" | "events"> &
  Pick<ScheduleDayViewProps, "precisionInMinutes"> & {
    children: ReactNode;
    cols: number;
  };

export type DayGridDeltaToTimeProps = {
  innerHeight: number;
  innerWidth: number;
  cols: number;
  delta: Coordinates | null;
  precisionInMinutes: number;
};

export const dayGridDeltaToTime = ({
  innerHeight,
  innerWidth,
  cols,
  delta,
  precisionInMinutes,
}: DayGridDeltaToTimeProps) => {
  if (!delta) return { days: 0, hours: 0, minutes: 0 };

  const deltaTime = (24 / innerHeight) * delta.y;
  const deltaMinutes = deltaTime % 1;
  const hours = deltaTime - deltaMinutes;
  const minutes =
    Math.ceil((deltaMinutes * 60) / precisionInMinutes) * precisionInMinutes;
  const days = (delta.x * cols) / innerWidth;

  return { days, hours, minutes };
};

export const DayGridDndContext = ({
  sensors,
  precisionInMinutes = DEFAULT_PRECISION_IN_MINUTES,
  modifiers,
  events,
  onUpdate,
  setActiveItem,
  children,
  innerHeight,
  innerWidth,
  setTransformDelta,
  cols,
}: DayGridDndContextProps) => (
  <DndContext
    sensors={sensors}
    onDragCancel={() => {
      setActiveItem(undefined);
    }}
    onDragMove={({ delta }) => {
      setTransformDelta(delta);
    }}
    onDragEnd={({ active, delta }) => {
      const id = active.id;
      if (!id || delta.y === 0) {
        setActiveItem(undefined);
        setTransformDelta({ x: 0, y: 0 });
        return;
      }

      const event = events?.find((event) => event.uid === id);
      if (!event) {
        setActiveItem(undefined);
        setTransformDelta({ x: 0, y: 0 });
        return;
      }

      const { days, hours, minutes } = dayGridDeltaToTime({
        innerHeight,
        innerWidth,
        delta,
        precisionInMinutes,
        cols,
      });

      const usesDuration = event.duration;
      const newEvent = { ...event };
      set(
        newEvent,
        "start.date",
        addDays(addHours(addMinutes(event.start.date, minutes), hours), days)
      );
      if (!usesDuration) {
        set(
          newEvent,
          "end.date",
          addDays(addHours(addMinutes(event.start.date, minutes), hours), days)
        );
      }

      setActiveItem(undefined);
      setTransformDelta({ x: 0, y: 0 });
      onUpdate(newEvent);
    }}
    onDragStart={({ active }) => {
      setActiveItem(active.id);
    }}
    modifiers={[...modifiers, restrictToFirstScrollableAncestor]}
  >
    {children}
  </DndContext>
);
