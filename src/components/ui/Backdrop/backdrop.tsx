import cn from "classnames";
import { memo } from "react";
import { motion } from "framer-motion";

export const Backdrop = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 100 }}
    transition={{ duration: 1 }}
    className={cn("fixed inset-0 bg-opacity-25 bg-black backdrop-blur-sm")}
  />
);

export default memo(Backdrop);
