/**
 * Format a value for display: title case (e.g. "audi" → "Audi", "mercedes benz" → "Mercedes Benz").
 * Use when showing car brand, name, type, fuel, gear etc. that users may have entered in lowercase.
 */
export function toDisplayLabel(value: string | undefined | null): string {
  if (value == null || value === "") return "";
  return value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
