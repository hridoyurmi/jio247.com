import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RotateCw, Sparkles, Trophy, X } from 'lucide-react';

export const SuperAceSlot: React.FC = () => {
  const { currentUser, placeBet, setActiveGameToPlay } = useApp();

  const symbols = ['♠️', '♥️', '♣️', '♦️', '👑', '💎', '🎰', '🃏'];
  const [reels, setReels] = useState<string[]>(['🎰', '👑', '💎', '🃏', '♠️']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [bet, setBet] = useState(20);
  const [winMessage, setWinMessage] = useState<string>('');

  const handleSpin = () => {
    if (currentUser.balance < bet) {
      setWinMessage('পর্যাপ্ত ব্যালেন্স নেই!');
      return;
    }

    setIsSpinning(true);
    setWinMessage('');

    let count = 0;
    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setIsSpinning(false);

        // Calculate win
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setReels(finalReels);

        // Check duplicates
        const counts: { [key: string]: number } = {};
        finalReels.forEach(s => counts[s] = (counts[s] || 0) + 1);
        const maxMatch = Math.max(...Object.values(counts));

        if (maxMatch >= 3) {
          const mult = maxMatch === 5 ? 20 : maxMatch === 4 ? 8 : 3;
          const payout = bet * mult;
          placeBet('Super Ace Slot', bet, mult, true);
          setWinMessage(`SUPER WIN! ৳${payout} (${mult}x Multiplier)`);
        } else {
          placeBet('Super Ace Slot', bet, 0, false);
          setWinMessage('পরের বার আবার চেষ্টা করুন!');
        }
      }
    }, 80);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3">
      <div className="bg-[#022320] border-2 border-amber-400 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#011715] p-3 border-b border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
            <h3 className="font-black text-amber-300 text-base">SUPER ACE (JILI)</h3>
          </div>
          <button
            onClick={() => setActiveGameToPlay(null)}
            className="p-1 text-slate-400 hover:text-white bg-slate-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slot Machine Frame */}
        <div className="p-6 bg-gradient-to-b from-[#063b35] to-[#011a18] flex flex-col items-center gap-4">
          <div className="bg-[#010e0d] p-3 rounded-2xl border-2 border-amber-400/60 shadow-inner flex items-center gap-2 w-full justify-center">
            {reels.map((symbol, i) => (
              <div
                key={i}
                className={`w-12 h-16 sm:w-14 sm:h-20 bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg transition-transform ${
                  isSpinning ? 'animate-bounce' : ''
                }`}
              >
                {symbol}
              </div>
            ))}
          </div>

          {winMessage && (
            <div className="text-center font-black text-amber-300 text-sm bg-black/50 px-4 py-1.5 rounded-full border border-amber-400/30">
              {winMessage}
            </div>
          )}

          {/* Bet Selector */}
          <div className="w-full flex items-center justify-between text-xs text-amber-200 px-2">
            <span>ব্যালেন্স: <strong>৳{currentUser.balance.toFixed(2)}</strong></span>
            <div className="flex items-center gap-1">
              {[10, 20, 50, 100].map(b => (
                <button
                  key={b}
                  onClick={() => setBet(b)}
                  className={`px-2 py-1 rounded text-xs font-bold border ${
                    bet === b ? 'bg-amber-400 text-slate-950' : 'bg-[#04332e] text-amber-200'
                  }`}
                >
                  ৳{b}
                </button>
              ))}
            </div>
          </div>

          {/* Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="w-full bg-gold-button font-black text-slate-950 py-3 rounded-xl shadow-xl hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'স্পিন হচ্ছে...' : `SPIN (৳${bet})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
