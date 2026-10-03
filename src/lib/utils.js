export function cn(...inputs) {
  return inputs
    .flatMap((c) => {
      if (!c) return [];
      if (typeof c === 'string') return c.split(' ');
      if (Array.isArray(c)) return c;
      if (typeof c === 'object') {
        return Object.entries(c)
          .filter(([, v]) => Boolean(v))
          .map(([k]) => k);
      }
      return [];
    })
    .filter(Boolean)
    .join(' ');
}
