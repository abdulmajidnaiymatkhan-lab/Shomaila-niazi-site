"use client";

import { useEffect, useRef, type ReactNode } from "react";

const IDLE_MS = 1500;

// Scoped, not global — guarantees this keyframe is registered the instant
// this component's own markup exists, with zero dependency on load order
// against globals.css. Rendering it from multiple ScrollMarquee instances
// on one page is harmless; duplicate @keyframes with identical bodies just
// collapse. Assumes the track's children are rendered twice (this
// component's own duplication below), so -50% is exactly one full,
// untransformed copy's width.
const DRIFT_KEYFRAMES = `
@keyframes scroll-marquee-drift {
  to { transform: translateX(-50%); }
}
`;

/**
 * A row of tiles that auto-drifts at rest and is also genuinely scrollable:
 * native touch swipe, trackpad/shift-wheel, and click-and-drag with the
 * mouse. `children` is the unique set of tiles — this duplicates them once
 * internally to loop seamlessly.
 *
 * Two modes, switched on interaction:
 * - "auto": idle drift via a plain CSS @keyframes animation on the track's
 *   transform. Deliberately NOT a JS/requestAnimationFrame loop — confirmed
 *   live that iOS throttles JS timers hard under Low Power Mode (native
 *   scroll kept working, a rAF-driven drift froze completely), while CSS
 *   animations run on the compositor thread and aren't affected.
 * - "interactive": a real scrollLeft-driven scroll on the container.
 *
 * Switching INTO interactive mode only pauses the CSS animation in place
 * (`animation-play-state: paused`) — it never writes to scrollLeft at that
 * moment. That matters specifically for touch: writing scrollLeft inside a
 * touchstart/pointerdown handler lands at the exact instant iOS's own
 * native touch-scroll handling is initializing for that same gesture, and
 * the two visibly fight over the same pixel — a flicker, confirmed live.
 * Leaving scrollLeft untouched there removes that collision entirely: the
 * frozen transform holds the visual position, and native/drag scrolling
 * composes on top of it with nothing to contest. The only place this
 * component still writes scrollLeft on a mode switch is re-entering "auto"
 * after an idle timeout — which never races a live gesture, since by then
 * the user's touch has already ended.
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

    let mode: "auto" | "interactive" = "interactive";
    // ms timestamp of the conceptual start of the current animation cycle
    // (performance.now() minus whatever delay it was given), used to work
    // out how far through the loop the CSS animation currently is.
    let animStartTime = 0;
    // The auto-animation's progress (0..1) at the moment it was last
    // paused — the baseline that scrollLeft's movement during the
    // interactive phase gets added onto when resuming.
    let frozenFrac = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    let pressed = false;
    let dragging = false;
    let dragMoved = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let activePointerId: number | null = null;

    const DRAG_THRESHOLD = 3;

    const wrap = () => {
      if (halfWidth <= 0) return;
      if (scroller.scrollLeft >= halfWidth) {
        scroller.scrollLeft -= halfWidth;
      } else if (scroller.scrollLeft <= 0) {
        scroller.scrollLeft += halfWidth;
      }
    };

    const currentAutoFrac = () => {
      const cycleMs = speed * 1000;
      if (cycleMs <= 0) return 0;
      const elapsed = performance.now() - animStartTime;
      return (((elapsed % cycleMs) + cycleMs) % cycleMs) / cycleMs;
    };

    const enterAuto = (fracOfCycle: number) => {
      if (reduceMotion) return;
      mode = "auto";
      scroller.scrollLeft = 0;
      const delayMs = -(fracOfCycle * speed * 1000);
      animStartTime = performance.now() + delayMs;
      track.style.animation = `scroll-marquee-drift ${speed}s linear infinite`;
      track.style.animationDelay = `${delayMs / 1000}s`;
      track.style.animationPlayState = "running";
    };

    const exitToInteractive = () => {
      if (mode !== "auto") return;
      frozenFrac = currentAutoFrac();
      track.style.animationPlayState = "paused";
      mode = "interactive";
    };

    const scheduleReturnToAuto = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (pressed) return; // still actively pressed, don't switch yet
        const scrollFrac = halfWidth > 0 ? scroller.scrollLeft / halfWidth : 0;
        const combined = (((frozenFrac + scrollFrac) % 1) + 1) % 1;
        enterAuto(combined);
      }, IDLE_MS);
    };

    const markInteracting = () => {
      exitToInteractive();
      scheduleReturnToAuto();
    };

    enterAuto(0);

    const onScroll = () => {
      wrap();
    };

    // Pointer capture is only taken once real drag movement is detected,
    // not on every mousedown — capturing immediately retargets the
    // resulting `click` event to the scroller div instead of the tile's
    // <a>, silently breaking every link (Chromium redirects a click built
    // from captured pointer events to the capturing element).
    const onPointerDown = (e: PointerEvent) => {
      markInteracting();
      if (e.pointerType !== "mouse") return;
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
      }
      activePointerId = null;
      scheduleReturnToAuto();
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
      if (idleTimer) clearTimeout(idleTimer);
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
    <>
      <style>{DRIFT_KEYFRAMES}</style>
      <div
        ref={scrollerRef}
        className={`cursor-grab overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
        style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
      >
        <div ref={trackRef} className="flex w-max gap-5">
          {children}
          {children}
        </div>
      </div>
    </>
  );
}
