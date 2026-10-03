'use client';

import React, { useEffect, useRef, useState, useCallback, useId } from 'react';
import { ChevronLeft, ChevronRight, X, CheckCircle2, Code2, Globe, ExternalLink, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CarouselMember {
  id?: string | number;
  name: string;
  role: string;
  image: string;
  description?: string;
}

export interface ModernCarouselProps {
  /** List of members to display in the 3D coverflow carousel */
  items?: CarouselMember[];
  /** Large background watermark heading */
  watermarkTitle?: string;
  /** Section small tracking badge */
  badge?: string;
  /** Main section heading */
  heading?: string;
  /** Section summary subtitle */
  subtitle?: string;
  /** Custom outer container class name */
  className?: string;
  /** Whether to allow clicking the center card to open a full details modal */
  showModal?: boolean;
  /** Optional callback fired when an item is selected or clicked */
  onSelectMember?: (member: CarouselMember) => void;
}

const DEFAULT_MEMBERS: CarouselMember[] = [
  {
    name: 'Emily Kim',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop',
    description: 'Visionary entrepreneur with over a decade of leadership in software design, distributed architectures, and agile engineering teams.',
  },
  {
    name: 'Michael Steward',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1200&auto=format&fit=crop',
    description: 'Award-winning creative strategist shaping memorable interactive brands, UI design systems, and cohesive user experiences.',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60',
    description: 'Full-stack systems architect specializing in high-throughput cloud backends, TypeScript pipelines, and reactive client applications.',
  },
  {
    name: 'Julia Gimmel',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60',
    description: 'Human-centered product designer dedicated to accessibility, design systems, interactive prototypes, and conversion optimization.',
  },
  {
    name: 'Lisa Anderson',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop&q=60',
    description: 'Growth leader orchestrating product launches, performance marketing analytics, and engaging digital customer journeys.',
  },
  {
    name: 'James Wilson',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop',
    description: 'Agile practitioner bridging technical execution with stakeholder objectives to reliably deliver customer-centric software.',
  },
];

type CardClass = 'center' | 'left-1' | 'left-2' | 'right-1' | 'right-2' | 'hidden';

function getCardClass(offset: number, total: number): CardClass {
  if (offset === 0) return 'center';
  if (offset === 1) return 'right-1';
  if (offset === 2) return 'right-2';
  if (offset === total - 1) return 'left-1';
  if (offset === total - 2) return 'left-2';
  return 'hidden';
}

export function ModernCarousel({
  items = DEFAULT_MEMBERS,
  watermarkTitle = 'OUR TEAM',
  badge = 'Talent',
  heading = 'Meet Our Team',
  subtitle = 'Visionary leaders, skilled engineers, and creative thinkers driving innovative digital solutions.',
  className,
  showModal = true,
  onSelectMember,
}: ModernCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [memberVisible, setMemberVisible] = useState(true);
  const [selectedMember, setSelectedMember] = useState<CarouselMember | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(currentIndex);
  const isAnimatingRef = useRef(isAnimating);
  const carouselId = useId();

  const total = items.length;

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    isAnimatingRef.current = isAnimating;
  }, [currentIndex, isAnimating]);

  const updateCarousel = useCallback((newIndex: number) => {
    if (isAnimatingRef.current || total === 0) return;
    setIsAnimating(true);

    const next = (newIndex + total) % total;
    setCurrentIndex(next);
    setMemberVisible(false);

    setTimeout(() => {
      setDisplayedIndex(next);
      setMemberVisible(true);
    }, 300);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [total]);

  // Keyboard navigation & swipe touch handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        updateCarousel(currentIndexRef.current - 1);
      } else if (e.key === 'ArrowRight') {
        updateCarousel(currentIndexRef.current + 1);
      } else if (e.key === 'Escape' && selectedMember) {
        setSelectedMember(null);
      }
    };

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      const swipeThreshold = 50;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          updateCarousel(currentIndexRef.current + 1);
        } else {
          updateCarousel(currentIndexRef.current - 1);
        }
      }
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      containerEl.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (containerEl) {
        containerEl.removeEventListener('touchstart', handleTouchStart);
        containerEl.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [updateCarousel, selectedMember]);

  const currentMember = items[displayedIndex] || items[0];

  const handleCardClick = (member: CarouselMember, index: number, isCenter: boolean) => {
    if (isCenter) {
      if (showModal) setSelectedMember(member);
      if (onSelectMember) onSelectMember(member);
    } else {
      updateCarousel(index);
    }
  };

  const handleProfileActionClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const anchor = event.currentTarget;
    const href = anchor.href;
    const opensNewTab = anchor.target === '_blank';
    const destination = opensNewTab ? window.open('about:blank', '_blank') : null;

    if (destination) destination.opener = null;
    anchor.classList.add('is-launching');

    if (opensNewTab && !destination) return;
    event.preventDefault();

    window.setTimeout(() => {
      anchor.classList.remove('is-launching');
      if (destination) destination.location.href = href;
      else window.location.assign(href);
    }, 420);
  };

  return (
    <section
      id="team"
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={heading || 'Team Carousel'}
      className={cn(
        'team-carousel-section relative w-full py-20 overflow-hidden',
        className
      )}
    >
      {/* Massive Background Watermark */}
      {watermarkTitle && (
        <h1 className="team-watermark-title select-none pointer-events-none" aria-hidden="true">
          {watermarkTitle}
        </h1>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {(badge || heading || subtitle) && (
          <div className="text-center mb-6">
            {badge && (
              <p className="text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400 font-semibold mb-2">
                {badge}
              </p>
            )}
            {heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 dark:text-white tracking-tight">
                {heading}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm text-neutral-600 dark:text-zinc-400 max-w-lg mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* 3D Carousel Stage */}
        <div className="team-3d-container">
          <button
            type="button"
            className="team-3d-arrow left"
            onClick={() => updateCarousel(currentIndex - 1)}
            aria-label="Previous team member"
            aria-controls={carouselId}
          >
            <ChevronLeft size={24} />
          </button>

          <div id={carouselId} className="team-3d-track" role="list">
            {items.map((member, i) => {
              const offset = (i - currentIndex + total) % total;
              const cls = getCardClass(offset, total);
              const isCenter = cls === 'center';

              return (
                <div
                  key={`${member.name}-${i}`}
                  role="listitem"
                  aria-current={isCenter ? 'true' : undefined}
                  aria-label={`${member.name}, ${member.role}`}
                  className={cn('team-3d-card', cls)}
                  onClick={() => handleCardClick(member, i, isCenter)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(member, i, isCenter);
                    }
                  }}
                  tabIndex={0}
                  title={isCenter ? `Click to view profile of ${member.name}` : `View ${member.name}`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <span className="text-xs uppercase tracking-wider text-emerald-400 font-medium">Click for bio & info</span>
                      <p className="text-sm font-bold text-white truncate">{member.name}</p>
                    </div>
                  )}
                  {isCenter && (
                    <div className="absolute top-3 right-3 bg-emerald-500/80 backdrop-blur-md text-zinc-950 p-1 rounded-full shadow-lg">
                      <CheckCircle2 size={16} className="fill-emerald-400 text-zinc-950" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="team-3d-arrow right"
            onClick={() => updateCarousel(currentIndex + 1)}
            aria-label="Next team member"
            aria-controls={carouselId}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Selected Member Info */}
        {currentMember && (
          <div className="team-3d-info" aria-live="polite">
            <div className="team-3d-name-wrap">
              <h3
                className="team-3d-name"
                style={{ opacity: memberVisible ? 1 : 0 }}
              >
                <span>{currentMember.name}</span>
              </h3>
            </div>

            <p
              className="team-3d-role"
              style={{ opacity: memberVisible ? 1 : 0 }}
            >
              {currentMember.role}
            </p>

            {currentMember.description && (
              <p
                className="team-3d-bio"
                style={{ opacity: memberVisible ? 1 : 0 }}
              >
                {currentMember.description}
              </p>
            )}

            <div
              className={cn('team-profile-actions', !memberVisible && 'is-transitioning')}
              aria-label={`Links for ${currentMember.name}`}
              aria-hidden={!memberVisible}
            >
              <a
                className="team-profile-action"
                href={`https://github.com/search?q=${encodeURIComponent(currentMember.name)}&type=users`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Search GitHub for ${currentMember.name}`}
                tabIndex={memberVisible ? 0 : -1}
                onClick={handleProfileActionClick}
              >
                <Code2 size={17} aria-hidden="true" />
                <span>GitHub</span>
                <ArrowUpRight className="team-profile-action-arrow" size={16} aria-hidden="true" />
              </a>
              <a
                className="team-profile-action"
                href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(currentMember.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Search LinkedIn for ${currentMember.name}`}
                tabIndex={memberVisible ? 0 : -1}
                onClick={handleProfileActionClick}
              >
                <ExternalLink size={17} aria-hidden="true" />
                <span>LinkedIn</span>
                <ArrowUpRight className="team-profile-action-arrow" size={16} aria-hidden="true" />
              </a>
              <a
                className="team-profile-action"
                href="#projects"
                aria-label="View the AC project portfolio"
                tabIndex={memberVisible ? 0 : -1}
                onClick={handleProfileActionClick}
              >
                <Globe size={17} aria-hidden="true" />
                <span>Portfolio</span>
                <ArrowUpRight className="team-profile-action-arrow" size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* Dots Navigation */}
        <div className="team-3d-dots" role="tablist" aria-label="Team slides">
          {items.map((member, i) => (
            <button
              key={`dot-${member.name}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to slide ${i + 1}: ${member.name}`}
              className={cn('team-3d-dot', i === currentIndex && 'active')}
              onClick={() => updateCarousel(i)}
            />
          ))}
        </div>
      </div>

      {/* Member Full Detail Modal */}
      {selectedMember && (
        <div
          className="team-detail-backdrop"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedMember.name} Profile Details`}
        >
          <article
            className="team-detail-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="team-detail-close"
              onClick={() => setSelectedMember(null)}
              aria-label="Close team member information"
            >
              <X size={18} />
            </button>
            <div className="team-detail-header">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="team-detail-image"
              />
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-400">Team profile</p>
                <h3 className="mt-1 text-2xl font-bold text-white">{selectedMember.name}</h3>
                <p className="mt-1 text-sm font-semibold text-sky-300">{selectedMember.role}</p>
              </div>
            </div>
            {selectedMember.description && (
              <p className="mt-6 text-sm leading-relaxed text-zinc-300">
                {selectedMember.description}
              </p>
            )}
          </article>
        </div>
      )}
    </section>
  );
}

export default ModernCarousel;
