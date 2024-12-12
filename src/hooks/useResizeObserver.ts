import { useEffect, useRef, useCallback } from "react";

export const useResizeObserver = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!entries.length) return;
    
    // Handle resize if needed in the future
    // Currently we're just observing
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new ResizeObserver((entries) => {
      // Use requestAnimationFrame to batch resize notifications
      window.requestAnimationFrame(() => {
        handleResize(entries);
      });
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleResize]);

  return elementRef;
};