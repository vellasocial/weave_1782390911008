/**
 * Trigger haptic feedback on supported devices.
 * - Android Chrome: uses the Web Vibration API
 * - iOS Safari: uses a silent AudioContext oscillator to nudge the Taptic Engine
 * - Unsupported browsers: silently no-ops
 *
 * Must be called directly inside a user-gesture handler (click/touchend).
 */
export function vibrate(pattern: number | number[] = 30): void {
  if (typeof window === 'undefined') return;

  // Android / Chrome — Web Vibration API
  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // ignore
    }
    return;
  }

  // iOS Safari fallback — silent AudioContext pulse
  // This triggers the Taptic Engine on iPhones that support it
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    // Keep it completely silent — we only want the engine trigger
    gain.gain.setValueAtTime(0, ctx.currentTime);

    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.03); // 30 ms pulse

    oscillator.onended = () => {
      ctx.close().catch(() => {});
    };
  } catch {
    // ignore — device/browser doesn't support AudioContext
  }
}
