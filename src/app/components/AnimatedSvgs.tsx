'use client';

import { motion } from 'framer-motion';

export const RupeeIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0 }}
    animate={{ scale: 1, rotate: 360 }}
    transition={{ duration: 0.5, type: "spring" }}
  >
    <motion.path
      d="M16 3H8.5C8.5 3 7 3 5.5 4.5L14.5 13.5M14.5 7.5H5.5M12.5 16.5L5.5 9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  </motion.svg>
);

export const DashboardAnimation = () => (
  <motion.svg
    width="120"
    height="120"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-10 absolute right-0 bottom-0"
  >
    <motion.path
      d="M3 3h18v18H3V3zm4 4h4v4H7V7zm0 6h4v4H7v-4zm6-6h4v4h-4V7zm6 0h-2v4h2V7zm-6 6h4v4h-4v-4zm6 0h-2v4h2v-4z"
      stroke="currentColor"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    />
  </motion.svg>
);

export const CostOptimizationAnimation = () => (
  <motion.svg
    width="120"
    height="120"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-10 absolute right-0 bottom-0"
  >
    <motion.path
      d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
      stroke="currentColor"
      strokeWidth="0.5"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  </motion.svg>
);

export const HomeAnimation = () => (
  <motion.svg
    width="120"
    height="120"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-10 absolute right-0 bottom-0"
  >
    <motion.path
      d="M3 12l9-9 9 9M5 10v10h14V10"
      stroke="currentColor"
      strokeWidth="0.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    />
  </motion.svg>
);
