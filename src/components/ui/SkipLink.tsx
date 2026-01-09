'use client';

/**
 * Skip Link Component for WCAG 2.1 AA Compliance
 * Allows keyboard users to skip navigation and jump to main content
 */
export function SkipLink() {
    return (
        <a
            href="#main-content"
            className="skip-link"
            aria-label="Skip to main content"
        >
            Skip to main content
        </a>
    );
}
