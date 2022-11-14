import {
  ChevronRightIcon as HeroChevronRightIcon,
  ChevronLeftIcon as HeroChevronLeftIcon,
  ChevronUpDownIcon as HeroChevronUpDownIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon as HeroSunIcon,
  MoonIcon as HeroMoonIcon,
  ComputerDesktopIcon as HeroComputerDesktopIcon,
  CheckIcon as HeroCheckIcon,
  MinusIcon as HeroMinusIcon,
  PlusIcon as HeroPlusIcon,
  CheckCircleIcon as HeroCheckCircleIcon,
  ExclamationCircleIcon as HeroExclamationCircleIcon,
  InformationCircleIcon as HeroInformationCircleIcon,
  CalendarIcon as HeroCalendarIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

import { FC } from "react";

export type Icons = {
  MenuIcon: FC<SVGElement>;
  CrossIcon: FC<SVGElement>;
  ChevronRightIcon: FC<SVGElement>;
  ChevronLeftIcon: FC<SVGElement>;
  ChevronUpDownIcon: FC<SVGElement>;
  SunIcon: FC<SVGElement>;
  MoonIcon: FC<SVGElement>;
  CheckCircleIcon: FC<SVGElement>;
  ExclamationCircleIcon: FC<SVGElement>;
  InformationCircleIcon: FC<SVGElement>;
  ComputerDesktopIcon: FC<SVGElement>;
  CheckIcon: FC<SVGElement>;
  MinusIcon: FC<SVGElement>;
  PlusIcon: FC<SVGElement>;
  CalendarIcon: FC<SVGElement>;
};

// Menu

export const MenuIcon = null || Bars3Icon;
export const CrossIcon = null || XMarkIcon;

// Chevrons

export const ChevronRightIcon = null || HeroChevronRightIcon;
export const ChevronLeftIcon = null || HeroChevronLeftIcon;
export const ChevronUpDownIcon = null || HeroChevronUpDownIcon;

// DarkMode

export const SunIcon = null || HeroSunIcon;
export const MoonIcon = null || HeroMoonIcon;

// Notification

export const CheckCircleIcon = null || HeroCheckCircleIcon;
export const ExclamationCircleIcon = null || HeroExclamationCircleIcon;
export const InformationCircleIcon = null || HeroInformationCircleIcon;

// Other

export const ComputerDesktopIcon = null || HeroComputerDesktopIcon;
export const CheckIcon = null || HeroCheckIcon;
export const MinusIcon = null || HeroMinusIcon;
export const PlusIcon = null || HeroPlusIcon;
export const CalendarIcon = null || HeroCalendarIcon;
export const BackArrowIcon = null || ArrowUturnLeftIcon;
