import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardOverview } from './DashboardOverview';
import { UserManagement } from './UserManagement';
import { TransactionManagement } from './TransactionManagement';
import { ContentManagement } from './ContentManagement';
import { AdminSettingsView } from './AdminSettings';
import { AuditLogsView } from './AuditLogsView';
import { HighValueAlertToast } from './HighValueAlertToast';
import { 
  LayoutDashboard, Users, CreditCard, Image, Settings, Terminal, 
  ArrowLeft, Copy, Check, ExternalLink, ShieldCheck, Sparkles, Bell, ShieldAlert, Zap
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { 
    setCurrentView, 
    kycRequests, 
    transactions, 
    adminNotifications,
    simulateHighValueDeposit,
    playChimeSound 
  } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'transactions' | 'content' | 'settings' | 'logs'>('dashboard');
  const [copiedLink, setCopiedLink] = useState(false);

  // Calculate unread high-value notifications count
  const unreadHighValueCount = adminNotifications.filter(n => (n.isHighValue || n.amount >= 2000) && !n.read).length;

  // Calculate direct link for admin
  const directAdminUrl = `${window.location.origin}${window.location.pathname}?view=admin`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directAdminUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const pendingTxnCount = transactions.filter(t => t.status === 'pending').length;
  const pendingKycCount = kycRequests.filter(k => k.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans flex flex-col md:flex-row border-t-4 border-[#FFD700]">
      {/* Real-Time Floating High Value Deposit Alert Toast */}
      <HighValueAlertToast />

      {/* Sidebar - Matching Immersive UI Design Preview Specs */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-[#D4AF37]/20 flex flex-col shrink-0">
        {/* Logo Section */}
        <div className="p-5 border-b border-[#D4AF37]/10 flex items-center justify-between md:block">
          <div>
            <div className="text-2xl font-black tracking-tighter italic bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#9f7928] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
              ROYAL ADMIN
            </div>
            <div className="text-[10px] text-[#00BFFF] font-bold tracking-[0.2em] uppercase mt-0.5">
              Management Suite
            </div>
          </div>

          <button
            onClick={() => setCurrentView('player')}
            className="md:hidden flex items-center gap-1 text-xs text-[#FFD700] bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>প্লেয়ার পোর্টাল</span>
          </button>
        </div>

        {/* Direct Link Banner Box */}
        <div className="p-3 mx-3 my-3 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-[#D4AF37]/30">
          <div className="text-[10px] text-[#FFD700] uppercase font-bold flex items-center justify-between">
            <span>আলাদা এডমিন ড্যাশবোর্ড লিংক</span>
            <Sparkles className="w-3 h-3 text-[#FFD700]" />
          </div>
          <div className="text-[11px] text-gray-300 font-mono line-clamp-1 mt-1 bg-[#050505] p-1.5 rounded border border-white/5">
            ?view=admin
          </div>
          <button
            onClick={handleCopyLink}
            className="w-full mt-2 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-[10px] font-bold py-1.5 px-2 rounded-lg border border-[#D4AF37]/30 flex items-center justify-center gap-1 transition-all"
          >
            {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copiedLink ? 'কপি হয়েছে!' : 'ডাইরেক্ট লিংক কপি করুন'}</span>
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          <div className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest px-2 mb-2 opacity-60">
            DASHBOARD
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-xs font-bold ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#FFD700] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="w-4 h-4 text-[#FFD700]" />
              <span>ড্যাশবোর্ড (Overview)</span>
            </div>
            {unreadHighValueCount > 0 && (
              <span className="text-[10px] bg-red-500 text-white font-black px-2 py-0.5 rounded-full animate-bounce shadow">
                {unreadHighValueCount} 🚨
              </span>
            )}
          </button>

          <div className="pt-4 pb-1">
            <div className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest px-2 mb-2 opacity-60">
              MANAGEMENT
            </div>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-xs font-bold ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#FFD700] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-[#00BFFF]" />
                <span>ইউজার ম্যানেজমেন্ট</span>
              </div>
              {pendingKycCount > 0 && (
                <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
                  {pendingKycCount} KYC
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('transactions')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-xs font-bold ${
                activeTab === 'transactions'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#FFD700] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-4 h-4 text-[#FFD700]" />
                <span>লেনদেন (Transactions)</span>
              </div>
              {pendingTxnCount > 0 && (
                <span className="text-[10px] bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30 px-2 py-0.5 rounded-full font-bold animate-pulse">
                  {pendingTxnCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-xs font-bold ${
                activeTab === 'content'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#FFD700] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <Image className="w-4 h-4 text-[#00BFFF]" />
              <span>কন্টেন্ট ও ছবি (Banners)</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-xs font-bold ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#FFD700] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-[#FFD700]" />
              <span>সিস্টেম সেটিংস</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-xs font-bold ${
                activeTab === 'logs'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#FFD700] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4 text-[#00BFFF]" />
              <span>সিকিউরিটি লগ</span>
            </button>
          </div>
        </nav>

        {/* Footer Admin Status */}
        <div className="p-4 border-t border-[#D4AF37]/10 mt-auto">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-3 rounded-xl border border-[#D4AF37]/20">
            <div className="text-[10px] text-[#D4AF37] uppercase font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Status</span>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              <div className="text-xs text-white font-bold">Superuser Active</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container Area */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6 bg-[radial-gradient(circle_at_top_right,_#001a33_0%,_#050505_40%)] min-h-screen">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a]/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl">
          <div className="space-y-0.5">
            <span className="text-[#00BFFF] font-bold text-[10px] uppercase tracking-[0.3em]">
              Control Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-light text-white">
              অ্যাডমিন{' '}
              <span className="font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                কন্ট্রোল সুইট
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('player')}
              className="hidden sm:flex items-center gap-1.5 bg-[#1a1a1a] text-[#FFD700] hover:bg-[#FFD700] hover:text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl border border-[#D4AF37]/30 transition-all shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>প্লেয়ার ভিউতে যান</span>
            </button>

            <div className="flex items-center space-x-3 bg-black/50 p-2 rounded-2xl border border-white/10">
              <div className="text-right pl-2">
                <div className="text-xs font-bold text-white">Super Admin</div>
                <div className="text-[10px] text-[#00BFFF]">Logged In</div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#9f7928] p-[1px]">
                <div className="w-full h-full bg-[#1a1a1a] rounded-xl flex items-center justify-center text-[#FFD700] font-bold text-sm">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Views */}
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'transactions' && <TransactionManagement />}
        {activeTab === 'content' && <ContentManagement />}
        {activeTab === 'settings' && <AdminSettingsView />}
        {activeTab === 'logs' && <AuditLogsView />}
      </main>
    </div>
  );
};
