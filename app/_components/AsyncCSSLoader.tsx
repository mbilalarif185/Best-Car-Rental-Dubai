'use client';

import { useEffect } from 'react';

export default function AsyncCSSLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/main.css'; // Adjust if needed
    link.type = 'text/css';
    link.media = 'all';
    link.onload = () => {
      console.log('Main CSS loaded');
    };
    document.head.appendChild(link);
  }, []);

  return null;
}
