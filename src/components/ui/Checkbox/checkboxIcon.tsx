import { AnimatePresence, motion } from "framer-motion";
import { FC, SVGProps } from "react";

import { CheckIcon, MinusIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { Icon } from "../Icon";

type CheckboxIconProps = {
  size?: keyof Sizes;
  isChecked: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  isIndeterminate?: boolean;
};

export const CheckboxIcon = ({
  size,
  isChecked,
  icon,
  isIndeterminate,
}: CheckboxIconProps) => (
  <CheckboxTransition open={isChecked || isIndeterminate}>
    {isChecked ? (
      <Icon size={size} icon={icon ?? CheckIconAnimation} />
    ) : (
      isIndeterminate && (
        <Icon size={size} icon={CheckIndeterminateIconAnimation} />
      )
    )}
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

const animationVariants = {
  unchecked: {
    opacity: 0,
    strokeDashoffset: "100%",
  },
  checked: {
    opacity: 1,
    strokeDashoffset: 0,
    transition: { duration: 0.3 },
  },
};
const animationStyle = {
  fill: "none",
  strokeWidth: 3,
  stroke: "currentColor",
  strokeDasharray: "100%",
};

const MotionCheckIcon = motion(CheckIcon);

function CheckIconAnimation(props: any) {
  return (
    <MotionCheckIcon
      variants={animationVariants}
      style={animationStyle}
      {...props}
    />
  );
}

const MotionCheckIndeterminateIcon = motion(MinusIcon);

function CheckIndeterminateIconAnimation(props: any) {
  return (
    <MotionCheckIndeterminateIcon
      variants={animationVariants}
      style={animationStyle}
      {...props}
    />
  );
}
