"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A horizontally auto-drifting row of tiles that is also genuinely
 * scrollable: native touch swipe, trackpad/shift-wheel, and click-and-drag
 * with the mouse. Auto-drift runs via scrollLeft (not a CSS transform, which
 * ignores scroll/touch input entirely) and pauses the moment a person
 * interacts, resuming a beat after they let go. `children` is the unique
 * set of tiles — this duplicates them once internally to loop seamlessly.
 */
export default function ScrollMarquee({
  children,
  speed = 40,
  className = "",
}: {
  children: ReactNode;
  /** Seconds for one full pass through the tiles — same scale as before. */
  speed?: number;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let halfWidth = track.scrollWidth / 2;
    const ro = new ResizeObserver(() => {
      halfWidth = track.scrollWidth / 2;
    });
    ro.observe(track);

    let pressed = false;
    let dragging = false;
    let dragMoved = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let activePointerId: number | null = null;
    let idleUntil = 0;
    let lastTime = performance.now();
    let rafId: number;

    const DRAG_THRESHOLD = 3;

    // Safari (notably iPadOS) can fail to visually advance a scroll
    // container when only `scrollLeft` is assigned directly from a rAF
    // loop with no real user gesture behind it — the position updates in
    // the DOM but never repaints. `scrollTo()` reliably forces the
    // repaint there and works everywhere else too.
    const setScrollLeft = (value: number) => {
      scroller.scrollTo({ left: value, behavior: "instant" });
    };

    const wrap = () => {
      if (halfWidth <= 0) return;
      if (scroller.scrollLeft >= halfWidth) {
        setScrollLeft(scroller.scrollLeft - halfWidth);
      } else if (scroller.scrollLeft <= 0) {
        setScrollLeft(scroller.scrollLeft + halfWidth);
      }
    };

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (!reduceMotion && !dragging && now > idleUntil && halfWidth > 0) {
        setScrollLeft(scroller.scrollLeft + (halfWidth / speed) * dt);
        wrap();
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const markInteracting = () => {
      idleUntil = performance.now() + 1500;
    };

    const onScroll = () => wrap();

    // Pointer capture is only taken once real drag movement is detected,
    // not on every mousedown — capturing immediately retargets the
    // resulting `click` event to the scroller div instead of the tile's
    // <a>, silently breaking every link (Chromium redirects a click built
    // from captured pointer events to the capturing element).
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        markInteracting();
        return;
      }
      pressed = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartScroll = scroller.scrollLeft;
      activePointerId = e.pointerId;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pressed) return;
      const dx = e.clientX - dragStartX;
      if (!dragging && Math.abs(dx) > DRAG_THRESHOLD) {
        dragging = true;
        dragMoved = true;
        if (activePointerId !== null) scroller.setPointerCapture(activePointerId);
        scroller.style.cursor = "grabbing";
        scroller.style.userSelect = "none";
      }
      if (!dragging) return;
      scroller.scrollLeft = dragStartScroll - dx;
      wrap();
    };
    const endDrag = (e: PointerEvent) => {
      if (!pressed) return;
      pressed = false;
      if (dragging) {
        dragging = false;
        scroller.style.cursor = "";
        scroller.style.userSelect = "";
        if (activePointerId !== null) {
          try {
            scroller.releasePointerCapture(activePointerId);
          } catch {
            // pointer capture may already be released by the browser
          }
        }
        markInteracting();
      }
      activePointerId = null;
    };
    const onClickCapture = (e: MouseEvent) => {
      if (dragMoved) {
        e.preventDefault();
        e.stopPropagation();
        dragMoved = false;
      }
    };
    const onWheel = () => markInteracting();
    const onDragStart = (e: DragEvent) => e.preventDefault();

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointercancel", endDrag);
    scroller.addEventListener("click", onClickCapture, true);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: true });
    scroller.addEventListener("dragstart", onDragStart);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", endDrag);
      scroller.removeEventListener("pointercancel", endDrag);
      scroller.removeEventListener("click", onClickCapture, true);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("dragstart", onDragStart);
    };
  }, [speed]);

  return (
    <div
      ref={scrollerRef}
      className={`will-change-scroll cursor-grab overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
    >
      <div ref={trackRef} className="flex w-max gap-5">
        {children}
        {children}
      </div>
    </div>
  );
}
