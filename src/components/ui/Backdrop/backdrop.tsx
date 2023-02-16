import cn from "classnames";
import { motion } from "framer-motion";
import { memo } from "react";

export const Backdrop = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 100 }}
    transition={{ duration: 0.2 }}
    className={cn("fixed inset-0 bg-opacity-25 bg-black backdrop-blur-sm")}
  />
);

export default memo(Backdrop);