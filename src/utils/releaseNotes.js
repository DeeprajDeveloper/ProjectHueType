export function formatReleaseDate(isoDate) {
  if (!isoDate) return '';

  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
