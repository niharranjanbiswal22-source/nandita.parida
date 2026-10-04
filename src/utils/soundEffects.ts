// Web Audio API Sound FX Engine & Audio Loop Control for Nandita's Birthday Website

let audioCtx: AudioContext | null = null;
let htmlAudioElement: HTMLAudioElement | null = null;
let isMusicPlaying = false;
let timeUpdateListener: (() => void) | null = null;

// Time bounds in seconds (1 min 40 sec = 100s to 2 min 30 sec = 150s)
const LOOP_START_TIME = 100; // 1:40
const LOOP_END_TIME = 150;   // 2:30

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play soft piano tone for UI feedback
export function playPianoNote(freq: number, duration: number = 1.2, volume: number = 0.15) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error("Audio error", e);
  }
}

// Sparkle chime effect for wish generator or candle blow
export function playSparkleSound() {
  try {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playPianoNote(freq, 1.5, 0.12);
      }, idx * 90);
    });
  } catch (e) {
    console.error(e);
  }
}

// Celebration sound for fireworks
export function playCelebrationSound() {
  try {
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        playPianoNote(freq, 2.0, 0.15);
      }, i * 60);
    });
  } catch (e) {
    console.error(e);
  }
}

// Candle blow wind sound effect
export function playBlowSound() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(ctx.currentTime + 0.8);

    setTimeout(() => playSparkleSound(), 400);
  } catch (e) {
    console.error(e);
  }
}

// Start custom audio song looping from 1:40 (100s) to 2:30 (150s)
export function startBackgroundMusic(audioPath: string = "/audio/birthday-music.mp3"): boolean {
  try {
    if (!htmlAudioElement) {
      htmlAudioElement = new Audio(audioPath);
      htmlAudioElement.volume = 0.6;
    }

    // Attach precise loop boundary listener (100s to 150s)
    if (!timeUpdateListener) {
      timeUpdateListener = () => {
        if (!htmlAudioElement) return;
        if (htmlAudioElement.currentTime >= LOOP_END_TIME || htmlAudioElement.currentTime < LOOP_START_TIME) {
          htmlAudioElement.currentTime = LOOP_START_TIME;
        }
      };
      htmlAudioElement.addEventListener('timeupdate', timeUpdateListener);
    }

    // Set initial start position at 1m 40s (100 seconds)
    if (htmlAudioElement.currentTime < LOOP_START_TIME || htmlAudioElement.currentTime >= LOOP_END_TIME) {
      htmlAudioElement.currentTime = LOOP_START_TIME;
    }

    const promise = htmlAudioElement.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          isMusicPlaying = true;
        })
        .catch((err) => {
          console.warn("Autoplay deferred until user interaction", err);
          isMusicPlaying = false;
        });
    } else {
      isMusicPlaying = true;
    }
  } catch (e) {
    console.error("Audio playback error:", e);
    isMusicPlaying = false;
  }

  return true;
}

export function stopBackgroundMusic() {
  isMusicPlaying = false;
  if (htmlAudioElement) {
    htmlAudioElement.pause();
  }
}

export function toggleBackgroundMusic(audioPath?: string): boolean {
  if (isMusicPlaying) {
    stopBackgroundMusic();
    return false;
  } else {
    startBackgroundMusic(audioPath);
    return true;
  }
}

export function isAudioPlaying(): boolean {
  return isMusicPlaying;
}
