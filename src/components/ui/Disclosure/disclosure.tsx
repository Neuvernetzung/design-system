import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import isString from "lodash/isString";
import { memo, ReactNode } from "react";

import { borders, paddings } from "../../../styles";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type DisclosureProps = {
  size?: keyof Sizes;
  items: ItemProps[];
  closeOthers?: boolean;
  className?: string;
  icon?: "default" | "chevron";
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
  items = [],
  closeOthers,
  className,
  icon = "default",
  ...props
}: DisclosureProps) => {
  const MotionIcon = motion(Icon);

  return (
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
                  fullWidth
                  className={cn(
                    "justify-between rounded-none items-center",
                    borders.accent
                  )}
                >
                  {title}
                  <AnimatePresence initial={false} mode="wait">
                    <MotionIcon
                      size={size}
                      icon={
                        icon === "chevron"
                          ? ChevronDownIcon
                          : !open
                          ? PlusIcon
                          : MinusIcon
                      }
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
                    />
                  </AnimatePresence>
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
};

export default memo(Disclosure);

Disclosure.displayName = "Disclosure";

Disclosure.defaultProps = {
  size: "md",
  closeOthers: false,
  className: undefined,
};
