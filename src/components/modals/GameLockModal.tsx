import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, Unlock, ShieldCheck, KeyRound, Sparkles, Trophy, 
  Flame, ArrowRight, X, AlertCircle, Zap, RefreshCw, Smartphone
} from 'lucide-react';
import { Game } from '../../types';

interface GameLockModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onUnlock?: () => void;
}

export const GameLockModal: React.FC<GameLockModalProps> = ({ game, isOpen, onClose, onUnlock }) => {
  const { user, setIsDepositModalOpen, setIsAuthModalOpen, setActiveGameToPlay } = useApp();
  
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [jackpotValue, setJackpotValue] = useState<number>(12849200);

  // Progressive jackpot ticker
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setJackpotValue(prev => prev + Math.floor(Math.random() * 85) + 12);
    }, 1800);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !game) return null;

  const handleInstantUnlock = () => {
    if (onUnlock) {
      onUnlock();
    } else {
      if (game) {
        setActiveGameToPlay(game);
      }
      onClose();
    }
  };

  const handleKeypadPress = (val: string) => {
    if (pinInput.length < 4) {
      const nextPin = pinInput + val;
      setPinInput(nextPin);
      setPinError(false);

      if (nextPin.length === 4) {
        // Auto check pin (default PINs '1234', '0000', or user custom)
        if (nextPin === '1234' || nextPin === '0000' || nextPin === '2470') {
          handleInstantUnlock();
          setPinInput('');
        } else {
          setPinError(true);
          setTimeout(() => {
            setPinInput('');
            setPinError(false);
          }, 1200);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPinInput(prev => prev.slice(0, -1));
    setPinError(false);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#03302b] via-[#021f1c] to-[#011412] border-2 border-[#FFD700] rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(255,215,0,0.35)] text-slate-100 overflow-hidden">
        
        {/* Top Metallic Gold Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#FFD700] to-yellow-200 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-gray-400 hover:text-white hover:bg-black/80 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Site Motto Banner */}
        <div className="text-center mb-4 pt-1">
          <div className="inline-flex items-center gap-1.5 bg-[#FFD700]/10 border border-[#FFD700]/40 px-3 py-1 rounded-full text-[10px] font-black text-[#FFD700] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jio247.com Real Site Motto</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white tracking-wide">
            Jio247 — Asia's Most Trusted Royal Gaming & 24/7 Live Sports Odds Portal
          </h2>
          <p className="text-[11px] text-amber-200/80 font-medium">
            এশিয়া মহাদেশের ১ নম্বর বিশ্বস্ত অনলাইন ক্যাসিনো, স্লট ও স্পোর্টস বেটিং
          </p>
        </div>

        {/* Lock Screen Header Card */}
        <div className="bg-[#011a18] border border-[#FFD700]/40 rounded-2xl p-3.5 mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-[#FFD700] to-amber-600 text-slate-950 rounded-xl shadow-lg ring-2 ring-amber-300/40">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>REAL GAME LOCK SCREEN</span>
                  <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded">
                    LOCKED
                  </span>
                </h3>
                <p className="text-[10px] text-gray-300">
                  গেমের নাম: <strong className="text-[#FFD700]">{game.name}</strong> ({game.provider})
                </p>
              </div>
            </div>

            {/* Avatar display */}
            <div className="text-right">
              <span className="text-2xl">{user?.avatar || '🐯'}</span>
              <span className="block text-[9px] font-bold text-amber-300">{user?.nickname || 'VIP Player'}</span>
            </div>
          </div>

          {/* Live Progressive Jackpot Counter */}
          <div className="bg-gradient-to-r from-amber-950/80 via-black to-emerald-950/80 p-2.5 rounded-xl border border-amber-500/50 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#FFD700] animate-bounce" />
              <span className="text-[10px] text-amber-300 font-extrabold uppercase">
                {game.provider} MEGA JACKPOT
              </span>
            </div>
            <span className="text-sm sm:text-base font-black text-[#FFD700] font-mono tracking-wider animate-pulse">
              ৳ {jackpotValue.toLocaleString()}.00
            </span>
          </div>
        </div>

        {/* Keypad PIN Unlock Form */}
        <div className="space-y-3 bg-[#021f1c] p-4 rounded-2xl border border-white/10">
          <div className="text-center">
            <label className="text-xs font-black text-amber-200 block mb-1">
              ৪ ডিজিটের গেম সিকিউরিটি পিন দিন (PIN: 1234)
            </label>

            {/* Display PIN Dots */}
            <div className="flex justify-center items-center gap-3 my-2">
              {[0, 1, 2, 3].map((idx) => {
                const filled = pinInput.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg font-black font-mono transition-all ${
                      pinError
                        ? 'border-red-500 bg-red-950/50 text-red-400 animate-shake'
                        : filled
                        ? 'border-[#FFD700] bg-[#FFD700]/20 text-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.4)]'
                        : 'border-white/20 bg-black/40 text-gray-500'
                    }`}
                  >
                    {filled ? '●' : ''}
                  </div>
                );
              })}
            </div>

            {pinError && (
              <p className="text-[11px] text-red-400 font-bold flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>ভুল পিন کوڈ! সঠিক পিন: 1234 বা 0000</span>
              </p>
            )}
          </div>

          {/* Keypad Buttons */}
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeypadPress(digit)}
                className="bg-[#011816] hover:bg-[#FFD700] hover:text-slate-950 border border-white/10 text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95 shadow-md font-mono"
              >
                {digit}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              className="bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 font-bold text-xs py-2.5 rounded-xl transition-all"
            >
              মুছুন (←)
            </button>
            <button
              onClick={() => handleKeypadPress('0')}
              className="bg-[#011816] hover:bg-[#FFD700] hover:text-slate-950 border border-white/10 text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95 shadow-md font-mono"
            >
              0
            </button>
            <button
              onClick={handleInstantUnlock}
              className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>আনলক</span>
            </button>
          </div>
        </div>

        {/* Quick Deposit or Instant Demo Unlock Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={handleInstantUnlock}
            className="flex items-center justify-center gap-1.5 bg-[#FFD700] text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>১-ক্লিকে ফ্রী ডেমো আনলক</span>
          </button>

          <button
            onClick={() => {
              onClose();
              setIsDepositModalOpen(true);
            }}
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black text-xs py-2.5 px-3 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg border border-emerald-300/30"
          >
            <Smartphone className="w-4 h-4" />
            <span>ডিপোজিট করে আসল গেম খেলুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
