import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import isString from "lodash/isString";
import { ReactNode } from "react";

import { borders, paddings } from "../../../styles";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "../../../theme/icons";
import { ExtendedColors, Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Button, ButtonProps } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type DisclosureProps = {
  size?: keyof Sizes;
  color?: keyof ExtendedColors;
  items: ItemProps[];
  closeOthers?: boolean;
  className?: string;
  icon?: "default" | "chevron";
  buttonProps?: ButtonProps;
  disabled?: boolean;
};

type ItemProps = {
  title: string | ReactNode;
  content: string | ReactNode;
  className?: string;
  defaultOpen?: boolean;
};

export const sizes: (keyof Sizes)[] = ["xs", "sm", "md", "lg", "xl"];

export const Disclosure = ({
  size = "md",
  color = "accent",
  items = [],
  closeOthers,
  className,
  icon = "default",
  disabled,
  buttonProps,
  ...props
}: DisclosureProps) => (
  <div className="flex w-full flex-col" {...props}>
    {items.map(
      (
        { title, content, className: panelClassName, defaultOpen }: ItemProps,
        i
      ) => (
        <HeadlessDisclosure
          key={`disclosure_${i}`}
          as="div"
          defaultOpen={defaultOpen}
          className={cn(
            "flex flex-col last:border-b border-t",
            borders.accent,
            className
          )}
        >
          {({ open }) => (
            <>
              <HeadlessDisclosure.Button
                as={Button}
                variant="ghost"
                size={size}
                disabled={disabled}
                fullWidth
                {...buttonProps}
                className={cn(
                  "!justify-start rounded-none items-center",
                  borders.accent,
                  buttonProps?.className
                )}
              >
                <div className="flex flex-row items-center justify-between w-full">
                  {isString(title) ? <Text>{title}</Text> : title}
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
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
                            ? ChevronDownIcon
                            : !open
                            ? PlusIcon
                            : MinusIcon
                        }
                      />
                    </motion.span>
                  </AnimatePresence>
                </div>
              </HeadlessDisclosure.Button>
              <motion.span
                initial="initial"
                animate={open ? "animate" : "initial"}
                variants={{
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
                }}
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
              </motion.span>
            </>
          )}
        </HeadlessDisclosure>
      )
    )}
  </div>
);

export default typedMemo(Disclosure);

Disclosure.displayName = "Disclosure";
