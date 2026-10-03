'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface BackgroundBoxesProps {
  className?: string;
}

const CELL_WIDTH = 64;
const CELL_HEIGHT = 48;
const BOX_COLORS = [
  'rgba(52, 211, 153, 0.42)',
  'rgba(56, 189, 248, 0.38)',
  'rgba(251, 191, 36, 0.34)',
  'rgba(251, 113, 133, 0.34)',
];

export function BackgroundBoxes({ className }: BackgroundBoxesProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    document.body.classList.remove('background-boxes-fallback');
    document.querySelector('.background-boxes-fallback-grid')?.remove();

    const updateDimensions = () => {
      setDimensions({
        columns: Math.ceil(window.innerWidth / CELL_WIDTH) + 8,
        rows: Math.ceil(window.innerHeight / CELL_HEIGHT) + 8,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    let activeTile: HTMLDivElement | null = null;
    const tiles = grid ? Array.from(grid.children) as HTMLDivElement[] : [];
    const tileCenters = tiles.map((tile) => {
      const rect = tile.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      let nearestIndex = -1;
      let nearestDistance = Infinity;
      tileCenters.forEach((center, index) => {
        const distance = (center.x - event.clientX) ** 2 + (center.y - event.clientY) ** 2;
        if (distance < nearestDistance) {
          nearestIndex = index;
          nearestDistance = distance;
        }
      });

      const tile = tiles[nearestIndex];
      if (!tile || tile === activeTile) return;

      activeTile?.classList.remove('is-active');
      activeTile = tile;
      const column = nearestIndex % dimensions.columns;
      const row = Math.floor(nearestIndex / dimensions.columns);
      activeTile.style.setProperty('--box-color', BOX_COLORS[(column + row) % BOX_COLORS.length]);
      activeTile.classList.add('is-active');
    };

    const clearActiveTile = () => {
      activeTile?.classList.remove('is-active');
      activeTile = null;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', clearActiveTile, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', clearActiveTile);
    };
  }, [dimensions.columns]);

  const tileCount = dimensions.columns * dimensions.rows;

  return (
    <div aria-hidden="true" className={cn('background-boxes', className)}>
      <div
        ref={gridRef}
        className="background-boxes-grid"
        style={{ gridTemplateColumns: `repeat(${dimensions.columns}, ${CELL_WIDTH}px)` }}
      >
        {Array.from({ length: tileCount }, (_, index) => (
          <div className="background-box-cell" key={index} />
        ))}
      </div>
      <div className="background-boxes-mask" />
    </div>
  );
}

export default BackgroundBoxes;