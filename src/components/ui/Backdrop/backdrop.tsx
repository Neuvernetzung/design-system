import cn from "classnames";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { typedMemo } from "../../../utils/internal";
import { zIndexes } from "../../../styles";

export const Backdrop = () => (
  <LazyMotion features={domAnimation}>
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed inset-0 bg-opacity-25 bg-black backdrop-blur-sm",
        zIndexes.modal
      )}
    />
  </LazyMotion>
);

export default typedMemo(Backdrop);
