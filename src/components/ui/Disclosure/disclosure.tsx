import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import cn from "classnames";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import isString from "lodash/isString";
import { ReactNode } from "react";

import { borders, paddings } from "../../../styles";
import { IconChevronDown, IconMinus, IconPlus } from "@tabler/icons-react";
import type { DisclosureVariant, ExtendedColor, Size } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Button, ButtonProps } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type DisclosureBaseProps = {
  size?: Size;
  color?: ExtendedColor;
  closeOthers?: boolean;
  className?: string;
  icon?: "default" | "chevron";
  buttonProps?: ButtonProps;
  disabled?: boolean;
  variant?: DisclosureVariant;
};

export type DisclosureProps = DisclosureBaseProps & DisclosureItemProps;

export type DisclosureGroupProps = DisclosureBaseProps & {
  items: DisclosureItemProps[];
  groupClassName?: string;
};

export type DisclosureItemProps = {
  title: string | ReactNode;
  content: string | ReactNode;
  className?: string;
  defaultOpen?: boolean;
  panelClassName?: string;
};

export const disclosureAnimationVariants = {
  initial: {
    height: 0,
    opacity: 0,
    display: "none",
    overflow: "hidden",
    transition: {
      height: {
        duration: 0.15,
      },
      opacity: {
        duration: 0.15,
        delay: 0.15,
      },
    },
  },
  animate: {
    height: "auto",
    opacity: 1,
    overflow: "visible",
    transition: {
      height: {
        duration: 0.3,
      },
      opacity: {
        duration: 0.15,
        delay: 0.15,
      },
    },
  },
};

export const DisclosureGroup = ({
  items,
  groupClassName,
  variant = "border",
  ...props
}: DisclosureGroupProps) => (
  <div className={cn("flex w-full flex-col", groupClassName)}>
    {items.map((item, i) => (
      <Disclosure
        key={`disclosure_${i}`}
        {...item}
        {...props}
        variant={variant}
      />
    ))}
  </div>
);

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

const Disclosure = ({
  size = "md",
  className,
  icon = "default",
  disabled,
  buttonProps,
  content,
  title,
  defaultOpen,
  panelClassName,
  variant = "border",
}: DisclosureProps) => (
  <HeadlessDisclosure
    as="div"
    defaultOpen={defaultOpen}
    className={cn(variants[variant]?.container, className)}
  >
    {({ open }) => (
      <LazyMotion features={domAnimation}>
        <HeadlessDisclosure.Button
          as={Button}
          variant="ghost"
          size={size}
          disabled={disabled}
          fullWidth
          {...buttonProps}
          className={cn(variants[variant]?.button, buttonProps?.className)}
        >
          <div className="flex flex-row items-center justify-between w-full">
            {isString(title) ? <Text>{title}</Text> : title}
            <AnimatePresence initial={false} mode="wait">
              <m.span
                initial="initial"
                animate={open ? "animate" : "initial"}
                variants={{
                  initial: { rotate: icon === "chevron" ? 0 : 90 },
                  animate: {
                    zIndex: 1,
                    rotate: icon === "chevron" ? 180 : 0,
                    transition: {
                      type: "tween",
                      duration: 0.2,
                      ease: "circOut",
                    },
                  },
                }}
              >
                <Icon
                  size={size}
                  icon={
                    icon === "chevron"
                      ? IconChevronDown
                      : !open
                      ? IconPlus
                      : IconMinus
                  }
                />
              </m.span>
            </AnimatePresence>
          </div>
        </HeadlessDisclosure.Button>
        <AnimatePresence initial={false}>
          <m.span
            initial="initial"
            animate={open ? "animate" : "initial"}
            variants={disclosureAnimationVariants}
          >
            <HeadlessDisclosure.Panel static>
              <div className={cn(paddings[size], panelClassName)}>
                {isString(content) ? (
                  <Text size={size}>{content}</Text>
                ) : (
                  content
                )}
              </div>
            </HeadlessDisclosure.Panel>
          </m.span>
        </AnimatePresence>
      </LazyMotion>
    )}
  </HeadlessDisclosure>
);

export default typedMemo(Disclosure);

Disclosure.displayName = "Disclosure";
