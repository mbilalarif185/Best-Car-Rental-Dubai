'use client';

import React from 'react';
import Image from 'next/image';
import styles from './WhatsAppButton.module.css';


type Props = {
  phoneNumber?: string;
  iconUrl?: string;
  bottom?: number;
  right?: number;
  openInNewTab?: boolean;
  animation?: 'bounce' | 'zoom' | 'rotate' | 'pulse' | 'shake';
};

const WhatsAppButton = ({
  phoneNumber = '923001234567',
  iconUrl = '/whatsapp-icon.webp',
  bottom = 30,
  right = 30,
  openInNewTab = true,
  animation = 'bounce',
}: Props) => {
  const href = `https://wa.me/${phoneNumber}`;
  const validAnimations = ['bounce', 'zoom', 'rotate', 'pulse', 'shake'] as const;
  const animationClass = validAnimations.includes(animation) ? styles[animation] : '';

  return (
    <a
      href={href}
      target={openInNewTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`${styles.floatingButton} ${animationClass}`}
      style={{ bottom: `${bottom}px`, right: `${right}px` }}
    >
      <Image src={iconUrl} alt="WhatsApp" width={60} height={60} />
    </a>
  );
};

export default WhatsAppButton;
