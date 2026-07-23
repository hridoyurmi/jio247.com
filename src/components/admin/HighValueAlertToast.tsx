import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, CheckCircle2, XCircle, Volume2, VolumeX, X, Zap, ShieldAlert } from 'lucide-react';

export const HighValueAlertToast: React.FC = () => {
  const { 
    activeAlertToast, 
    dismissActiveAlertToast, 
    approveTransaction, 
    rejectTransaction, 
    transactions,
    soundAlertEnabled,
    setSoundAlertEnabled,
    playChimeSound 
  } = useApp();

  if (!activeAlertToast) return null;

  // Find corresponding transaction to check status
  const targetTxn = transactions.find(t => t.transactionId === activeAlertToast.txnId || t.userPhone === activeAlertToast.userPhone);
  const isPending = targetTxn ? targetTxn.status === 'pending' : true;

  const handleApprove = () => {
    if (targetTxn) {
      approveTransaction(targetTxn.id);
    }
    dismissActiveAlertToast();
  };

  const handleReject = () => {
    if (targetTxn) {
      rejectTransaction(targetTxn.id, 'High-value security check rejected');
    }
    dismissActiveAlertToast();
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] max-w-md w-full px-2 sm:px-0 animate-in fade-in slide-in-from-top-5 duration-300">
      <div className="relative bg-gradient-to-b from-[#120f00] via-[#0f0a00] to-[#050505] border-2 border-[#FFD700] rounded-3xl p-5 shadow-[0_0_50px_rgba(255,215,0,0.45)] backdrop-blur-xl overflow-hidden">
        {/* Glowing top animated accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-[#FFD700] to-emerald-500 animate-pulse" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2 text-[#FFD700]">
            <div className="p-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 animate-bounce">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[11px] font-black uppercase text-red-400 tracking-widest">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>রিয়েল-টাইম এলার্ট (Real-Time Alert)</span>
              </div>
              <h3 className="text-sm font-black text-white">হাই-ভ্যালু ডিপোজিট অনুরোধ!</h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setSoundAlertEnabled(!soundAlertEnabled);
                if (!soundAlertEnabled) playChimeSound();
              }}
              className="p-1.5 rounded-xl bg-[#1a1a1a] text-[#FFD700] border border-[#D4AF37]/30 hover:border-[#FFD700] transition-all"
              title={soundAlertEnabled ? 'Disable Sound' : 'Enable Sound'}
            >
              {soundAlertEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
            </button>
            <button
              onClick={dismissActiveAlertToast}
              className="p-1.5 rounded-xl bg-[#1a1a1a] text-gray-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Alert Details Body */}
        <div className="py-4 space-y-3">
          <div className="flex items-center justify-between bg-black/60 p-3 rounded-2xl border border-white/10">
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">ইউজার নাম ও ফোন</div>
              <div className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
                <span>{activeAlertToast.userName}</span>
                <span className="text-xs text-[#00BFFF] font-mono">({activeAlertToast.userPhone})</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-amber-400 uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                {activeAlertToast.paymentMethod}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FFD700]/10 via-amber-500/20 to-[#FFD700]/10 p-3.5 rounded-2xl border border-[#FFD700]/40 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#FFD700] uppercase font-bold tracking-wider">
                অনুরোধকৃত ডিপোজিট পরিমাণ
              </div>
              <div className="text-2xl font-black text-[#FFD700] font-mono tracking-tight drop-shadow-[0_2px_10px_rgba(255,215,0,0.5)]">
                ৳ {activeAlertToast.amount.toLocaleString()}
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-gray-300">
              <div>Txn ID:</div>
              <div className="font-bold text-white">{activeAlertToast.txnId}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          {isPending ? (
            <>
              <button
                onClick={handleApprove}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>অনুমোদন করুন</span>
              </button>

              <button
                onClick={handleReject}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <XCircle className="w-4 h-4" />
                <span>বাতিল করুন</span>
              </button>
            </>
          ) : (
            <div className="w-full text-center py-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
              স্ট্যাটাস আপডেট সম্পন্ন হয়েছে
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
