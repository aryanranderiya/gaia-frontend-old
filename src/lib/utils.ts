// src/lib/utils.ts

/**
 * Joins multiple class names into a single string.
 * Handles conditional class names and ignores falsy values.
 *
 * @param classes - Array of class names
 * @returns A single string of class names
 */
export function cn(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}
