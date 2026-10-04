// Web Audio API Synthesizer & Sound FX Engine for Nandita's Birthday Website

let audioCtx: AudioContext | null = null;
let bgMusicGain: GainNode | null = null;
let isMusicPlaying = false;
let musicInterval: number | null = null;
let htmlAudioElement: HTMLAudioElement | null = null;

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

// Play soft piano note
export function playPianoNote(freq: number, duration: number = 1.2, volume: number = 0.15) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Soft attack and gentle decay
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

// Chime / Sparkle effect for candle blow or wish generator
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

// Firework celebration explosion sound
export function playCelebrationSound() {
  try {
    const ctx = getAudioContext();
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

    // Followed by sparkle chime
    setTimeout(() => playSparkleSound(), 400);
  } catch (e) {
    console.error(e);
  }
}

// Ambient Background Happy Birthday Melody Loop (Piano / Music Box synth)
const happyBirthdayMelody = [
  { note: 261.63, duration: 0.4 }, // G4 / C4
  { note: 261.63, duration: 0.4 },
  { note: 293.66, duration: 0.8 },
  { note: 261.63, duration: 0.8 },
  { note: 349.23, duration: 0.8 },
  { note: 329.63, duration: 1.4 },

  { note: 261.63, duration: 0.4 },
  { note: 261.63, duration: 0.4 },
  { note: 293.66, duration: 0.8 },
  { note: 261.63, duration: 0.8 },
  { note: 392.00, duration: 0.8 },
  { note: 349.23, duration: 1.4 },

  { note: 261.63, duration: 0.4 },
  { note: 261.63, duration: 0.4 },
  { note: 523.25, duration: 0.8 },
  { note: 440.00, duration: 0.8 },
  { note: 349.23, duration: 0.8 },
  { note: 329.63, duration: 0.8 },
  { note: 293.66, duration: 1.4 },

  { note: 466.16, duration: 0.4 },
  { note: 466.16, duration: 0.4 },
  { note: 440.00, duration: 0.8 },
  { note: 349.23, duration: 0.8 },
  { note: 392.00, duration: 0.8 },
  { note: 349.23, duration: 1.8 }
];

export function startBackgroundMusic(audioPath: string = "/audio/birthday-music.mp3"): boolean {
  if (isMusicPlaying) return true;

  // Try HTML5 Audio first if valid
  try {
    if (!htmlAudioElement) {
      htmlAudioElement = new Audio(audioPath);
      htmlAudioElement.loop = true;
      htmlAudioElement.volume = 0.4;
    }

    const promise = htmlAudioElement.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          isMusicPlaying = true;
        })
        .catch(() => {
          // Fallback to Web Audio Synthesizer!
          startSynthMelody();
        });
    } else {
      isMusicPlaying = true;
    }
  } catch (e) {
    startSynthMelody();
  }

  return true;
}

function startSynthMelody() {
  if (isMusicPlaying) return;
  isMusicPlaying = true;

  let noteIdx = 0;
  const playNext = () => {
    if (!isMusicPlaying) return;
    const item = happyBirthdayMelody[noteIdx];
    playPianoNote(item.note, item.duration * 1.5, 0.08);

    noteIdx = (noteIdx + 1) % happyBirthdayMelody.length;
    const delay = item.duration * 750;
    musicInterval = window.setTimeout(playNext, delay);
  };

  playNext();
}

export function stopBackgroundMusic() {
  isMusicPlaying = false;
  if (musicInterval !== null) {
    clearTimeout(musicInterval);
    musicInterval = null;
  }
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
