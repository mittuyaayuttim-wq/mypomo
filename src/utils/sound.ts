// Cozy Web Audio API synthesizer for session completion and button clicks

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a peaceful, warm, cozy marimba / bell arpeggio chord for session completion.
 */
export function playCompletionSound(volume = 0.7): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Chord: E5 (659.25Hz), G#5 (830.61Hz), B5 (987.77Hz), E6 (1318.51Hz)
    const notes = [659.25, 830.61, 987.77, 1318.51];
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const startTime = now + index * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft sine + triangle tone blend
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Volume envelope with warm bell decay
      const baseGain = 0.25 * volume;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(baseGain, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.9);
    });
  } catch (e) {
    console.warn('Audio playback error:', e);
  }
}

/**
 * Gentle soft tick / pop for tactile feedback.
 */
export function playTapSound(volume = 0.3): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.05);

    gain.gain.setValueAtTime(0.08 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Ignore audio tap errors silently
  }
}
