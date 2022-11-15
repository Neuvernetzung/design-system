import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import isString from "lodash/isString";
import { memo, ReactNode } from "react";

import { borders, paddings } from "../../../styles";
import { MinusIcon, PlusIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type DisclosureProps = {
  size?: keyof Sizes;
  items: ItemProps[];
  closeOthers?: boolean;
  className?: string;
};

type ItemProps = {
  title: string | ReactNode;
  content: string | ReactNode;
  className?: string;
};

export const sizes: (keyof Sizes)[] = ["xs", "sm", "md", "lg", "xl"];

export const Disclosure = ({
  size = "md",
  items = [],
  closeOthers,
  className,
  ...props
}: DisclosureProps) => {
  const MotionPanel = motion(HeadlessDisclosure.Panel);
  const MotionIcon = motion(Icon);

  return (
    <div className="flex w-full flex-col" {...props}>
      {items.map(
        ({ title, content, className: panelClassName }: ItemProps, i) => (
          <HeadlessDisclosure
            key={`disclosure_${i}`}
            as="div"
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
                      icon={!open ? PlusIcon : MinusIcon}
                      initial="initial"
                      animate={open ? "animate" : "initial"}
                      variants={{
                        initial: { rotate: open ? -90 : 90 },
                        animate: {
                          zIndex: 1,
                          rotate: 0,
                          transition: {
                            type: "tween",
                            duration: 0.15,
                            ease: "circOut",
                          },
                        },
                      }}
                    />
                  </AnimatePresence>
                </HeadlessDisclosure.Button>
                {open && (
                  <MotionPanel
                    initial="initial"
                    animate="animate"
                    variants={{
                      initial: {
                        height: 0,
                        opacity: 0,
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
                    <div className={cn(paddings[size], panelClassName)}>
                      {isString(content) ? (
                        <Text size={size}>{content}</Text>
                      ) : (
                        content
                      )}
                    </div>
                  </MotionPanel>
                )}
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
