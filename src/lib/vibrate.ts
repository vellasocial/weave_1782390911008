/**
 * Trigger a short haptic vibration on supported devices.
 * Silently no-ops on browsers/devices that don't support the Vibration API.
 */
export function vibrate(pattern: number | number[] = 30): void {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}
