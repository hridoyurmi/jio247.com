import confetti from 'canvas-confetti';

export const triggerDepositConfetti = () => {
  try {
    // 1. Primary center burst
    confetti({
      particleCount: 110,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#FFD700', '#10B981', '#06B6D4', '#F59E0B', '#FFFFFF', '#EC4899'],
      zIndex: 99999,
      disableForReducedMotion: true
    });

    // 2. Left and Right synchronized side cannons
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 75,
        origin: { x: 0.05, y: 0.7 },
        colors: ['#FFD700', '#F59E0B', '#FFFFFF', '#10B981'],
        zIndex: 99999
      });

      confetti({
        particleCount: 60,
        angle: 120,
        spread: 75,
        origin: { x: 0.95, y: 0.7 },
        colors: ['#10B981', '#06B6D4', '#FFD700', '#FFFFFF'],
        zIndex: 99999
      });
    }, 220);

    // 3. Gold sparkle rain finish
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 120,
        startVelocity: 22,
        decay: 0.92,
        scalar: 1.1,
        origin: { y: 0.4 },
        colors: ['#FFD700', '#EAB308', '#FFFFFF'],
        zIndex: 99999
      });
    }, 450);
  } catch (err) {
    console.error('Confetti animation failed:', err);
  }
};
