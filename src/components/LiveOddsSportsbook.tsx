import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_LIVE_ODDS } from '../data/mockData';
import { LiveOddsMatch } from '../types';
import { 
  Trophy, Flame, Sparkles, CheckCircle2, RefreshCw, 
  Tv, Radio, ShieldCheck, ArrowRight, DollarSign, Activity
} from 'lucide-react';

export const LiveOddsSportsbook: React.FC = () => {
  const { user, updateUserBalanceDelta, addBetRecord, setIsDepositModalOpen } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'cricket' | 'football' | 'tennis' | 'virtual'>('all');
  const [selectedOdd, setSelectedOdd] = useState<{ matchId: string; team: string; odds: number; betAmount: number } | null>(null);
  const [betSuccess, setBetSuccess] = useState<string | null>(null);

  const filteredMatches = INITIAL_LIVE_ODDS.filter(match => {
    if (activeTab === 'all') return true;
    return match.sport === activeTab;
  });

  const handlePlaceBet = (match: LiveOddsMatch, team: string, odds: number) => {
    const defaultBet = 100;

    if (!user || user.balance < defaultBet) {
      alert(`আপনার ব্যালেন্স অপর্যাপ্ত! বেটিং এর জন্য কমপক্ষে ৳${defaultBet} প্রয়োজন। অনুগ্রহ করে ডিপোজিট করুন।`);
      setIsDepositModalOpen(true);
      return;
    }

    // Deduct bet amount
    const potentialPayout = Math.round(defaultBet * odds);
    updateUserBalanceDelta(-defaultBet);

    // Record bet
    addBetRecord({
      gameName: `${match.sport.toUpperCase()} LIVE: ${team} (${odds}x)`,
      betAmount: defaultBet,
      payout: potentialPayout,
      result: 'win', // Immediate live odds feedback
      timestamp: new Date().toLocaleString()
    });

    // Credit potential winnings for live demo thrill
    setTimeout(() => {
      updateUserBalanceDelta(potentialPayout);
    }, 1200);

    setBetSuccess(`🎉 বেট সফল হয়েছে! ৳${defaultBet} বেট করা হয়েছে [${team} @ ${odds}x]। সম্ভাব্য জয়ী অর্থ: ৳${potentialPayout.toLocaleString()}!`);
    setTimeout(() => setBetSuccess(null), 4000);
  };

  return (
    <div className="bg-gradient-to-b from-[#032d29] via-[#022320] to-[#011715] border border-[#FFD700]/40 rounded-3xl p-4 sm:p-5 shadow-2xl text-slate-100 space-y-4">
      
      {/* Site Motto & Live Odds Header */}
      <div className="border-b border-[#D4AF37]/30 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-br from-red-600 via-amber-500 to-[#FFD700] text-slate-950 rounded-2xl shadow-lg ring-2 ring-amber-300/40">
            <Radio className="w-6 h-6 animate-pulse text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                <span>লাইভ স্পোর্টস ও ভার্চুয়াল রিয়েলিটি অডস</span>
                <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                  ● LIVE 24/7
                </span>
              </h3>
            </div>
            <p className="text-xs text-amber-200/90 font-medium">
              Jio247.com — Asia's Most Trusted Royal Gaming & 24/7 Live Sports Odds Portal
            </p>
          </div>
        </div>

        {/* Live Sport Filters */}
        <div className="flex items-center gap-1 bg-[#011a18] p-1 rounded-xl border border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔥 সকল ম্যাচ
          </button>
          <button
            onClick={() => setActiveTab('cricket')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'cricket'
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🏏 ক্রিকেট (Cricket)
          </button>
          <button
            onClick={() => setActiveTab('football')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'football'
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚽ ফুটবল (Football)
          </button>
          <button
            onClick={() => setActiveTab('tennis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'tennis'
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎾 টেনিস (Tennis)
          </button>
          <button
            onClick={() => setActiveTab('virtual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'virtual'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🥽 VR ভার্চুয়াল (VR 3D)
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {betSuccess && (
        <div className="bg-emerald-950/90 border-2 border-emerald-400 p-3 rounded-2xl text-xs font-bold text-emerald-200 flex items-center justify-between gap-2 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{betSuccess}</span>
          </div>
          <span className="text-[10px] font-mono bg-black/40 px-2 py-1 rounded text-amber-300">
            ব্যালেন্স যোগ করা হয়েছে!
          </span>
        </div>
      )}

      {/* Live Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredMatches.map((match) => (
          <div
            key={match.id}
            className="bg-[#021f1c] border border-white/10 hover:border-[#FFD700]/50 p-3.5 rounded-2xl space-y-3 transition-all shadow-md hover:shadow-gold-glow"
          >
            {/* Tournament Title & Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5 truncate">
                {match.sport === 'cricket' && '🏏'}
                {match.sport === 'football' && '⚽'}
                {match.sport === 'tennis' && '🎾'}
                {match.sport === 'virtual' && '🥽'}
                <span>{match.tournament}</span>
              </span>

              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${
                match.status === 'VR SIMULATION'
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-400/40'
                  : 'bg-red-600/30 text-red-300 border border-red-500/40 animate-pulse'
              }`}>
                <Activity className="w-3 h-3" />
                <span>{match.status}</span>
              </span>
            </div>

            {/* Teams & Score Display */}
            <div className="flex items-center justify-between gap-2 py-1">
              <div className="flex-1 space-y-1">
                <div className="font-extrabold text-xs text-white flex items-center gap-2">
                  <span>{match.team1}</span>
                </div>
                <div className="font-extrabold text-xs text-white flex items-center gap-2">
                  <span>{match.team2}</span>
                </div>
              </div>

              {/* Live Score Counter Box */}
              {match.score && (
                <div className="bg-[#011412] border border-[#FFD700]/30 px-3 py-1.5 rounded-xl text-right">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">লাইভ স্কোর</span>
                  <span className="text-xs font-black text-[#FFD700] font-mono">{match.score}</span>
                </div>
              )}
            </div>

            {/* Interactive Live Odds Betting Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {/* Team 1 Odds */}
              <button
                onClick={() => handlePlaceBet(match, match.team1, match.oddsTeam1)}
                className="bg-[#011816] hover:bg-[#FFD700] hover:text-slate-950 border border-white/10 p-2 rounded-xl text-center transition-all group active:scale-95"
              >
                <span className="text-[10px] text-gray-400 group-hover:text-slate-950 block truncate font-bold">
                  {match.team1.split(' ')[0]}
                </span>
                <span className="text-xs font-black text-amber-300 group-hover:text-slate-950 font-mono">
                  {match.oddsTeam1}x
                </span>
              </button>

              {/* Draw Odds (if available) or 1X2 */}
              {match.oddsDraw ? (
                <button
                  onClick={() => handlePlaceBet(match, 'Draw (ড্র)', match.oddsDraw!)}
                  className="bg-[#011816] hover:bg-[#FFD700] hover:text-slate-950 border border-white/10 p-2 rounded-xl text-center transition-all group active:scale-95"
                >
                  <span className="text-[10px] text-gray-400 group-hover:text-slate-950 block font-bold">
                    ড্র (Draw)
                  </span>
                  <span className="text-xs font-black text-amber-300 group-hover:text-slate-950 font-mono">
                    {match.oddsDraw}x
                  </span>
                </button>
              ) : (
                <div className="bg-[#011816]/50 border border-white/5 p-2 rounded-xl text-center flex items-center justify-center text-[10px] text-gray-500 font-bold">
                  VS
                </div>
              )}

              {/* Team 2 Odds */}
              <button
                onClick={() => handlePlaceBet(match, match.team2, match.oddsTeam2)}
                className="bg-[#011816] hover:bg-[#FFD700] hover:text-slate-950 border border-white/10 p-2 rounded-xl text-center transition-all group active:scale-95"
              >
                <span className="text-[10px] text-gray-400 group-hover:text-slate-950 block truncate font-bold">
                  {match.team2.split(' ')[0]}
                </span>
                <span className="text-xs font-black text-amber-300 group-hover:text-slate-950 font-mono">
                  {match.oddsTeam2}x
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
