import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
    startY?: number;
    endY?: number;
    ease?: string;
    scrub?: number | boolean;
    triggerEnd?: string;
}

/**
 * Custom hook for GSAP scroll animations
 * @param options - Animation configuration options
 * @returns ref - Attach this ref to the element you want to animate
 */

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
    const {
        startY = 105,
        endY = -105,
        ease = "none",
        scrub = 1,
        triggerEnd = "bottom center"
    } = options;

    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) return;

        // Set initial position
        gsap.set(element, {
            yPercent: startY
        });

        // Create scroll animation
        gsap.to(element, {
            yPercent: endY,
            ease,
            scrollTrigger: {
                trigger: element,
                end: triggerEnd,
                scrub
            },
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [startY, endY, ease, scrub, triggerEnd]);

    return elementRef;
};