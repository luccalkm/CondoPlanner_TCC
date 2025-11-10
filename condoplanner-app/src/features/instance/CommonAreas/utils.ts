export function placeholderImage(seed: number) {
  return `https://source.unsplash.com/collection/483251/${300 + (seed % 40)}x${180 + (seed % 25)}?sig=${seed}&building`;
}

export function toHHmm(value?: string) {
  if (!value) return '08:00';
  const [h, m] = value.split(':');
  return `${(h || '').padStart(2, '0')}:${(m || '').padStart(2, '0')}`;
}

export function toHHmmss(value: string) {
  if (!value) return '08:00:00';
  return value.length === 5 ? `${value}:00` : value;
}
