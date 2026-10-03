'use client';

import { useState, type CSSProperties } from 'react';

export interface ThreeDImageRingItem {
  image: string;
  label: string;
  role: string;
  description: string;
}

export interface ThreeDImageRingProps {
  items: ThreeDImageRingItem[];
  defaultIndex?: number;
  autoRotate?: boolean;
  duration?: number;
}

export function ThreeDImageRing({
  items,
  defaultIndex = 0,
  autoRotate = true,
  duration = 30,
}: ThreeDImageRingProps) {
  const initialIndex = Math.min(Math.max(defaultIndex, 0), items.length - 1);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeMember = items[activeIndex];
  const selectMember = (index: number) => {
    setActiveIndex((currentIndex) => index === currentIndex ? (currentIndex + 1) % items.length : index);
  };

  return (
    <div
      className={`home-3d-image-ring${autoRotate ? ' is-auto-rotating' : ''}`}
      style={{ '--ring-start': `${(360 / Math.max(items.length, 1)) * activeIndex}deg`, '--ring-duration': `${duration}s` } as CSSProperties}
      role="region"
      aria-label="Team photo carousel"
    >
      <div className="home-3d-image-ring-track">
        {items.map((item, index) => (
          <button
            className={`home-3d-image-ring-card${activeIndex === index ? ' is-selected' : ''}`}
            type="button"
            aria-label={`Show ${item.label}'s profile`}
            aria-pressed={activeIndex === index}
            key={`${item.label}-${item.image}`}
            style={{ '--ring-angle': `${(360 / Math.max(items.length, 1)) * index}deg` } as CSSProperties}
          >
            <img src={item.image} alt={item.label} loading={index < 5 ? 'eager' : 'lazy'} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="home-3d-image-ring-shade" />
      {activeMember && (
        <div className="home-3d-image-ring-about" aria-live="polite">
          <span className="home-3d-image-ring-role">{activeMember.role}</span>
          <h2>{activeMember.label}</h2>
          <p>{activeMember.description}</p>
        </div>
      )}
    </div>
  );
}

export default ThreeDImageRing;