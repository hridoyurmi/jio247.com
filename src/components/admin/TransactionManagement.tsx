import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, X, Search, DollarSign, Clock, ArrowDownRight, ArrowUpRight, Filter } from 'lucide-react';

export const TransactionManagement: React.FC = () => {
  const { transactions, approveTransaction, rejectTransaction } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'withdrawal'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchPhone, setSearchPhone] = useState('');
  const [rejectNoteModal, setRejectNoteModal] = useState<{ id: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filtered = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (searchPhone && !t.userPhone.includes(searchPhone) && !t.id.toLowerCase().includes(searchPhone.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleConfirmReject = () => {
    if (rejectNoteModal) {
      rejectTransaction(rejectNoteModal.id, rejectReason || 'অ্যাডমিন নির্দেশনায় বাতিল');
      setRejectNoteModal(null);
      setRejectReason('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#FFD700]" />
            <span>লেনদেন ব্যবস্থাপনা (Transaction Suite)</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            সকল ডিপোজিট ও উইথড্রয়াল রিকোয়েস্ট সরাসরি নিয়ন্ত্রণ করুন
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Type Filter */}
          <div className="flex bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-xl p-1 text-xs font-bold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterType === 'all' ? 'bg-[#FFD700] text-slate-950 shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              সকল
            </button>
            <button
              onClick={() => setFilterType('deposit')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterType === 'deposit' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              ডিপোজিট
            </button>
            <button
              onClick={() => setFilterType('withdrawal')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterType === 'withdrawal' ? 'bg-purple-500 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              উইথড্রয়াল
            </button>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e: any) => setFilterStatus(e.target.value)}
            className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-[#FFD700]"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="pending">পেন্ডিং (Pending)</option>
            <option value="approved">অনুমোদিত (Approved)</option>
            <option value="rejected">বাতিলকৃত (Rejected)</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#00BFFF] absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="ফোন নম্বর বা ট্রানজেকশন আইডি দিয়ে খুঁজুন..."
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-[#00BFFF]/30 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00BFFF]"
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050505] text-[#FFD700] font-bold uppercase border-b border-[#D4AF37]/20">
              <tr>
                <th className="p-3.5">ID / সময়</th>
                <th className="p-3.5">ব্যবহারকারী</th>
                <th className="p-3.5">ধরন & মেথড</th>
                <th className="p-3.5">পরিমাণ (৳)</th>
                <th className="p-3.5">TxID / একাউন্ট</th>
                <th className="p-3.5">স্ট্যাটাস</th>
                <th className="p-3.5 text-right">অ্যাকশন (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filtered.length > 0 ? (
                filtered.map(txn => (
                  <tr key={txn.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono">
                      <div className="font-bold text-white">{txn.id}</div>
                      <div className="text-[10px] text-gray-400">{txn.timestamp}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-[#FFD700]">{txn.userName}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{txn.userPhone}</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${
                        txn.type === 'deposit' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      }`}>
                        {txn.type === 'deposit' ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                        {txn.paymentMethod} {txn.type}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-white text-sm">
                      ৳ {txn.amount.toLocaleString()}
                    </td>
                    <td className="p-3.5 font-mono">
                      <div className="text-white font-bold">{txn.transactionId || 'N/A'}</div>
                      <div className="text-[10px] text-gray-400">{txn.accountNumber || 'N/A'}</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        txn.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        txn.status === 'pending' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {txn.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => approveTransaction(txn.id)}
                            className="bg-emerald-500 text-slate-950 font-black px-3 py-1.5 rounded-lg text-[11px] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 shadow-md"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>অনুমোদন</span>
                          </button>
                          <button
                            onClick={() => setRejectNoteModal({ id: txn.id })}
                            className="bg-red-600/80 hover:bg-red-600 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] active:scale-95 transition-all flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>বাতিল</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-500 italic">সম্পন্ন</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    কোনো লেনদেন পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border-2 border-red-500/50 p-5 rounded-2xl w-full max-w-md text-white shadow-2xl">
            <h3 className="text-red-400 font-bold text-base mb-2">রিকোয়েস্ট বাতিলের কারণ বলুন</h3>
            <p className="text-xs text-gray-400 mb-3">
              যে কারণে এই রিকোয়েস্টটি বাতিল করা হচ্ছে তা লিখুন (ব্যবহারকারী দেখতে পাবে):
            </p>
            <input
              type="text"
              placeholder="যেমন: ভুল ট্রানজেকশন আইডি বা টাকা জমা হয়নি"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-[#050505] border border-red-500/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-400 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectNoteModal(null)}
                className="px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                বাতিল করুন
              </button>
              <button
                onClick={handleConfirmReject}
                className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-red-500 transition-colors"
              >
                কনফার্ম রিজেক্ট (Confirm)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
