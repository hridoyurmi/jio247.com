import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Plane, Play, RotateCcw, Volume2, X } from 'lucide-react';

export const AviatorGame: React.FC = () => {
  const { currentUser, placeBet, setActiveGameToPlay } = useApp();

  const [betAmount, setBetAmount] = useState<number>(50);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'crashed'>('idle');
  const [multiplier, setMultiplier] = useState<number>(1.00);
  const [crashMultiplier, setCrashMultiplier] = useState<number>(2.00);
  const [hasCashedOut, setHasCashedOut] = useState<boolean>(false);
  const [cashOutMultiplier, setCashOutMultiplier] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([1.45, 2.12, 1.05, 5.80, 1.95, 3.40, 1.12]);
  const [message, setMessage] = useState<string>('');

  const animRef = useRef<number | null>(null);

  const startGame = () => {
    if (currentUser.balance < betAmount) {
      setMessage('পর্যাপ্ত ব্যালেন্স নেই!');
      return;
    }

    setHasCashedOut(false);
    setMessage('');
    setMultiplier(1.00);

    // Random target crash multiplier between 1.1x and 12.0x
    const target = parseFloat((1.1 + Math.random() * Math.random() * 10).toFixed(2));
    setCrashMultiplier(target);
    setGameState('running');

    let current = 1.00;
    const interval = setInterval(() => {
      current += 0.02 + current * 0.015;
      if (current >= target) {
        clearInterval(interval);
        setMultiplier(target);
        setGameState('crashed');
        setHistory(prev => [target, ...prev.slice(0, 10)]);

        if (!hasCashedOut) {
          // Bet lost
          placeBet('Aviator', betAmount, 0, false);
          setMessage(`ফ্লাইট ক্র্যাশ করেছে @ ${target.toFixed(2)}x`);
        }
      } else {
        setMultiplier(parseFloat(current.toFixed(2)));
      }
    }, 60);
  };

  const handleCashOut = () => {
    if (gameState !== 'running' || hasCashedOut) return;

    setHasCashedOut(true);
    setCashOutMultiplier(multiplier);
    const winAmount = parseFloat((betAmount * multiplier).toFixed(2));
    placeBet('Aviator', betAmount, multiplier, true);
    setMessage(`অভিনন্দন! আপনি জিতেছেন ৳${winAmount} (@ ${multiplier.toFixed(2)}x)`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3">
      <div className="bg-[#022320] border-2 border-amber-400 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#011715] p-3 border-b border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            <h3 className="font-black text-amber-300 text-base tracking-wider">AVIATOR (SPRIBE)</h3>
          </div>
          <button
            onClick={() => setActiveGameToPlay(null)}
            className="p-1 text-slate-400 hover:text-white bg-slate-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Odds History Ticker */}
        <div className="bg-[#032b27] px-3 py-1.5 flex items-center gap-2 overflow-x-auto border-b border-amber-400/20">
          <span className="text-[10px] text-slate-400 uppercase font-bold shrink-0">পূর্ববর্তী:</span>
          {history.map((h, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold shrink-0 ${
                h >= 2.0 ? 'bg-purple-900 text-purple-200 border border-purple-400' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {h.toFixed(2)}x
            </span>
          ))}
        </div>

        {/* Flight Display Canvas Area */}
        <div className="relative aspect-[16/9] bg-gradient-to-b from-[#0a0f12] via-[#051816] to-[#011412] flex flex-col items-center justify-center overflow-hidden border-b border-amber-400/20 p-4">
          
          {/* Animated Background Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f2d29_1px,transparent_1px),linear-gradient(to_bottom,#0f2d29_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Airplane Animation */}
          {gameState === 'running' && (
            <div 
              className="absolute transition-all duration-75 flex items-center gap-1"
              style={{
                left: `${Math.min(10 + multiplier * 15, 75)}%`,
                bottom: `${Math.min(10 + multiplier * 12, 70)}%`
              }}
            >
              <Plane className="w-10 h-10 text-red-500 fill-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)] -rotate-12" />
            </div>
          )}

          {/* Display Multiplier */}
          <div className="relative z-10 text-center">
            {gameState === 'crashed' ? (
              <div className="text-red-500 font-black text-4xl sm:text-5xl animate-bounce tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
                FLEW AWAY!
                <span className="block text-xl text-amber-300 mt-1">@ {multiplier.toFixed(2)}x</span>
              </div>
            ) : (
              <div className="text-gold-shine font-mono font-black text-5xl sm:text-6xl tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                {multiplier.toFixed(2)}x
              </div>
            )}
          </div>

          {/* Feedback Message */}
          {message && (
            <div className="absolute bottom-2 bg-amber-400/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg">
              {message}
            </div>
          )}
        </div>

        {/* Betting Controls Footer */}
        <div className="p-4 bg-[#011a18] flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-amber-200">
            <span>ব্যালেন্স: <strong className="text-amber-300 font-mono">৳{currentUser.balance.toFixed(2)}</strong></span>
            <span>বাজির পরিমাণ:</span>
          </div>

          <div className="flex items-center gap-2">
            {[20, 50, 100, 500].map(amt => (
              <button
                key={amt}
                onClick={() => setBetAmount(amt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                  betAmount === amt ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-[#04332e] text-amber-200 border-amber-400/30'
                }`}
              >
                ৳{amt}
              </button>
            ))}
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-20 bg-[#042d29] border border-amber-400/40 rounded-lg text-center text-xs text-amber-100 font-bold py-1.5"
            />
          </div>

          {/* Main Action Button */}
          {gameState === 'idle' || gameState === 'crashed' ? (
            <button
              onClick={startGame}
              className="w-full bg-gold-button font-black text-slate-950 py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-98 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>বাটনে ক্লিক করে খেলা শুরু করুন (BET ৳{betAmount})</span>
            </button>
          ) : (
            <button
              onClick={handleCashOut}
              disabled={hasCashedOut}
              className={`w-full py-3 rounded-xl font-black text-slate-950 text-sm sm:text-base shadow-lg transition-all ${
                hasCashedOut 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-400 to-green-500 hover:brightness-110 animate-pulse'
              }`}
            >
              {hasCashedOut ? 'ক্যাশআউট সম্পন্ন' : `ক্যাশআউট করুন (CASH OUT ৳${(betAmount * multiplier).toFixed(2)})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
