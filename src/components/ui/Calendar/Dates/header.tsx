import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button, IconButton } from "../../Button";
import cn from "classnames";
import type { KeyboardEventHandler, MouseEventHandler } from "react";
import { gaps, paddingsX } from "../../../../styles";

type CalenderHeaderProps = {
  leftArrowFunction: MouseEventHandler;
  leftAriaLabel: string;
  leftArrowDisabled?: boolean;
  rightArrowFunction: MouseEventHandler;
  rightAriaLabel: string;
  rightArrowDisabled?: boolean;
  titleFunction?: MouseEventHandler;
  title: string;
  onKeyDown?: KeyboardEventHandler;
};

export const CalendarHeader = ({
  leftArrowFunction,
  leftAriaLabel,
  leftArrowDisabled,
  rightArrowFunction,
  rightAriaLabel,
  rightArrowDisabled,
  titleFunction,
  title,
  onKeyDown,
}: CalenderHeaderProps) => (
  <div
    className={cn(
      "flex flex-row items-center justify-between",
      gaps.md,
      paddingsX.md
    )}
  >
    <IconButton
      variant="ghost"
      ariaLabel={leftAriaLabel}
      icon={IconChevronLeft}
      onClick={leftArrowFunction}
      size="sm"
      disabled={leftArrowDisabled}
      onKeyDown={onKeyDown}
    />

    <Button
      variant="ghost"
      onClick={titleFunction}
      tabIndex={!titleFunction ? -1 : 0}
      className={cn("w-full", !titleFunction && "pointer-events-none")}
      onKeyDown={onKeyDown}
    >
      {title}
    </Button>

    <IconButton
      variant="ghost"
      ariaLabel={rightAriaLabel}
      icon={IconChevronRight}
      onClick={rightArrowFunction}
      size="sm"
      disabled={rightArrowDisabled}
      onKeyDown={onKeyDown}
    />
  </div>
);
