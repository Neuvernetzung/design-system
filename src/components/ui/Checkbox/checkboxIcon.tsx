import { AnimatePresence, motion } from "framer-motion";
import { ElementType } from "react";

import { Sizes } from "../../../types";
import { CheckIcon } from "../../../theme/icons";
import { Icon } from "../Icon";

type CheckboxIconProps = {
  size?: keyof Sizes;
  isChecked: boolean;
  icon?: ElementType<SVGElement>;
};

export const CheckboxIcon = ({ size, isChecked, icon }: CheckboxIconProps) => (
  <CheckboxTransition open={isChecked}>
    <Icon size={size} icon={icon ?? CheckIconAnimation} />
  </CheckboxTransition>
);

function CheckboxTransition({ open, children }: any) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          variants={{
            unchecked: { scale: 0.5 },
            checked: { scale: 1 },
          }}
          initial="unchecked"
          animate="checked"
          exit="unchecked"
          className="flex h-full items-center justify-center"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

CheckboxIcon.defaultProps = {
  size: "md",
  icon: undefined,
};

const MotionCheckIcon = motion(CheckIcon);

function CheckIconAnimation(props: any) {
  return (
    <MotionCheckIcon
      variants={{
        unchecked: {
          opacity: 0,
          strokeDashoffset: "100%",
        },
        checked: {
          opacity: 1,
          strokeDashoffset: 0,
          transition: { duration: 0.3 },
        },
      }}
      style={{
        fill: "none",
        strokeWidth: 3,
        stroke: "currentColor",
        strokeDasharray: "100%",
      }}
      {...props}
    />
  );
}
