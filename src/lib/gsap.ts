"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

  // Emil Kowalski's stronger-than-CSS-default easing curves.
  // Native ease-out/ease-in-out are too weak to feel intentional.
  CustomEase.create("premiumOut", "0.23, 1, 0.32, 1");
  CustomEase.create("premiumInOut", "0.77, 0, 0.175, 1");
}

export { gsap, ScrollTrigger, SplitText };
