/**
 * Scrolls to the top of the page or internal scroll containers
 * Handles both normal pages (window scroll) and fixed-height containers (internal scroll)
 * @param smooth - Whether to use smooth scrolling (default: true)
 */
export function scrollToTop(smooth: boolean = true): void {
  const scrollBehavior = smooth ? 'smooth' : 'auto';

  // 1. Scroll the window (works for Landing, Intake, Summary pages)
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: scrollBehavior
  });

  // 2. Scroll internal containers (works for Game page)
  // Find all elements with overflow-y-auto or overflow-auto
  const scrollContainers = document.querySelectorAll(
    '[class*="overflow-y-auto"], [class*="overflow-auto"]'
  );

  scrollContainers.forEach((container) => {
    if (container instanceof HTMLElement) {
      container.scrollTo({
        top: 0,
        left: 0,
        behavior: scrollBehavior
      });
    }
  });
}
