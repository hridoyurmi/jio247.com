import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, ShieldAlert, Volume2, VolumeX, Sparkles, CheckCircle2, 
  XCircle, Clock, Zap, DollarSign, Filter, RefreshCw, Volume1
} from 'lucide-react';

export const HighValueAlertCenter: React.FC = () => {
  const { 
    adminNotifications, 
    soundAlertEnabled, 
    setSoundAlertEnabled, 
    highValueThreshold, 
    setHighValueThreshold, 
    simulateHighValueDeposit, 
    playChimeSound,
    approveTransaction,
    rejectTransaction,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    transactions
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'pending'>('all');
  const [testAmount, setTestAmount] = useState<number>(10000);

  const highValueNotifs = adminNotifications.filter(n => n.isHighValue || n.amount >= highValueThreshold);
  const unreadCount = highValueNotifs.filter(n => !n.read).length;

  const filteredNotifs = highValueNotifs.filter(n => {
    if (filterType === 'pending') {
      const targetTxn = transactions.find(t => t.transactionId === n.txnId || t.userPhone === n.userPhone);
      return targetTxn ? targetTxn.status === 'pending' : true;
    }
    return true;
  });

  const handleSimulate = () => {
    simulateHighValueDeposit(testAmount);
  };

  return (
    <div className="bg-gradient-to-b from-[#120f00] via-[#0f0a00] to-[#050505] border-2 border-[#FFD700]/50 rounded-3xl p-5 sm:p-6 shadow-[0_0_30px_rgba(255,215,0,0.15)] space-y-5">
      {/* Top Header & Real-time Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-[#FFD700] via-amber-500 to-amber-700 text-slate-950 rounded-2xl shadow-[0_0_15px_rgba(255,215,0,0.4)] relative">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>হাই-ভ্যালু ডিপোজিট রিয়েল-টাইম অ্যালার্ট ফিড</span>
              </h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce shadow">
                  {unreadCount} নতুন
                </span>
              )}
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              ৳{highValueThreshold.toLocaleString()} বা তার বেশি ডিপোজিট হলে সরাসরি সাউন্ড অ্যালার্ট ও পপআপ মিলবে
            </p>
          </div>
        </div>

        {/* Audio Sound Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setSoundAlertEnabled(!soundAlertEnabled);
              if (!soundAlertEnabled) playChimeSound();
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              soundAlertEnabled
                ? 'bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {soundAlertEnabled ? <Volume2 className="w-4 h-4 text-[#FFD700]" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundAlertEnabled ? 'সাউন্ড অ্যালার্ট চালু (On)' : 'সাউন্ড বন্ধ (Off)'}</span>
          </button>

          <button
            onClick={playChimeSound}
            className="px-3 py-1.5 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/30 hover:border-[#FFD700] text-gray-200 hover:text-white text-xs font-bold flex items-center gap-1 transition-all"
            title="Test Chime Sound"
          >
            <Volume1 className="w-4 h-4 text-amber-400" />
            <span>টেস্ট চিম</span>
          </button>

          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="px-3 py-1.5 rounded-xl bg-[#1a1a1a] border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all"
            >
              মার্ক অল রিড
            </button>
          )}
        </div>
      </div>

      {/* Simulator / Test Trigger & Threshold Bar */}
      <div className="bg-[#050505]/90 border border-[#D4AF37]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Threshold setting */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-300 whitespace-nowrap">অ্যালার্ট থ্রেশহোল্ড:</span>
          <div className="flex items-center gap-1 bg-[#1a1a1a] px-2 py-1 rounded-xl border border-white/10 text-xs font-mono font-bold text-[#FFD700]">
            <span>৳</span>
            <input
              type="number"
              value={highValueThreshold}
              onChange={(e) => setHighValueThreshold(Number(e.target.value) || 1000)}
              className="w-20 bg-transparent text-white font-mono font-bold focus:outline-none"
              step={500}
            />
          </div>
        </div>

        {/* Instant Real-Time Test Simulation Trigger */}
        <div className="flex items-center gap-2">
          <select
            value={testAmount}
            onChange={(e) => setTestAmount(Number(e.target.value))}
            className="bg-[#1a1a1a] text-xs font-bold text-[#FFD700] border border-[#D4AF37]/30 rounded-xl px-2.5 py-2 focus:outline-none"
          >
            <option value={5000}>৳ 5,000 টেস্ট</option>
            <option value={10000}>৳ 10,000 টেস্ট</option>
            <option value={25000}>৳ 25,000 টেস্ট</option>
            <option value={50000}>৳ 50,000 টেস্ট</option>
          </select>

          <button
            onClick={handleSimulate}
            className="bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#9f7928] hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all shrink-0"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>সিমুলেট হাই-ভ্যালু ডিপোজিট (Test Alert)</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'all'
                ? 'bg-[#FFD700] text-slate-950 shadow'
                : 'text-gray-400 hover:text-white bg-[#1a1a1a]'
            }`}
          >
            সকল অ্যালার্ট ({highValueNotifs.length})
          </button>
          <button
            onClick={() => setFilterType('pending')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'pending'
                ? 'bg-[#FFD700] text-slate-950 shadow'
                : 'text-gray-400 hover:text-white bg-[#1a1a1a]'
            }`}
          >
            শুধু পেন্ডিং
          </button>
        </div>

        {highValueNotifs.length > 0 && (
          <button
            onClick={clearNotifications}
            className="text-gray-400 hover:text-red-400 text-xs font-bold transition-colors"
          >
            ক্লিয়ার লিস্ট
          </button>
        )}
      </div>

      {/* High Value Notifications List */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
        {filteredNotifs.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-xs">
            কোনো হাই-ভ্যালু ডিপোজিট নোটিফিকেশন পাওয়া যায়নি। "সিমুলেট হাই-ভ্যালু ডিপোজিট" বাটনে ক্লিক করে টেস্ট করুন।
          </div>
        ) : (
          filteredNotifs.map((notif) => {
            const targetTxn = transactions.find(t => t.transactionId === notif.txnId || t.userPhone === notif.userPhone);
            const status = targetTxn ? targetTxn.status : 'pending';

            return (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  !notif.read
                    ? 'bg-gradient-to-r from-[#FFD700]/10 via-[#1a1500] to-[#0a0a0a] border-[#FFD700]/60 shadow-[0_0_15px_rgba(255,215,0,0.15)]'
                    : 'bg-[#0a0a0a] border-white/10 opacity-90'
                }`}
              >
                {/* Left side: Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {notif.paymentMethod}
                    </span>
                    <span className="text-xs font-bold text-white">{notif.userName}</span>
                    <span className="text-xs text-[#00BFFF] font-mono">({notif.userPhone})</span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    )}
                  </div>
                  <p className="text-xs text-gray-300">{notif.message}</p>
                  <div className="text-[10px] text-gray-500 font-mono flex items-center gap-3">
                    <span>Txn ID: {notif.txnId}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.timestamp}
                    </span>
                  </div>
                </div>

                {/* Right side: Amount & Action */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">পরিমাণ</span>
                    <span className="text-lg font-black text-[#FFD700] font-mono">
                      ৳ {notif.amount.toLocaleString()}
                    </span>
                  </div>

                  {status === 'pending' && targetTxn ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          approveTransaction(targetTxn.id);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all active:scale-95 shadow"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>অনুমোদন</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          rejectTransaction(targetTxn.id, 'High-value security check');
                        }}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-bold px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>বাতিল</span>
                      </button>
                    </div>
                  ) : (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                      status === 'approved' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {status === 'approved' ? '✓ অনুমোদিত' : '✕ বাতিলকৃত'}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
