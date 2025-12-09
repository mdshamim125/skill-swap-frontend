"use client";

import { motion, MotionProps } from "framer-motion";

export const Animate = ({
  children,
  ...props
}: MotionProps & { children: React.ReactNode }) => {
  return <motion.div {...props}>{children}</motion.div>;
};
