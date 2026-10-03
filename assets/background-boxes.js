(() => {
  const CELL_WIDTH = 64;
  const CELL_HEIGHT = 48;
  const colors = [
    'rgba(52, 211, 153, 0.42)',
    'rgba(56, 189, 248, 0.38)',
    'rgba(251, 191, 36, 0.34)',
    'rgba(251, 113, 133, 0.34)',
  ];
  const grid = document.createElement('div');
  grid.className = 'background-boxes-fallback-grid';
  grid.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(grid, document.body.firstChild);

  let columns = 0;
  let rows = 0;
  let activeTile = null;
  let tileCenters = [];

  function buildGrid() {
    columns = Math.ceil(window.innerWidth / CELL_WIDTH) + 8;
    rows = Math.ceil(window.innerHeight / CELL_HEIGHT) + 8;
    grid.style.gridTemplateColumns = `repeat(${columns}, ${CELL_WIDTH}px)`;
    grid.replaceChildren(...Array.from({ length: columns * rows }, () => document.createElement('div')));
    tileCenters = Array.from(grid.children, (tile) => {
      const rect = tile.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
    activeTile = null;
  }

  function handlePointerMove(event) {
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

    const tile = grid.children[nearestIndex];
    if (!tile || tile === activeTile) return;

    activeTile?.classList.remove('is-active');
    activeTile = tile;
    const column = nearestIndex % columns;
    const row = Math.floor(nearestIndex / columns);
    tile.style.setProperty('--box-color', colors[(column + row) % colors.length]);
    tile.classList.add('is-active');
  }

  function clearActiveTile() {
    activeTile?.classList.remove('is-active');
    activeTile = null;
  }

  buildGrid();
  window.addEventListener('resize', buildGrid);
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerleave', clearActiveTile, { passive: true });
})();