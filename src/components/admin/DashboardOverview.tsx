import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HighValueAlertCenter } from './HighValueAlertCenter';
import { Users, DollarSign, UserCheck, Bell, TrendingUp, CheckCircle2, Clock, ShieldAlert, ArrowDownRight, ArrowUpRight, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export const DashboardOverview: React.FC = () => {
  const { users, transactions, settings, auditLogs } = useApp();
  const [chartTimeframe, setChartTimeframe] = useState<'7d' | '30d'>('7d');

  const todayUsersCount = users.length;
  const activeUsersCount = users.filter(u => u.status === 'active').length;
  const totalDepositSum = transactions
    .filter(t => t.type === 'deposit' && t.status === 'approved')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const pendingCount = transactions.filter(t => t.status === 'pending').length;

  // Compute daily trend data for Recharts Line Chart
  const trendData = useMemo(() => {
    const daysCount = chartTimeframe === '7d' ? 7 : 14;
    const today = new Date('2026-07-23'); // base date matching current mock context
    
    // Seed dates array
    const dateList: { dateStr: string; label: string; deposits: number; withdrawals: number }[] = [];
    
    // Baseline seed pattern to give realistic past trend curves
    const mockBaseline: Record<number, { dep: number; wd: number }> = {
      0: { dep: 12500, wd: 6000 },
      1: { dep: 18000, wd: 8500 },
      2: { dep: 15200, wd: 7200 },
      3: { dep: 22000, wd: 11000 },
      4: { dep: 19500, wd: 9400 },
      5: { dep: 28000, wd: 14000 },
      6: { dep: 35000, wd: 18500 },
      7: { dep: 31000, wd: 15000 },
      8: { dep: 26000, wd: 12000 },
      9: { dep: 29000, wd: 13500 },
      10: { dep: 34000, wd: 17000 },
      11: { dep: 38000, wd: 19000 },
      12: { dep: 42000, wd: 21000 },
      13: { dep: 45000, wd: 22500 },
    };

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const dayNamesBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
      const monthNamesBn = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসেম্বর'];
      const label = `${d.getDate()} ${monthNamesBn[d.getMonth()]} (${dayNamesBn[d.getDay()]})`;

      const seed = mockBaseline[i % 14] || { dep: 15000, wd: 7500 };
      dateList.push({
        dateStr,
        label,
        deposits: seed.dep,
        withdrawals: seed.wd,
      });
    }

    // Merge actual transactions onto the matched dates
    transactions.forEach(t => {
      const tDate = t.timestamp ? t.timestamp.split(' ')[0] : '';
      const target = dateList.find(item => item.dateStr === tDate);
      if (target) {
        if (t.type === 'deposit') {
          target.deposits += t.amount;
        } else if (t.type === 'withdrawal') {
          target.withdrawals += t.amount;
        }
      }
    });

    return dateList;
  }, [transactions, chartTimeframe]);

  const totalChartDeposits = useMemo(() => trendData.reduce((acc, d) => acc + d.deposits, 0), [trendData]);
  const totalChartWithdrawals = useMemo(() => trendData.reduce((acc, d) => acc + d.withdrawals, 0), [trendData]);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-[#0f0f0f] border border-[#D4AF37]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_10px_30px_-15px_rgba(212,175,55,0.2)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-[#FFD700] to-[#9f7928] text-slate-950 rounded-xl font-bold shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-[#FFD700] text-sm flex items-center gap-2">
              <span>সিস্টেম নোটিফিকেশন (System Notice)</span>
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">{settings.marqueeNotice}</p>
          </div>
        </div>
        {pendingCount > 0 && (
          <span className="bg-red-500/20 text-red-400 font-bold text-xs px-3 py-1.5 rounded-full border border-red-500/30 animate-pulse">
            {pendingCount} টি রিকোয়েস্ট পেন্ডিং!
          </span>
        )}
      </div>

      {/* Real-time High-Value Deposit Alert Feed Center */}
      <HighValueAlertCenter />

      {/* Metric Cards Grid - Matching Immersive UI design specs (01, 02, 03, 04 numbers) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: আজকের ব্যবহারকারী */}
        <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 p-5 rounded-2xl shadow-[0_10px_30px_-15px_rgba(212,175,55,0.2)] relative overflow-hidden group hover:border-[#FFD700] transition-all">
          <div className="absolute top-0 right-0 p-2 opacity-10 italic font-black text-4xl text-[#FFD700] select-none">
            01
          </div>
          <div className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>আজকের ব্যবহারকারী</span>
            <Users className="w-4 h-4 text-[#FFD700]" />
          </div>
          <div className="text-3xl font-bold text-white font-mono mt-1">{todayUsersCount} জন</div>
          <div className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> +12% গত কাল থেকে নতুন রেজিস্টার্ড
          </div>
        </div>

        {/* Card 2: মোট লেনদেন */}
        <div className="bg-[#0f0f0f] border border-[#00BFFF]/30 p-5 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,191,255,0.2)] relative overflow-hidden group hover:border-[#00BFFF] transition-all">
          <div className="absolute top-0 right-0 p-2 opacity-10 italic font-black text-4xl text-[#00BFFF] select-none">
            02
          </div>
          <div className="text-[11px] text-[#00BFFF] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>মোট লেনদেন</span>
            <DollarSign className="w-4 h-4 text-[#00BFFF]" />
          </div>
          <div className="text-3xl font-bold text-white font-mono uppercase mt-1">
            ৳ {totalDepositSum.toLocaleString('en-US')}
          </div>
          <div className="text-[10px] text-[#00BFFF] mt-2 tracking-wider uppercase font-bold">
            PROCESSED TODAY
          </div>
        </div>

        {/* Card 3: সক্রিয় ব্যবহারকারী */}
        <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 p-5 rounded-2xl shadow-[0_10px_30px_-15px_rgba(212,175,55,0.2)] relative overflow-hidden group hover:border-[#FFD700] transition-all">
          <div className="absolute top-0 right-0 p-2 opacity-10 italic font-black text-4xl text-[#FFD700] select-none">
            03
          </div>
          <div className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>সক্রিয় ব্যবহারকারী</span>
            <UserCheck className="w-4 h-4 text-[#FFD700]" />
          </div>
          <div className="text-3xl font-bold text-white font-mono mt-1">{activeUsersCount} জন</div>
          <div className="text-[10px] text-amber-400 mt-2 tracking-wider uppercase font-bold">
            LIVE CURRENTLY
          </div>
        </div>

        {/* Card 4: পেন্ডিং রিকোয়েস্ট */}
        <div className="bg-[#0f0f0f] border border-[#00BFFF]/30 p-5 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,191,255,0.2)] relative overflow-hidden group hover:border-[#00BFFF] transition-all">
          <div className="absolute top-0 right-0 p-2 opacity-10 italic font-black text-4xl text-[#00BFFF] select-none">
            04
          </div>
          <div className="text-[11px] text-[#00BFFF] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>পেন্ডিং রিকোয়েস্ট</span>
            <Clock className="w-4 h-4 text-[#00BFFF]" />
          </div>
          <div className="text-3xl font-bold text-white font-mono mt-1">{pendingCount} টি</div>
          <div className="text-[10px] text-red-400 mt-2 font-bold">
            {pendingCount > 0 ? `${pendingCount} টি রিকোয়েস্ট রিভিউ প্রয়োজন` : 'সব রিকোয়েস্ট সম্পন্ন'}
          </div>
        </div>
      </div>

      {/* RECHARTS DAILY TRANSACTION TRENDS LINE CHART */}
      <div className="bg-gradient-to-b from-[#0f0f0f] to-[#050505] border border-[#D4AF37]/30 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#FFD700] to-[#00BFFF] mr-1 rounded-full shadow-[0_0_8px_#FFD700]" />
              <Activity className="w-5 h-5 text-[#FFD700]" />
              <span>দৈনিক লেনদেন প্রবণতা বিশ্লেষণ (Daily Transaction Trends)</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              ডিপোজিট (Deposit) ও উইথড্রয়াল (Withdrawal) এর তুলনামূলক সময়চিত্র
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick summary metrics */}
            <div className="hidden md:flex items-center gap-4 text-xs font-mono mr-2">
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl text-emerald-400">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>মোট ডিপোজিট: ৳{totalChartDeposits.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-xl text-purple-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>মোট উইথড্র: ৳{totalChartWithdrawals.toLocaleString()}</span>
              </div>
            </div>

            {/* Timeframe selector */}
            <div className="flex bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-xl p-1 text-xs font-bold shrink-0">
              <button
                onClick={() => setChartTimeframe('7d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartTimeframe === '7d'
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#9f7928] text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ৭ দিন (7 Days)
              </button>
              <button
                onClick={() => setChartTimeframe('30d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartTimeframe === '30d'
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#9f7928] text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ১৪ দিন (14 Days)
              </button>
            </div>
          </div>
        </div>

        {/* Recharts LineChart Component */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="depositGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="withdrawGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00BFFF" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />

              <XAxis
                dataKey="label"
                stroke="#888888"
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickLine={{ stroke: '#404040' }}
                axisLine={{ stroke: '#404040' }}
              />

              <YAxis
                stroke="#888888"
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickLine={{ stroke: '#404040' }}
                axisLine={{ stroke: '#404040' }}
                tickFormatter={(value) => `৳${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0a0a0a]/95 border border-[#D4AF37]/50 p-3 rounded-2xl shadow-2xl text-xs space-y-1.5 backdrop-blur-md">
                        <p className="font-bold text-[#FFD700] border-b border-white/10 pb-1">{label}</p>
                        {payload.map((entry, index) => (
                          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
                            <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color }}>
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                              {entry.name === 'deposits' ? 'ডিপোজিট (Deposit)' : 'উইথড্রয়াল (Withdrawal)'}:
                            </span>
                            <span className="font-mono font-bold text-white">
                              ৳{Number(entry.value).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
                formatter={(value) => (
                  <span className="text-gray-300 font-bold ml-1">
                    {value === 'deposits' ? 'ডিপোজিট (Deposits)' : 'উইথড্রয়াল (Withdrawals)'}
                  </span>
                )}
              />

              <Line
                type="monotone"
                dataKey="deposits"
                name="deposits"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4, strokeWidth: 2, stroke: '#050505' }}
                activeDot={{ r: 7, stroke: '#FFD700', strokeWidth: 2 }}
              />

              <Line
                type="monotone"
                dataKey="withdrawals"
                name="withdrawals"
                stroke="#00BFFF"
                strokeWidth={3}
                dot={{ fill: '#00BFFF', r: 4, strokeWidth: 2, stroke: '#050505' }}
                activeDot={{ r: 7, stroke: '#a855f7', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Content Split: Recent Transactions + System Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Transactions Table */}
        <div className="lg:col-span-2 bg-gradient-to-b from-[#0f0f0f] to-[#050505] rounded-3xl border border-white/10 p-6 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
              <span className="w-1.5 h-6 bg-[#FFD700] mr-3 rounded-full shadow-[0_0_8px_#FFD700]" />
              সাম্প্রতিক লেনদেন (Transactions)
            </h2>
            <span className="text-[10px] text-[#00BFFF] border border-[#00BFFF]/30 px-3 py-1 rounded-full uppercase tracking-tight font-mono">
              LIVE FEED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-3 font-medium">ব্যবহারকারী</th>
                  <th className="py-3 font-medium">ধরন</th>
                  <th className="py-3 font-medium">পরিমাণ</th>
                  <th className="py-3 font-medium">সময়</th>
                  <th className="py-3 font-medium text-right">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-white/5">
                {transactions.slice(0, 6).map((txn) => (
                  <tr key={txn.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[10px] font-bold text-[#FFD700]">
                          {txn.userName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white">{txn.userName}</div>
                          <div className="text-[10px] text-gray-400">{txn.userPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        txn.type === 'deposit' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {txn.paymentMethod} {txn.type}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-white font-mono italic text-sm">
                      ৳ {txn.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-xs text-gray-400 font-mono">
                      {txn.timestamp.substring(11, 16) || '10:40 AM'}
                    </td>
                    <td className="py-3.5 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                        txn.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        txn.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {txn.status === 'approved' ? 'সফল' : txn.status === 'pending' ? 'পেন্ডিং' : 'বাতিল'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: System Audit Logs */}
        <div className="bg-gradient-to-b from-[#0f0f0f] to-[#050505] rounded-3xl border border-white/10 p-6 flex flex-col shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <span className="w-1.5 h-6 bg-[#00BFFF] mr-3 rounded-full shadow-[0_0_8px_#00BFFF]" />
            সিস্টেম লগ (Audit)
          </h2>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-[360px] pr-1">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex space-x-3 items-start p-2 rounded-xl hover:bg-white/5 transition-all">
                <div className="w-2 h-2 rounded-full bg-[#00BFFF] mt-1.5 shadow-[0_0_5px_#00BFFF]" />
                <div className="flex-1">
                  <div className="text-[11px] text-[#00BFFF] uppercase font-bold tracking-wider">
                    {log.action}
                  </div>
                  <div className="text-xs text-gray-200 mt-0.5">{log.details}</div>
                  <div className="text-[9px] text-gray-500 mt-1 font-mono">{log.timestamp}</div>
                </div>
              </div>
            ))}

            <div className="mt-auto p-4 bg-[#FFD700]/5 rounded-2xl border border-[#D4AF37]/20">
              <div className="text-[10px] text-[#D4AF37] font-bold uppercase mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>মেইনটেন্যান্স মোড (Maintenance)</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-white">স্ট্যাটাস: <span className="font-bold text-emerald-400">সক্রিয় / রানিং</span></span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

