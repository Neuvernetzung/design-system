import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  Root,
} from "@radix-ui/react-accordion";
import { IconChevronDown, IconMinus, IconPlus } from "@tabler/icons-react";
import { cn } from "@/utils";
import compact from "lodash/compact";
import isString from "lodash/isString";
import { HTMLProps, type ReactNode } from "react";

import {
  borders,
  disclosureAnimation,
  paddings,
  transition,
} from "../../../styles";
import type { DisclosureVariant, ExtendedColor, Size } from "../../../types";
import { Button, ButtonProps } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type DisclosureBaseProps = {
  size?: Size;
  color?: ExtendedColor;
  className?: string;
  icon?: "default" | "chevron";
  buttonProps?: ButtonProps;
  disabled?: boolean;
  variant?: DisclosureVariant;
};

export type DisclosureProps = DisclosureBaseProps &
  DisclosureItemProps &
  DisclosureSingleProps;

export type DisclosureGroupProps = DisclosureBaseProps & {
  items: DisclosureItemProps[];
  groupClassName?: string;
} & DisclosureMultipleProps;

type DisclosureSingleProps = {
  type?: "single";
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

type DisclosureMultipleProps = {
  type?: "multiple";
  value?: number[];
  setValue?: (values: number[]) => void;
};

export type DisclosureItemProps = {
  title: string | ReactNode;
  content: string | ReactNode;
  className?: string;
  defaultOpen?: boolean;
  panelClassName?: string;
  forceMount?: true | undefined;
};

export const DisclosureGroup = ({
  items,
  groupClassName,
  type = "multiple",
  value,
  setValue,
  ...props
}: DisclosureGroupProps) => {
  if (!type) return null;

  if (type === "multiple")
    return (
      <Root
        type="multiple"
        defaultValue={compact(
          items.map((item, i) => (item.defaultOpen ? i.toString() : undefined))
        )}
        value={value && value.map((v) => v.toString())}
        onValueChange={(value: string[]) =>
          setValue?.(value.map((v) => Number(v)))
        }
        className={cn("flex w-full flex-col", groupClassName)}
      >
        {items.map((item, i) => (
          <DisclosureItem
            value={i.toString()}
            key={`disclosure_${i}`}
            {...item}
            {...props}
          />
        ))}
      </Root>
    );

  return null;
};

const variants: Record<
  DisclosureVariant,
  { container: string; button: string }
> = {
  border: {
    container: cn("flex flex-col last:border-b border-t", borders.accent),
    button: cn("!justify-start rounded-none items-center", borders.accent),
  },
  button: { container: "", button: "" },
};

const SINGLE_DISCLOSURE_NAME = "default" as const;

export const Disclosure = ({
  defaultOpen,
  open,
  setOpen,
  ...props
}: DisclosureProps) => (
  <Root
    type="single"
    onValueChange={setOpen ? () => setOpen(!open) : undefined}
    defaultValue={defaultOpen || open ? SINGLE_DISCLOSURE_NAME : undefined}
    collapsible
  >
    <DisclosureItem value={SINGLE_DISCLOSURE_NAME} {...props} />
  </Root>
);

Disclosure.displayName = "Disclosure";

export const DisclosureItem = ({
  buttonProps,
  className,
  color,
  disabled,
  icon = "default",
  size = "md",
  variant = "border",
  content,
  title,
  panelClassName,
  value,
  forceMount,
}: DisclosureBaseProps &
  Omit<DisclosureItemProps, "defaultOpen"> & { value: string }) => (
  <AccordionItem
    value={value}
    className={cn(variants[variant]?.container, className)}
  >
    <AccordionHeader>
      <AccordionTrigger asChild>
        <Button
          variant="ghost"
          size={size}
          color={color}
          disabled={disabled}
          {...buttonProps}
          className={cn(
            "group w-full",
            variants[variant]?.button,
            buttonProps?.className
          )}
        >
          <div className="flex flex-row items-center justify-between w-full">
            {isString(title) ? <Text>{title}</Text> : title}
            <Icon
              size={size}
              className={cn("group-data-[state=open]:rotate-180", transition)}
              icon={icon === "chevron" ? IconChevronDown : DisclosureIcon}
            />
          </div>
        </Button>
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent
      forceMount={forceMount}
      className={cn(
        "overflow-hidden will-change-[height]",
        disclosureAnimation
      )}
    >
      <div className={cn(paddings[size], panelClassName)}>
        {isString(content) ? <Text size={size}>{content}</Text> : content}
      </div>
    </AccordionContent>
  </AccordionItem>
);

const DisclosureIcon = ({ className, ...props }: HTMLProps<SVGSVGElement>) => (
  <>
    <IconPlus
      className={cn(
        "group-data-[state=open]:hidden group-data-[state=closed]:block",
        className
      )}
      {...props}
    />
    <IconMinus
      className={cn(
        "group-data-[state=open]:block group-data-[state=closed]:hidden",
        className
      )}
      {...props}
    />
  </>
);
