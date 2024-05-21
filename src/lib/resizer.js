/**
 * @param {HTMLElement} element
 * @param {(width: number, height: number) => void} callback
 * @returns {() => void}
 */
export function initResizer(element, callback) {
  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    callback(width, height);
  });

  resizeObserver.observe(element);

  return () => {
    element && resizeObserver.unobserve(element);
  };
}
