'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

const loadFeatures = () =>
    import('framer-motion').then((res) => res.domMax);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
    return (
        <LazyMotion features={loadFeatures} strict={false}>
            {children}
        </LazyMotion>
    );
}
