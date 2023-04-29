import {
  ArrowUturnLeftIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3Icon,
  CalendarIcon as HeroCalendarIcon,
  CheckCircleIcon as HeroCheckCircleIcon,
  CheckIcon as HeroCheckIcon,
  ChevronDownIcon as HeroChevronDownIcon,
  ChevronLeftIcon as HeroChevronLeftIcon,
  ChevronRightIcon as HeroChevronRightIcon,
  ChevronUpDownIcon as HeroChevronUpDownIcon,
  ComputerDesktopIcon as HeroComputerDesktopIcon,
  ExclamationCircleIcon as HeroExclamationCircleIcon,
  ExclamationTriangleIcon as HeroExclamationTriangleIcon,
  HomeIcon as HeroHomeIcon,
  InformationCircleIcon as HeroInformationCircleIcon,
  LinkIcon as HeroLinkIcon,
  ListBulletIcon as HeroListBulletIcon,
  MinusIcon as HeroMinusIcon,
  MoonIcon as HeroMoonIcon,
  PhotoIcon as HeroPhotoIcon,
  PlusIcon as HeroPlusIcon,
  SunIcon as HeroSunIcon,
  TrashIcon as HeroTrashIcon,
  ClockIcon as HeroClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
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
export const ChevronDownIcon = null || HeroChevronDownIcon;
export const ChevronLeftIcon = null || HeroChevronLeftIcon;
export const ChevronUpDownIcon = null || HeroChevronUpDownIcon;

// DarkMode

export const SunIcon = null || HeroSunIcon;
export const MoonIcon = null || HeroMoonIcon;

// Notification

export const CheckCircleIcon = null || HeroCheckCircleIcon;
export const ExclamationCircleIcon = null || HeroExclamationCircleIcon;
export const InformationCircleIcon = null || HeroInformationCircleIcon;

// RichText

export const MinusIcon = null || HeroMinusIcon;
export const ListBulletIcon = null || HeroListBulletIcon;
export const AlignLeftIcon = null || Bars3BottomLeftIcon;
export const AlignRightIcon = null || Bars3BottomRightIcon;
export const AlignCenterIcon = null || Bars3Icon;
export const AlignJustifyIcon = null || Bars3Icon;
export const LinkIcon = null || HeroLinkIcon;
// Icons die noch nicht verfügbar sind später einbauen

// Other

export const ComputerDesktopIcon = null || HeroComputerDesktopIcon;
export const CheckIcon = null || HeroCheckIcon;
export const PlusIcon = null || HeroPlusIcon;
export const CalendarIcon = null || HeroCalendarIcon;
export const BackArrowIcon = null || ArrowUturnLeftIcon;
export const TrashIcon = null || HeroTrashIcon;
export const ExclamationTriangleIcon = null || HeroExclamationTriangleIcon;
export const PhotoIcon = null || HeroPhotoIcon;
export const HomeIcon = null || HeroHomeIcon;
export const ClockIcon = null || HeroClockIcon;
export const SearchIcon = null || MagnifyingGlassIcon;
