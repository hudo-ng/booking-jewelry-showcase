"use client";

import type { ImageLoaderProps } from "next/image";

export default function imageKitLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("http")) return src;
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}tr=w-${width},q-${quality ?? 75}`;
}
