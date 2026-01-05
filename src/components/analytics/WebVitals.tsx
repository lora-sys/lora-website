'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
    useReportWebVitals((metric) => {
        // Analytics implementation would go here
        console.log(metric);
    });

    return null;
}
