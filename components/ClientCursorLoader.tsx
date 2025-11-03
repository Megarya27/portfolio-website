"use client";
import dynamic from "next/dynamic";

// Dynamically load the client-only CustomCursor with no SSR.
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function ClientCursorLoader() {
  return <CustomCursor />;
}
