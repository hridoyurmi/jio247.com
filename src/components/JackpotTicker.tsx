import React, { useState, useEffect } from 'react';
import { Plane, Coins, Trophy } from 'lucide-react';

export const JackpotTicker: React.FC = () => {
  const [jackpot, setJackpot] = useState(124839934.05);

  useEffect(() => {
    const timer = setInterval(() => {
      setJackpot(prev => prev + (Math.random() * 1.5 + 0.05));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const formattedStr = jackpot.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="max-w-7xl mx-auto px-3 my-4">
      <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400/60 bg-gradient-to-b from-[#06423c] via-[#022824] to-[#011816] p-4 text-center shadow-[0_0_25px_rgba(255,215,0,0.25)]">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-400/10 rounded-full blur-xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Plane className="w-6 h-6 text-red-500 fill-red-500 animate-pulse -rotate-12" />
          <h3 className="text-2xl sm:text-3xl font-black text-gold-shine tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>JACKPOT</span>
          </h3>
          <Coins className="w-6 h-6 text-amber-400 animate-bounce" />
        </div>

        {/* Jackpot Digits Box */}
        <div className="inline-flex items-center justify-center gap-1 sm:gap-1.5 bg-[#011210] p-2.5 rounded-xl border border-amber-400/40 shadow-inner max-w-full overflow-x-auto">
          {formattedStr.split('').map((char, index) => {
            if (char === ',' || char === '.') {
              return (
                <span key={index} className="text-amber-400 font-extrabold text-xl sm:text-3xl px-0.5">
                  {char}
                </span>
              );
            }
            return (
              <div
                key={index}
                className="w-6 h-9 sm:w-9 sm:h-12 bg-gradient-to-b from-[#111111] via-[#222222] to-[#050505] rounded-md border border-amber-400/50 flex items-center justify-center text-amber-300 font-mono font-black text-xl sm:text-3xl shadow-md border-t-amber-300"
              >
                {char}
              </div>
            );
          })}
          <span className="text-amber-400 font-black text-xl sm:text-2xl ml-1 font-sans">
            ৳
          </span>
        </div>
      </div>
    </div>
  );
};
