'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterProps {
    text: string;
    delay?: number;
    duration?: number;
    className?: string;
    loop?: boolean;
    loopDelay?: number;
}

export function Typewriter({
    text,
    delay = 0,
    duration = 2,
    className = '',
    loop = false,
    loopDelay = 2000
}: TypewriterProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        let controls: any;

        const startAnimation = () => {
            setIsDone(false);
            count.set(0);
            controls = animate(count, text.length, {
                type: "tween",
                duration: duration,
                ease: "linear",
                delay: delay,
                onComplete: () => {
                    setIsDone(true);
                    if (loop) {
                        setTimeout(startAnimation, loopDelay);
                    }
                },
            });
        };

        startAnimation();
        return () => controls?.stop();
    }, [text, delay, duration, count, loop, loopDelay]);

    return (
        <span className={className}>
            <motion.span>{displayText}</motion.span>
            {!isDone && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[2px] h-[0.8em] bg-purple-500 ml-1 translate-y-[0.1em]"
                />
            )}
        </span>
    );
}

