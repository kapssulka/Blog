import { motion } from "motion/react";
import { useRef } from "react";

interface IconPulseAnimateProps {
  isActive: boolean;
  children: React.ReactNode;
}

export default function AnimatedIconPulse({
  isActive,
  children,
}: IconPulseAnimateProps) {
  const isFirstRender = useRef(true);
  return (
    <motion.div
      animate={{
        scale: isActive && !isFirstRender.current ? [1, 1.4, 1] : 1,
      }}
      transition={{
        type: "tween",
        duration: 0.3,
      }}
      className="cursor-pointer"
      onClick={() => (isFirstRender.current = false)}
    >
      {children}
    </motion.div>
  );
}
