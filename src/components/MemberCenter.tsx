import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BettingHistorySection } from './BettingHistorySection';
import { 
  RefreshCw, Edit3, Award, FileText, TrendingUp, ArrowDownCircle, ArrowUpCircle, 
  CreditCard, UserCheck, ShieldCheck, UserPlus, Target, RotateCcw, Mail, 
  MessageSquare, Download, Headphones, LogOut, CheckCircle2, ChevronRight, X
} from 'lucide-react';

export const MemberCenter: React.FC = () => {
  const { 
    currentUser, 
    setIsDepositModalOpen, 
    setIsWithdrawModalOpen, 
    setCurrentUser,
    betHistory,
    transactions
  } = useApp();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(currentUser.nickname);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const saveNickname = () => {
    setCurrentUser(prev => ({ ...prev, nickname: newNickname }));
    setIsEditingNickname(false);
  };

  const gridItems = [
    { id: 'reward', name: 'Reward Center', icon: Award, badge: '1', color: 'bg-amber-100 text-amber-800' },
    { id: 'bets', name: 'Betting Record', icon: FileText, color: 'bg-amber-100 text-amber-800' },
    { id: 'profit', name: 'Profit And Loss', icon: TrendingUp, color: 'bg-amber-100 text-amber-800' },
    { id: 'dep_record', name: 'Deposit Record', icon: ArrowDownCircle, color: 'bg-amber-100 text-amber-800' },
    { id: 'wd_record', name: 'Withdrawal Record', icon: ArrowUpCircle, color: 'bg-amber-100 text-amber-800' },
    { id: 'acc_record', name: 'Account Record', icon: CreditCard, color: 'bg-amber-100 text-amber-800' },
    { id: 'my_account', name: 'My Account', icon: UserCheck, color: 'bg-amber-100 text-amber-800' },
    { id: 'security', name: 'Security Center', icon: ShieldCheck, color: 'bg-amber-100 text-amber-800' },
    { id: 'invite', name: 'Invite Friends', icon: UserPlus, color: 'bg-amber-100 text-amber-800' },
    { id: 'mission', name: 'Mission', icon: Target, badge: '1', color: 'bg-amber-100 text-amber-800' },
    { id: 'rebate', name: 'Rebate', icon: RotateCcw, color: 'bg-amber-100 text-amber-800' },
    { id: 'message', name: 'Internal Message', icon: Mail, color: 'bg-amber-100 text-amber-800' },
    { id: 'suggestion', name: 'Suggestion', icon: MessageSquare, color: 'bg-amber-100 text-amber-800' },
    { id: 'download', name: 'Download APP', icon: Download, color: 'bg-amber-100 text-amber-800' },
    { id: 'service', name: 'Customer Service', icon: Headphones, color: 'bg-amber-100 text-amber-800' },
    { id: 'logout', name: 'Logout', icon: LogOut, color: 'bg-amber-100 text-amber-800' }
  ];

  return (
    <div className="max-w-md mx-auto px-3 py-4 pb-20">
      {/* Top Profile Card - Matching Screenshot 3 */}
      <div className="bg-gradient-to-b from-[#e8f1f1] to-[#d3e5e5] text-slate-900 rounded-2xl p-4 shadow-xl border border-white mb-4 relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
          <Award className="w-40 h-40 text-slate-800" />
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <img
            src={currentUser.avatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-amber-500 object-cover shadow-md"
          />

          <div className="flex flex-col flex-grow">
            <div className="flex items-center gap-2">
              <span className="bg-[#2a4d47] text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Award className="w-3 h-3" />
                VIP{currentUser.vipLevel}
              </span>
              <span className="font-mono font-bold text-sm text-slate-800">{currentUser.phone}</span>
            </div>

            <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-600 font-medium">
              <span>Nickname: {currentUser.nickname}</span>
              <button 
                onClick={() => setIsEditingNickname(true)}
                className="text-amber-700 hover:text-amber-900"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-[11px] text-slate-500 mt-0.5">
              Joined: {currentUser.joinedDate}
            </span>
          </div>
        </div>

        {/* Balance & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-300/80 flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-slate-900 font-mono">
                ৳ {currentUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <button
                onClick={handleRefresh}
                className={`text-slate-600 hover:text-slate-900 ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-3 gap-2 mt-3 relative z-10">
          <button
            onClick={() => setIsDepositModalOpen(true)}
            className="bg-[#2b514b] text-white font-bold text-xs py-2 rounded-xl text-center shadow hover:bg-[#1f3c37] active:scale-95 transition-all"
          >
            Deposit
          </button>
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="bg-white text-[#2b514b] border border-[#2b514b] font-bold text-xs py-2 rounded-xl text-center shadow hover:bg-slate-50 active:scale-95 transition-all"
          >
            Withdrawal
          </button>
          <button
            onClick={() => setActiveSubModal('My Cards')}
            className="bg-white text-[#2b514b] border border-[#2b514b] font-bold text-xs py-2 rounded-xl text-center shadow hover:bg-slate-50 active:scale-95 transition-all"
          >
            My Cards
          </button>
        </div>
      </div>

      {/* Member Center Title */}
      <div className="bg-[#032d29] border border-[#ffd700]/30 rounded-xl p-3 mb-4 shadow-md">
        <h3 className="text-amber-300 font-extrabold text-sm flex items-center gap-2">
          <UserCheck className="w-4 h-4" />
          <span>Member Center</span>
        </h3>
      </div>

      {/* Grid Menu Icons - Exactly matching Screenshot 3 */}
      <div className="grid grid-cols-4 gap-3 bg-[#022320] p-3 rounded-2xl border border-[#ffd700]/20 shadow-xl mb-5">
        {gridItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'logout') {
                  alert('Logged out successfully');
                } else {
                  setActiveSubModal(item.name);
                }
              }}
              className="relative flex flex-col items-center justify-start p-2 rounded-xl hover:bg-[#053b36] transition-all group"
            >
              {item.badge && (
                <span className="absolute top-0 right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
              <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shadow-md mb-1.5 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-amber-800" />
              </div>
              <span className="text-[10px] text-amber-100/90 font-medium text-center leading-tight">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Prominent Embedded Betting History Section */}
      <div id="betting-history-section">
        <BettingHistorySection />
      </div>

      {/* Edit Nickname Modal */}
      {isEditingNickname && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#032d29] border border-amber-400 p-5 rounded-2xl w-full max-w-sm text-slate-100 shadow-2xl">
            <h4 className="text-amber-300 font-bold text-base mb-3">Edit Nickname</h4>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="w-full bg-[#011a18] border border-amber-400/40 rounded-xl px-3 py-2 text-sm text-amber-100 mb-4 focus:outline-none focus:border-amber-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditingNickname(false)}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveNickname}
                className="bg-gold-button font-bold text-slate-950 text-xs px-4 py-1.5 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details SubModal */}
      {activeSubModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className={`bg-[#032d29] border border-amber-400 p-4 sm:p-5 rounded-2xl w-full text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto ${
            activeSubModal === 'Betting Record' || activeSubModal === 'Profit And Loss' ? 'max-w-2xl' : 'max-w-md'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-amber-400/30 mb-3">
              <h4 className="text-amber-300 font-bold text-base">{activeSubModal}</h4>
              <button onClick={() => setActiveSubModal(null)} className="text-amber-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SubModal Content based on tab */}
            {(activeSubModal === 'Betting Record' || activeSubModal === 'Profit And Loss') && (
              <BettingHistorySection />
            )}

            {activeSubModal === 'Deposit Record' && (
              <div className="space-y-2">
                {transactions.filter(t => t.type === 'deposit').map(t => (
                  <div key={t.id} className="bg-[#021f1c] p-2.5 rounded-lg text-xs border border-amber-400/20 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-amber-200">{t.paymentMethod} - {t.transactionId}</p>
                      <p className="text-[10px] text-slate-400">{t.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">+৳{t.amount}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        t.status === 'approved' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSubModal !== 'Betting Record' && activeSubModal !== 'Profit And Loss' && activeSubModal !== 'Deposit Record' && (
              <div className="py-6 text-center text-xs text-emerald-100">
                <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                <p className="font-bold text-amber-300 mb-1">{activeSubModal} Information Verified</p>
                <p className="text-slate-300">Your account is fully functional and secured with 256-bit encryption.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
