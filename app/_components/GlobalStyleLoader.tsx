// app/components/PreloadCSS.tsx
"use client";

import React, { useEffect, useRef } from "react";

export default function PreloadCSS() {
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = "/assets/css/main.css";
    link.as = "style";
    link.onload = () => {
      if (linkRef.current) {
        linkRef.current.rel = "stylesheet";
        link.onload = null;
      }
    };
    document.head.appendChild(link);
    linkRef.current = link;

    return () => {
      if (linkRef.current) {
        document.head.removeChild(linkRef.current);
      }
    };
  }, []);

  return null;
}
