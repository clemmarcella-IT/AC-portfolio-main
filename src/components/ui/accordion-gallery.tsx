'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { gsap } from 'gsap';

export interface AccordionGalleryItem {
  image: string;
  label: string;
  link: string;
}

export interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: 'hover' | 'click';
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  height?: number;
  gap?: number;
  radius?: number;
  orientation?: 'horizontal' | 'vertical';
}

export function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = 'hover',
  accentColor = '#34d399',
  overlayColor = '#09090b',
  textColor = '#ffffff',
  grayscale = true,
  showLabels = true,
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  height = 460,
  gap = 10,
  radius = 16,
  orientation = 'horizontal',
}: AccordionGalleryProps) {
  const panelRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const initialIndex = Math.min(Math.max(defaultIndex, 0), items.length - 1);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const inactiveGrow = items.length > 1 ? ((1 - expandRatio) * 100) / (items.length - 1) : 100;
  const galleryStyle = {
    '--gallery-height': `${height}px`,
    '--gallery-gap': `${gap}px`,
    '--gallery-radius': `${radius}px`,
    '--gallery-overlay': overlayColor,
    '--gallery-text': textColor,
    '--gallery-accent': accentColor,
  } as CSSProperties;

  useEffect(() => {
    const panels = panelRefs.current.slice(0, items.length);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    panels.forEach((panel, index) => {
      if (!panel) return;
      gsap.to(panel, {
        flexGrow: index === activeIndex ? expandRatio * 100 : inactiveGrow,
        duration: reducedMotion ? 0 : duration,
        ease,
        delay: reducedMotion ? 0 : Math.abs(index - activeIndex) * stagger,
        overwrite: 'auto',
      });
    });

    return () => {
      panels.forEach((panel) => {
        if (panel) gsap.killTweensOf(panel);
      });
    };
  }, [activeIndex, duration, ease, expandRatio, inactiveGrow, items.length, stagger]);

  const handlePanelPointerMove = (event: ReactPointerEvent<HTMLAnchorElement>, index: number) => {
    if (event.pointerType === 'touch') return;
    const panel = panelRefs.current[index];
    const image = imageRefs.current[index];
    if (!panel || !image) return;

    const bounds = panel.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(panel, {
      rotationY: normalizedX * tilt,
      rotationX: -normalizedY * tilt,
      transformPerspective: 900,
      duration: 0.25,
      overwrite: 'auto',
    });
    gsap.to(image, {
      x: -normalizedX * parallax * 28,
      y: -normalizedY * parallax * 28,
      scale: 1.08,
      duration: 0.35,
      overwrite: 'auto',
    });
  };

  const resetPanelTransform = (index: number) => {
    const panel = panelRefs.current[index];
    const image = imageRefs.current[index];
    if (panel) gsap.to(panel, { rotationX: 0, rotationY: 0, duration: 0.35, overwrite: 'auto' });
    if (image) gsap.to(image, { x: 0, y: 0, scale: activeIndex === index ? 1.08 : 1, duration: 0.4, overwrite: 'auto' });
  };

  const resetGallery = () => {
    if (trigger !== 'hover') return;
    setActiveIndex(initialIndex);
    panelRefs.current.forEach((panel, index) => {
      const image = imageRefs.current[index];
      if (panel) gsap.to(panel, { rotationX: 0, rotationY: 0, duration: 0.35, overwrite: 'auto' });
      if (image) gsap.to(image, {
        x: 0,
        y: 0,
        scale: index === initialIndex ? 1.08 : 1,
        duration: 0.4,
        overwrite: 'auto',
      });
    });
  };

  return (
    <div
      className={`home-accordion-gallery orientation-${orientation}`}
      style={galleryStyle}
      role="group"
      aria-label="Featured work gallery"
      onPointerLeave={resetGallery}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <a
            key={`${item.label}-${item.image}`}
            ref={(element) => { panelRefs.current[index] = element; }}
            className={`accordion-gallery-panel${isActive ? ' is-active' : ''}${grayscale && !isActive ? ' is-grayscale' : ''}`}
            href={item.link}
            aria-label={`${item.label}: view featured projects`}
            aria-current={isActive ? 'true' : undefined}
            onPointerEnter={() => trigger === 'hover' && setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            onPointerMove={(event) => handlePanelPointerMove(event, index)}
            onPointerLeave={() => resetPanelTransform(index)}
            style={{ flexGrow: isActive ? expandRatio * 100 : inactiveGrow }}
          >
            <img
              ref={(element) => { imageRefs.current[index] = element; }}
              src={item.image}
              alt={item.label}
              loading={index < 3 ? 'eager' : 'lazy'}
              draggable={false}
            />
            <span className="accordion-gallery-scrim" />
            {showLabels && <span className="accordion-gallery-label">{item.label}</span>}
            <span className="accordion-gallery-index">0{index + 1}</span>
          </a>
        );
      })}
    </div>
  );
}

export default AccordionGallery;