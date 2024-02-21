export function getformattedDate(date) {
  return date?.toISOString().slice(0, 10);
}

export function getDateminusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
