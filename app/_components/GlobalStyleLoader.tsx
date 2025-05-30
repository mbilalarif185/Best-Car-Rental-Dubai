// app/components/DeferredStyleLoader.tsx
'use client';

import { useEffect } from 'react';

export default function DeferredStyleLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/main.css';
    link.type = 'text/css';
    link.onload = () => console.log('main.css loaded');
    document.head.appendChild(link);
  }, []);

  return null;
}
