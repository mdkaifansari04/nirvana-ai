"use client";

import { LineShadowText } from "@/components/magicui/line-shadow-text";

export function ScrollDownText() {
  return (
    <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-primary">
        Scroll
      <LineShadowText className="italic" shadowColor={"black"}>
        Down
      </LineShadowText>
    </h1>
  );
}
