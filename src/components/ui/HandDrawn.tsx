import React from 'react';
import { motion } from 'framer-motion';

export const DrawArrow = ({ delay = 0 }) => (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="visible-stroke">
        <motion.path
            d="M2 10H50M50 10L40 4M50 10L40 16"
            stroke="#FF2E00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
    </svg>
);

export const ScribbleHighlight = ({ width }) => (
    <svg width={width} height="20" viewBox={`0 0 ${width} 20`} fill="none" className="absolute -bottom-2 z-[-1] pointer-events-none">
        <motion.path
            d={`M2 12C30 8 60 18 ${width} 10`}
            stroke="#FFD700"
            strokeWidth="8"
            strokeOpacity="0.3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        />
    </svg>
);

export const PencilCursor = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.8284 3.17157C20.3905 4.73367 20.3905 7.26633 18.8284 8.82843L8.82843 18.8284C8.42843 19.2284 7.92843 19.5284 7.32843 19.6284L4 20L4.37157 16.6716C4.47157 16.0716 4.77157 15.5716 5.17157 15.1716L15.1716 5.17157C16.7337 3.60948 19.2663 3.60948 20.8284 5.17157L18.8284 3.17157Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
