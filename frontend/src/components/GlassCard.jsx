import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = false, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`glass rounded-2xl p-6 ${hoverEffect ? 'glass-hover cursor-pointer' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
