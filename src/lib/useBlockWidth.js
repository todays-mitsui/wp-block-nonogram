import { useEffect, useRef, useState } from "@wordpress/element";

/**
 * @returns {[React.MutableRefObject<HTMLDivElement | null>, number | null]}
 */
export function useBlockWidth() {
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (wrapperRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const newWidth = entries[0]?.contentRect?.width;

      if (newWidth == null) return;

      setWidth(newWidth);
    });

    observer.observe(wrapperRef.current);

    return () => {
      wrapperRef.current && observer.unobserve(wrapperRef.current);
    };
  }, [wrapperRef.current]);

  return [wrapperRef, width];
}
