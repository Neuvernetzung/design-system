import cn from "classnames";
import type { ScheduleProps, ScheduleView } from ".";
import { gaps } from "../../../../styles";
import {
  IconCalendarEvent,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Button, IconButton } from "../../Button";
import { Tooltip } from "../../Tooltip";
import type { MouseEventHandler } from "react";
import { Text } from "../../Typography";

export type ScheduleHeaderProps = Omit<ScheduleProps, "calendarProps"> &
  Required<Pick<ScheduleProps, "calendarProps">> & {
    currentView?: ScheduleView;
    setCurrentView?: (value: ScheduleView) => void;
    leftArrowFunction: MouseEventHandler;
    leftAriaLabel: string;
    leftArrowDisabled?: boolean;
    rightArrowFunction: MouseEventHandler;
    rightAriaLabel: string;
    rightArrowDisabled?: boolean;
    title: string;
  };

export const ScheduleHeader = ({
  calendarProps,
  currentView,
  setCurrentView,
  leftAriaLabel,
  leftArrowFunction,
  rightAriaLabel,
  rightArrowFunction,
  leftArrowDisabled,
  rightArrowDisabled,
  title,
}: ScheduleHeaderProps) => {
  const { viewToday } = calendarProps;

  return (
    <div className={cn("flex flex-row justify-between items-center", gaps.md)}>
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
    </div>
  );
};
