import React, { useEffect, useState } from 'react';
import { DepositSuccessToastData } from '../types';
import { CheckCircle2, X, Sparkles, Clock, Copy, Check, ArrowRight } from 'lucide-react';
import { triggerDepositConfetti } from '../utils/confetti';

interface DepositSuccessToastProps {
  data: DepositSuccessToastData | null;
  onClose: () => void;
}

export const DepositSuccessToast: React.FC<DepositSuccessToastProps> = ({ data, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!data) return;

    // Trigger initial celebration confetti
    triggerDepositConfetti();

    // Auto dismiss countdown timer (7 seconds)
    const duration = 7000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= step) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [data, onClose]);

  if (!data) return null;

  const handleCopyTxn = () => {
    navigator.clipboard.writeText(data.txnId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] w-[92%] max-w-lg animate-in fade-in slide-in-from-top-6 duration-300">
      <div className="relative bg-gradient-to-b from-[#033a33] via-[#022320] to-[#011715] border-2 border-[#FFD700] rounded-3xl p-4 sm:p-5 shadow-[0_10px_40px_rgba(255,215,0,0.3)] text-slate-100 overflow-hidden backdrop-blur-xl">
        
        {/* Animated Top Pulse Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-[#FFD700] to-cyan-400 animate-pulse" />

        {/* Progress Countdown Line */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#FFD700] to-emerald-400 transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />

        {/* Header & Close Button */}
        <div className="flex items-start justify-between gap-3 mb-3 border-b border-[#D4AF37]/30 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-[#FFD700] to-amber-500 text-slate-950 rounded-2xl shadow-lg ring-2 ring-amber-300/50 animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm sm:text-base font-black text-white tracking-wide">
                  🎉 ডিপোজিট সফলভাবে জমা হয়েছে!
                </h4>
              </div>
              <p className="text-[11px] text-amber-200 font-medium">
                ডিপোজিট আবেদন গ্রহণ করা হয়েছে (Pending Verification)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full bg-black/40 text-gray-400 hover:text-white hover:bg-black/60 transition-all"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Details Box */}
        <div className="bg-[#011816]/90 border border-[#D4AF37]/40 rounded-2xl p-3.5 space-y-2.5 my-2">
          
          {/* Amount and Bonus Banner */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-950/80 via-[#022320] to-amber-950/80 p-2.5 rounded-xl border border-emerald-500/40">
            <div>
              <span className="text-[10px] text-emerald-300 uppercase font-extrabold tracking-wider block">জমার পরিমাণ</span>
              <span className="text-xl font-black text-emerald-400 font-mono">
                ৳ {data.amount.toLocaleString()}
              </span>
            </div>
            {data.bonusAmount > 0 && (
              <div className="text-right bg-[#FFD700]/20 border border-[#FFD700]/50 px-2.5 py-1 rounded-lg">
                <span className="text-[10px] text-[#FFD700] font-black uppercase block">১০% স্বাগতম বোনাস</span>
                <span className="text-xs font-black text-[#FFD700] font-mono">+ ৳{data.bonusAmount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#042d29] p-2 rounded-xl border border-white/10">
              <span className="text-[10px] text-gray-400 block font-bold">মেথড / মেথড নম্বর</span>
              <span className="font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                <span className="px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded text-[10px]">{data.method}</span>
                <span className="font-mono text-white text-[11px] truncate">{data.senderAccount}</span>
              </span>
            </div>

            <div className="bg-[#042d29] p-2 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">ট্রানজেকশন আইডি</span>
                <span className="font-mono font-bold text-amber-300 text-[11px] truncate block mt-0.5">
                  {data.txnId}
                </span>
              </div>
              <button
                onClick={handleCopyTxn}
                className="p-1.5 bg-black/40 hover:bg-black text-amber-300 rounded-lg shrink-0 transition-all"
                title="TxID কপি করুন"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Verification Time Notice */}
          <div className="flex items-center gap-2 text-[11px] text-amber-200/90 bg-amber-950/40 border border-amber-500/30 p-2 rounded-xl">
            <Clock className="w-4 h-4 text-[#FFD700] shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
            <span>
              অ্যাডমিন যাচাই করে <strong>১ মিনিটের মধ্যে</strong> আপনার অ্যাকাউন্ট ব্যালেন্সে টাকা যোগ করে দেবে।
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => triggerDepositConfetti()}
            className="flex items-center gap-1.5 text-xs font-extrabold text-[#FFD700] hover:text-white bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-xl border border-[#FFD700]/30 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>আবার উদযাপন করুন (Confetti)</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1 bg-[#FFD700] text-slate-950 font-black text-xs px-4 py-1.5 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <span>ঠিক আছে (Done)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
