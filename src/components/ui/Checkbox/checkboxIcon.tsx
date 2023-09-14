import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import type { Size, SvgType } from "../../../types";
import { Icon } from "../Icon";

type CheckboxIconProps = {
  size?: Size;
  isChecked: boolean;
  icon?: SvgType;
  isIndeterminate?: boolean;
};

export const CheckboxIcon = ({
  size,
  isChecked,
  icon,
  isIndeterminate,
}: CheckboxIconProps) => (
  <LazyMotion features={domAnimation}>
    <CheckboxTransition open={isChecked || isIndeterminate}>
      {isChecked ? (
        <Icon size={size} icon={icon ?? CheckIconAnimation} />
      ) : (
        isIndeterminate && (
          <Icon size={size} icon={CheckIndeterminateIconAnimation} />
        )
      )}
    </CheckboxTransition>
  </LazyMotion>
);

function CheckboxTransition({ open, children }: any) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <m.div
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
        </m.div>
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

const MotionCheckIcon = m(IconCheck);

function CheckIconAnimation(props: any) {
  return (
    <MotionCheckIcon
      variants={animationVariants}
      style={animationStyle}
      {...props}
    />
  );
}

const MotionCheckIndeterminateIcon = m(IconMinus);

function CheckIndeterminateIconAnimation(props: any) {
  return (
    <MotionCheckIndeterminateIcon
      variants={animationVariants}
      style={animationStyle}
      {...props}
    />
  );
}
