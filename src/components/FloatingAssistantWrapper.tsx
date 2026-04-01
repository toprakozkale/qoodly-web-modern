"use client";

import dynamic from "next/dynamic";

const FloatingAssistant = dynamic(
  () => import("@/components/FloatingAssistant").then((m) => m.FloatingAssistant),
  { ssr: false }
);

export function FloatingAssistantWrapper() {
  return <FloatingAssistant />;
}
