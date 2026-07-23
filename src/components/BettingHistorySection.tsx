import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, TrendingDown, DollarSign, Award, FileText, Search, Filter, 
  Calendar, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, RefreshCw, BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export const BettingHistorySection: React.FC = () => {
  const { betHistory } = useApp();
  
  const [timeRange, setTimeRange] = useState<30 | 15 | 7>(30);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'win' | 'loss'>('all');

  // Filter records based on selected timeRange (in days)
  const filteredByDate = useMemo(() => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - timeRange);

    return betHistory.filter(record => {
      const recordDate = new Date(record.timestamp);
      // Fallback if date parsing fails: include all records
      return isNaN(recordDate.getTime()) ? true : recordDate >= cutoffDate;
    });
  }, [betHistory, timeRange]);

  // Aggregate stats
  const stats = useMemo(() => {
    let totalWagered = 0;
    let totalPayout = 0;
    let winCount = 0;
    let lossCount = 0;

    filteredByDate.forEach(b => {
      totalWagered += b.betAmount;
      totalPayout += b.payout;
      if (b.result === 'win') {
        winCount++;
      } else {
        lossCount++;
      }
    });

    const netProfit = totalPayout - totalWagered;
    const totalBets = filteredByDate.length;
    const winRate = totalBets > 0 ? ((winCount / totalBets) * 100).toFixed(1) : '0';

    return {
      totalBets,
      totalWagered,
      totalPayout,
      netProfit,
      winCount,
      lossCount,
      winRate
    };
  }, [filteredByDate]);

  // Prepare Daily Trend Data for Line Chart over past 'timeRange' days
  const dailyChartData = useMemo(() => {
    const mapByDate: Record<string, { date: string; displayDate: string; wins: number; bets: number; netProfit: number }> = {};

    // Initialize past N days in chronological order
    for (let i = timeRange - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const isoDate = d.toISOString().split('T')[0]; // e.g., '2026-07-23'
      const displayDate = `${d.getDate()}/${d.getMonth() + 1}`; // e.g., '23/7'

      mapByDate[isoDate] = {
        date: isoDate,
        displayDate,
        wins: 0,
        bets: 0,
        netProfit: 0
      };
    }

    // Populate data from bet history
    filteredByDate.forEach(record => {
      const dateKey = record.timestamp.split(' ')[0]; // e.g., '2026-07-23'
      if (mapByDate[dateKey]) {
        mapByDate[dateKey].bets += record.betAmount;
        mapByDate[dateKey].wins += record.payout;
        mapByDate[dateKey].netProfit += (record.payout - record.betAmount);
      }
    });

    return Object.values(mapByDate);
  }, [filteredByDate, timeRange]);

  // Detailed records filter by search & result status
  const displayedRecords = useMemo(() => {
    return filteredByDate.filter(record => {
      const matchesSearch = record.gameName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || record.result === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [filteredByDate, searchQuery, statusFilter]);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#050505]/95 border border-[#FFD700]/50 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1 font-sans">
          <p className="font-bold text-[#FFD700] border-b border-[#D4AF37]/30 pb-1 flex items-center justify-between">
            <span>তারিখ: {data.date}</span>
            <span className="text-[10px] text-gray-400">({data.displayDate})</span>
          </p>
          <div className="flex justify-between items-center gap-4 text-emerald-400">
            <span>মোট জয় (Wins):</span>
            <span className="font-mono font-bold">৳ {data.wins.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center gap-4 text-rose-400">
            <span>মোট বাজি (Bets):</span>
            <span className="font-mono font-bold">৳ {data.bets.toLocaleString()}</span>
          </div>
          <div className={`flex justify-between items-center gap-4 font-bold border-t border-white/10 pt-1 ${
            data.netProfit >= 0 ? 'text-[#FFD700]' : 'text-red-400'
          }`}>
            <span>নিট প্রফিট (Net):</span>
            <span className="font-mono">
              {data.netProfit >= 0 ? '+' : ''}৳ {data.netProfit.toLocaleString()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-b from-[#032d29] via-[#022320] to-[#011715] border border-[#FFD700]/40 rounded-3xl p-4 sm:p-5 shadow-2xl text-slate-100 space-y-5">
      {/* Top Header & Range Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-[#FFD700] to-amber-600 text-slate-950 rounded-xl shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>বাজির ইতিহাস ও পারফর্মেন্স (Betting History)</span>
              </h3>
              <p className="text-xs text-amber-200/80">গত {timeRange} দিনের উইন/লস ট্রেন্ড ও বিস্তারিত রিপোর্ট</p>
            </div>
          </div>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#011a18] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setTimeRange(7)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeRange === 7
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ৭ দিন
          </button>
          <button
            onClick={() => setTimeRange(15)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeRange === 15
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ১৫ দিন
          </button>
          <button
            onClick={() => setTimeRange(30)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeRange === 30
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ৩০ দিন
          </button>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Bets */}
        <div className="bg-[#021f1c] border border-white/10 p-3 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">মোট বাজি সংখ্যা</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-black text-white font-mono">{stats.totalBets}</span>
            <span className="text-xs font-bold text-amber-400">টি বাজি</span>
          </div>
        </div>

        {/* Total Wagered */}
        <div className="bg-[#021f1c] border border-white/10 p-3 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">মোট বাজি পরিমাণ</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-black text-amber-300 font-mono">৳ {stats.totalWagered.toLocaleString()}</span>
          </div>
        </div>

        {/* Total Payout */}
        <div className="bg-[#021f1c] border border-white/10 p-3 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">মোট জয়ী অর্থ (Wins)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-black text-emerald-400 font-mono">৳ {stats.totalPayout.toLocaleString()}</span>
          </div>
        </div>

        {/* Net Profit / Loss */}
        <div className={`p-3 rounded-2xl border flex flex-col justify-between ${
          stats.netProfit >= 0 
            ? 'bg-gradient-to-br from-emerald-950/80 to-[#021f1c] border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            : 'bg-gradient-to-br from-red-950/80 to-[#021f1c] border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-300">নিট প্রফিট / লস</span>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-black/40 text-amber-300">
              উইন রেট {stats.winRate}%
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {stats.netProfit >= 0 ? (
              <ArrowUpRight className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className={`text-xl font-black font-mono ${
              stats.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {stats.netProfit >= 0 ? '+' : ''}৳ {stats.netProfit.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Recharts 30-Day Line Chart Section */}
      <div className="bg-[#021816] border border-[#D4AF37]/30 rounded-2xl p-4 shadow-inner">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#FFD700]" />
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-200">
              গত {timeRange} দিনের উইন ও বাজি ট্রেন্ড চার্ট (Win & Loss Activity Chart)
            </h4>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold">
            <span className="flex items-center gap-1 text-[#FFD700]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" /> নিট লাভ
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> জয়ী অর্থ
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> বাজি
            </span>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f3c37" />
              <XAxis 
                dataKey="displayDate" 
                stroke="#a0aec0" 
                fontSize={10} 
                tickLine={false}
              />
              <YAxis 
                stroke="#a0aec0" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Line 1: Daily Net Profit (Gold) */}
              <Line 
                type="monotone" 
                dataKey="netProfit" 
                name="নিট লাভ" 
                stroke="#FFD700" 
                strokeWidth={2.5} 
                dot={{ r: 3, fill: '#FFD700' }} 
                activeDot={{ r: 6 }} 
              />
              
              {/* Line 2: Daily Wins (Emerald) */}
              <Line 
                type="monotone" 
                dataKey="wins" 
                name="জয়ী অর্থ" 
                stroke="#10B981" 
                strokeWidth={1.5} 
                strokeDasharray="4 4"
                dot={{ r: 2, fill: '#10B981' }} 
              />
              
              {/* Line 3: Daily Bets (Rose) */}
              <Line 
                type="monotone" 
                dataKey="bets" 
                name="বাজি" 
                stroke="#EF4444" 
                strokeWidth={1.5} 
                dot={{ r: 2, fill: '#EF4444' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter & Detailed Records Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
          <h4 className="text-xs font-black text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>বিস্তারিত বাজি রেজিষ্টার ({displayedRecords.length})</span>
          </h4>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="গেম এর নাম খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#011a18] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-[#011a18] border border-white/10 text-xs text-amber-300 font-bold rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">সকল ফলাফল</option>
              <option value="win">শুধু জয়ী (Wins)</option>
              <option value="loss">শুধু পরাজয় (Losses)</option>
            </select>
          </div>
        </div>

        {/* Detailed Records List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          {displayedRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">
              কোনো বাজির রেকর্ড পাওয়া যায়নি।
            </div>
          ) : (
            displayedRecords.map((record) => {
              const isWin = record.result === 'win';
              const net = isWin ? (record.payout - record.betAmount) : -record.betAmount;

              return (
                <div
                  key={record.id}
                  className="bg-[#021f1c] border border-white/10 hover:border-[#FFD700]/40 p-3 rounded-2xl flex items-center justify-between gap-3 transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{record.gameName}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isWin ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {isWin ? 'WIN (জয়ী)' : 'LOSS (পরাজয়)'}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono flex items-center gap-2">
                      <span>ID: {record.id}</span>
                      <span>•</span>
                      <span>{record.timestamp}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-gray-300">
                      বাজি: <span className="font-mono text-white">৳{record.betAmount}</span>
                    </div>
                    <div className={`text-sm font-black font-mono ${
                      isWin ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isWin ? `+৳${record.payout}` : `-৳${record.betAmount}`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
