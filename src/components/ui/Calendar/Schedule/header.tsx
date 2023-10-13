import {
  IconCalendarEvent,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";
import cn from "classnames";
import type { MouseEventHandler } from "react";

import { gaps } from "../../../../styles";
import { Button, IconButton } from "../../Button";
import { Tooltip } from "../../Tooltip";
import { Text } from "../../Typography";
import type { ScheduleProps } from ".";
import type { UseEditEventProps } from "./Event/edit";
import { UseScheduleViewProps } from "./hooks/useSchedule";

export type ScheduleHeaderProps = Omit<
  ScheduleProps,
  "calendarProps" | "onCreate" | "onUpdate" | "onDelete" | "viewEventProps"
> &
  Required<Pick<ScheduleProps, "calendarProps">> & {
    scheduleViewProps: UseScheduleViewProps;
    leftArrowFunction: MouseEventHandler;
    leftAriaLabel: string;
    leftArrowDisabled?: boolean;
    rightArrowFunction: MouseEventHandler;
    rightAriaLabel: string;
    rightArrowDisabled?: boolean;
    title: string;
    editEventProps?: UseEditEventProps;
  };

export const ScheduleHeader = ({
  calendarProps,
  scheduleViewProps,
  leftAriaLabel,
  leftArrowFunction,
  rightAriaLabel,
  rightArrowFunction,
  leftArrowDisabled,
  rightArrowDisabled,
  title,
  editEventProps,
  disableCreate,
}: ScheduleHeaderProps) => {
  const { viewToday } = calendarProps;

  const { currentView, setCurrentView } = scheduleViewProps;

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between items-center",
        gaps.md
      )}
    >
      <div className={cn("flex flex-row items-center", gaps.md)}>
        <div className={cn("flex flex-row", gaps.xs)}>
          <IconButton
            size="sm"
            variant="ghost"
            icon={IconChevronLeft}
            onClick={leftArrowFunction}
            ariaLabel={leftAriaLabel}
            disabled={leftArrowDisabled}
          />
          <Tooltip delay={500} label="Heute">
            <IconButton
              size="sm"
              variant="ghost"
              ariaLabel="view_today"
              icon={IconCalendarEvent}
              onClick={viewToday}
            />
          </Tooltip>
          <IconButton
            size="sm"
            variant="ghost"
            icon={IconChevronRight}
            onClick={rightArrowFunction}
            ariaLabel={rightAriaLabel}
            disabled={rightArrowDisabled}
          />
        </div>
        <Text size="sm">{title}</Text>
      </div>

      {currentView && setCurrentView && (
        <div className={cn("flex flex-row", gaps.md)}>
          <Button
            size="sm"
            variant={currentView === "day" ? "filled" : "ghost"}
            onClick={() => {
              setCurrentView("day");
            }}
          >
            Tag
          </Button>
          <Button
            size="sm"
            variant={currentView === "week" ? "filled" : "ghost"}
            onClick={() => {
              setCurrentView("week");
            }}
          >
            Woche
          </Button>
          <Button
            size="sm"
            variant={currentView === "month" ? "filled" : "ghost"}
            onClick={() => {
              setCurrentView("month");
            }}
          >
            Monat
          </Button>
        </div>
      )}
      {!disableCreate && editEventProps && (
        <Button
          size="sm"
          color="primary"
          leftIcon={IconPlus}
          onClick={() => {
            editEventProps.setCreate();
          }}
        >
          Termin hinzufügen
        </Button>
      )}
    </div>
  );
};
