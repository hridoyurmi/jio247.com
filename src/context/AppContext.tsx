import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  User, Transaction, Game, Banner, Notice, KYCRequest, AdminSettings, AuditLog, GameCategory, BetRecord, AdminNotification, DepositSuccessToastData 
} from '../types';
import { 
  INITIAL_GAMES, INITIAL_BANNERS, INITIAL_NOTICES, INITIAL_USERS, 
  INITIAL_TRANSACTIONS, INITIAL_KYC, INITIAL_SETTINGS, INITIAL_AUDIT_LOGS,
  INITIAL_ADMIN_NOTIFICATIONS, INITIAL_BET_HISTORY 
} from '../data/mockData';
import { triggerDepositConfetti } from '../utils/confetti';

interface AppContextType {
  // Mode & Auth
  currentView: 'player' | 'admin';
  setCurrentView: (view: 'player' | 'admin') => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  activeCategory: GameCategory;
  setActiveCategory: (cat: GameCategory) => void;
  
  // Deposit Success Toast State
  depositSuccessToast: DepositSuccessToastData | null;
  setDepositSuccessToast: (data: DepositSuccessToastData | null) => void;
  
  // Data State
  games: Game[];
  banners: Banner[];
  notices: Notice[];
  users: User[];
  transactions: Transaction[];
  kycRequests: KYCRequest[];
  settings: AdminSettings;
  auditLogs: AuditLog[];
  betHistory: BetRecord[];
  
  // Real-Time High-Value Deposit Notifications
  adminNotifications: AdminNotification[];
  activeAlertToast: AdminNotification | null;
  soundAlertEnabled: boolean;
  setSoundAlertEnabled: (enabled: boolean) => void;
  highValueThreshold: number;
  setHighValueThreshold: (val: number) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  dismissActiveAlertToast: () => void;
  simulateHighValueDeposit: (customAmount?: number, customPhone?: string, customMethod?: any) => void;
  playChimeSound: () => void;
  
  // Modals & Drawers State
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  isDepositModalOpen: boolean;
  setIsDepositModalOpen: (open: boolean) => void;
  isWithdrawModalOpen: boolean;
  setIsWithdrawModalOpen: (open: boolean) => void;
  isSideDrawerOpen: boolean;
  setIsSideDrawerOpen: (open: boolean) => void;
  isAvatarModalOpen: boolean;
  setIsAvatarModalOpen: (open: boolean) => void;
  isGameLockModalOpen: boolean;
  setIsGameLockModalOpen: (open: boolean) => void;
  lockedGame: Game | null;
  setLockedGame: (game: Game | null) => void;
  activeGameToPlay: Game | null;
  setActiveGameToPlay: (game: Game | null) => void;
  activePlayerTab: 'home' | 'promotion' | 'invite' | 'reward' | 'member';
  setActivePlayerTab: (tab: 'home' | 'promotion' | 'invite' | 'reward' | 'member') => void;
  
  // Player Actions
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  addBetRecord: (record: Omit<BetRecord, 'id'>) => void;
  updateUserBalanceDelta: (amountChange: number) => void;
  placeBet: (gameName: string, amount: number, payoutMultiplier: number, isWin: boolean) => boolean;
  submitDeposit: (amount: number, method: any, accountNumber: string, txnId: string) => void;
  submitWithdrawal: (amount: number, method: any, accountNumber: string) => { success: boolean; message: string };
  toggleFavoriteGame: (gameId: string) => void;
  
  // Admin Actions
  approveTransaction: (txnId: string) => void;
  rejectTransaction: (txnId: string, reason?: string) => void;
  updateUserBalance: (userId: string, newBalance: number, note?: string) => void;
  updateUserStatus: (userId: string, status: 'active' | 'suspended' | 'frozen') => void;
  updateUserVip: (userId: string, vipLevel: number) => void;
  approveKYC: (kycId: string) => void;
  rejectKYC: (kycId: string) => void;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  toggleBannerActive: (bannerId: string) => void;
  deleteBanner: (bannerId: string) => void;
  updateMarqueeNotice: (text: string) => void;
  addAuditLog: (action: string, details: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'player' | 'admin'>('player');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cv666_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [currentUser, setCurrentUser] = useState<User>(() => users[0]);
  const [activeCategory, setActiveCategory] = useState<GameCategory>('hot');
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [kycRequests, setKycRequests] = useState<KYCRequest[]>(INITIAL_KYC);
  const [settings, setSettings] = useState<AdminSettings>(INITIAL_SETTINGS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [betHistory, setBetHistory] = useState<BetRecord[]>(INITIAL_BET_HISTORY);

  // Real-Time Admin Notifications & Alerts
  const [depositSuccessToast, setDepositSuccessToast] = useState<DepositSuccessToastData | null>(null);
  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>(INITIAL_ADMIN_NOTIFICATIONS);
  const [activeAlertToast, setActiveAlertToast] = useState<AdminNotification | null>(null);
  const [soundAlertEnabled, setSoundAlertEnabled] = useState<boolean>(true);
  const [highValueThreshold, setHighValueThreshold] = useState<number>(2000);

  // Audio Chime Generator using Web Audio API
  const playChimeSound = useCallback(() => {
    if (!soundAlertEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // First High Tone (880 Hz - A5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      gain1.gain.setValueAtTime(0.35, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);

      // Second Alert Tone (1046.5 Hz - C6)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0.4, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.65);
    } catch (e) {
      console.log('Audio chime trigger:', e);
    }
  }, [soundAlertEnabled]);

  const markNotificationRead = (id: string) => {
    setAdminNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setAdminNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setAdminNotifications([]);
  };

  const dismissActiveAlertToast = () => {
    setActiveAlertToast(null);
  };

  // Navigation Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isGameLockModalOpen, setIsGameLockModalOpen] = useState(false);
  const [lockedGame, setLockedGame] = useState<Game | null>(null);
  const [activeGameToPlay, setActiveGameToPlay] = useState<Game | null>(null);
  const [activePlayerTab, setActivePlayerTab] = useState<'home' | 'promotion' | 'invite' | 'reward' | 'member'>('home');

  // Helper function to update balance directly
  const updateUserBalanceDelta = (amountChange: number) => {
    setCurrentUser(prev => {
      const updated = { ...prev, balance: prev.balance + amountChange };
      setUsers(allUsers => allUsers.map(u => u.id === prev.id ? updated : u));
      return updated;
    });
  };

  // Helper function to add a bet record
  const addBetRecord = (record: Omit<BetRecord, 'id'>) => {
    const newRecord: BetRecord = {
      ...record,
      id: `BET-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    setBetHistory(prev => [newRecord, ...prev]);
  };

  // Sync users state with localStorage
  useEffect(() => {
    localStorage.setItem('cv666_users', JSON.stringify(users));
  }, [users]);

  // Keep currentUser synced if users list changes
  useEffect(() => {
    const found = users.find(u => u.id === currentUser.id);
    if (found) {
      setCurrentUser(found);
    }
  }, [users, currentUser.id]);

  // Player Place Bet
  const placeBet = (gameName: string, amount: number, payoutMultiplier: number, isWin: boolean): boolean => {
    if (currentUser.balance < amount) {
      return false;
    }

    const netChange = isWin ? (amount * payoutMultiplier - amount) : -amount;
    const payoutAmount = isWin ? amount * payoutMultiplier : 0;

    // Update currentUser and user list
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance + netChange,
      totalBets: currentUser.totalBets + amount
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    // Record bet
    const newBet: BetRecord = {
      id: `BET-${Date.now()}`,
      gameName,
      betAmount: amount,
      payout: payoutAmount,
      result: isWin ? 'win' : 'loss',
      timestamp: new Date().toLocaleTimeString('bn-BD')
    };
    setBetHistory(prev => [newBet, ...prev]);

    return true;
  };

  // Player Submit Deposit
  const submitDeposit = (amount: number, method: any, accountNumber: string, txnId: string) => {
    const generatedTxnId = txnId || `TXN${Math.floor(100000 + Math.random() * 900000)}`;
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.nickname,
      userPhone: currentUser.phone,
      type: 'deposit',
      amount,
      paymentMethod: method,
      accountNumber,
      transactionId: generatedTxnId,
      status: 'pending',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      note: amount >= highValueThreshold ? '🚨 High-Value Deposit Alert' : 'Deposit submitted by user'
    };

    setTransactions(prev => [newTxn, ...prev]);

    // Calculate 10% Welcome Bonus amount
    const bonusAmount = Math.floor(amount * (settings.depositBonusPercent || 10) / 100);

    // Set Success Toast state and trigger celebratory confetti animation
    setDepositSuccessToast({
      amount,
      method,
      txnId: generatedTxnId,
      senderAccount: accountNumber,
      bonusAmount,
      timestamp: new Date().toLocaleTimeString()
    });
    triggerDepositConfetti();

    // High-value deposit real-time alert trigger
    if (amount >= highValueThreshold) {
      const isHigh = true;
      const notif: AdminNotification = {
        id: `NOTIF-${Date.now()}`,
        type: 'high_value_deposit',
        title: '🚨 হাই-ভ্যালু ডিপোজিট অ্যালার্ট!',
        message: `${currentUser.nickname} (${currentUser.phone}) ${method} এর মাধ্যমে ৳${amount.toLocaleString()} জমার অনুরোধ করেছেন।`,
        amount,
        userPhone: currentUser.phone,
        userName: currentUser.nickname,
        txnId: generatedTxnId,
        paymentMethod: method,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        read: false,
        isHighValue: isHigh
      };

      setAdminNotifications(prev => [notif, ...prev]);
      setActiveAlertToast(notif);
      playChimeSound();
    }

    setIsDepositModalOpen(false);
  };

  // Admin Simulator for testing real-time high-value deposit alerts
  const simulateHighValueDeposit = (customAmount?: number, customPhone?: string, customMethod?: any) => {
    const sampleAmounts = [5000, 10000, 15000, 25000, 50000];
    const amount = customAmount || sampleAmounts[Math.floor(Math.random() * sampleAmounts.length)];
    const phone = customPhone || `017${Math.floor(10000000 + Math.random() * 90000000)}`;
    const method = customMethod || (['bKash', 'Nagad', 'Rocket'][Math.floor(Math.random() * 3)]);
    const mockTxnId = `SIM-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTxn: Transaction = {
      id: `TXN-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: `u-sim-${Math.floor(100 + Math.random() * 900)}`,
      userName: `VIP User ${phone.slice(-4)}`,
      userPhone: phone,
      type: 'deposit',
      amount,
      paymentMethod: method,
      accountNumber: phone,
      transactionId: mockTxnId,
      status: 'pending',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      note: 'Simulated High-Value Realtime Test'
    };

    setTransactions(prev => [newTxn, ...prev]);

    const notif: AdminNotification = {
      id: `NOTIF-${Date.now()}`,
      type: 'high_value_deposit',
      title: '⚡ রিয়েল-টাইম হাই-ভ্যালু ডিপোজিট!',
      message: `ইউজার (${phone}) ${method} এর মাধ্যমে ৳${amount.toLocaleString()} জমার টেস্ট রিকোয়েস্ট পাঠিয়েছে।`,
      amount,
      userPhone: phone,
      userName: newTxn.userName,
      txnId: mockTxnId,
      paymentMethod: method,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      read: false,
      isHighValue: true
    };

    setAdminNotifications(prev => [notif, ...prev]);
    setActiveAlertToast(notif);
    playChimeSound();
  };

  // Player Submit Withdrawal
  const submitWithdrawal = (amount: number, method: any, accountNumber: string) => {
    if (currentUser.balance < amount) {
      return { success: false, message: 'পর্যাপ্ত ব্যালেন্স নেই (Insufficient Balance)' };
    }
    if (amount < settings.minWithdraw) {
      return { success: false, message: `সর্বনিম্ন উত্তোলন ৳${settings.minWithdraw}` };
    }

    // Deduct balance immediately for pending withdrawal
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance - amount
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTxn: Transaction = {
      id: `WD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.nickname,
      userPhone: currentUser.phone,
      type: 'withdrawal',
      amount,
      paymentMethod: method,
      accountNumber,
      status: 'pending',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      note: 'Withdrawal request pending admin approval'
    };

    setTransactions(prev => [newTxn, ...prev]);
    setIsWithdrawModalOpen(false);
    return { success: true, message: 'উত্তোলন অনুরোধ সফলভাবে পাঠানো হয়েছে!' };
  };

  // Favorite toggle
  const toggleFavoriteGame = (gameId: string) => {
    setGames(prev => prev.map(g => g.id === gameId ? { ...g, isFavorite: !g.isFavorite } : g));
  };

  // Admin Actions
  const approveTransaction = (txnId: string) => {
    const targetTxn = transactions.find(t => t.id === txnId);
    if (!targetTxn || targetTxn.status !== 'pending') return;

    setTransactions(prev => prev.map(t => t.id === txnId ? { ...t, status: 'approved' } : t));

    // Update player balance if deposit
    if (targetTxn.type === 'deposit') {
      const bonus = (targetTxn.amount * settings.depositBonusPercent) / 100;
      const totalCredit = targetTxn.amount + bonus;

      setUsers(prev => prev.map(u => {
        if (u.id === targetTxn.userId) {
          return {
            ...u,
            balance: u.balance + totalCredit,
            totalDeposit: u.totalDeposit + targetTxn.amount
          };
        }
        return u;
      }));
    } else if (targetTxn.type === 'withdrawal') {
      // Balance was already deducted upon withdrawal request. Just record totalWithdraw
      setUsers(prev => prev.map(u => {
        if (u.id === targetTxn.userId) {
          return {
            ...u,
            totalWithdraw: u.totalWithdraw + targetTxn.amount
          };
        }
        return u;
      }));
    }

    addAuditLog('Approve Transaction', `Approved ${targetTxn.type} of ৳${targetTxn.amount} for ${targetTxn.userPhone}`);
  };

  const rejectTransaction = (txnId: string, reason: string = 'Administrative decision') => {
    const targetTxn = transactions.find(t => t.id === txnId);
    if (!targetTxn || targetTxn.status !== 'pending') return;

    setTransactions(prev => prev.map(t => t.id === txnId ? { ...t, status: 'rejected', note: reason } : t));

    // Refund player balance if rejected withdrawal
    if (targetTxn.type === 'withdrawal') {
      setUsers(prev => prev.map(u => {
        if (u.id === targetTxn.userId) {
          return {
            ...u,
            balance: u.balance + targetTxn.amount
          };
        }
        return u;
      }));
    }

    addAuditLog('Reject Transaction', `Rejected ${targetTxn.type} of ৳${targetTxn.amount} for ${targetTxn.userPhone}`);
  };

  const updateUserBalance = (userId: string, newBalance: number, note: string = 'Manual adjustment') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, balance: newBalance } : u));
    addAuditLog('User Balance Updated', `Updated balance for ${userId} to ৳${newBalance} (${note})`);
  };

  const updateUserStatus = (userId: string, status: 'active' | 'suspended' | 'frozen') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    addAuditLog('User Status Changed', `Changed user ${userId} status to ${status}`);
  };

  const updateUserVip = (userId: string, vipLevel: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, vipLevel } : u));
    addAuditLog('VIP Tier Changed', `Set user ${userId} VIP level to ${vipLevel}`);
  };

  const approveKYC = (kycId: string) => {
    setKycRequests(prev => prev.map(k => k.id === kycId ? { ...k, status: 'approved' } : k));
    const request = kycRequests.find(k => k.id === kycId);
    if (request) {
      setUsers(prev => prev.map(u => u.id === request.userId ? { ...u, isKycVerified: true, kycStatus: 'approved' } : u));
    }
    addAuditLog('KYC Approved', `Approved KYC request ${kycId}`);
  };

  const rejectKYC = (kycId: string) => {
    setKycRequests(prev => prev.map(k => k.id === kycId ? { ...k, status: 'rejected' } : k));
    const request = kycRequests.find(k => k.id === kycId);
    if (request) {
      setUsers(prev => prev.map(u => u.id === request.userId ? { ...u, isKycVerified: false, kycStatus: 'rejected' } : u));
    }
    addAuditLog('KYC Rejected', `Rejected KYC request ${kycId}`);
  };

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.marqueeNotice) {
        setNotices(n => n.map(item => ({ ...item, text: newSettings.marqueeNotice! })));
      }
      return updated;
    });
    addAuditLog('Settings Updated', 'Admin modified system settings');
  };

  const addBanner = (banner: Omit<Banner, 'id'>) => {
    const newB: Banner = {
      ...banner,
      id: `banner-${Date.now()}`
    };
    setBanners(prev => [newB, ...prev]);
    addAuditLog('Banner Added', `Added banner ${banner.title}`);
  };

  const toggleBannerActive = (bannerId: string) => {
    setBanners(prev => prev.map(b => b.id === bannerId ? { ...b, active: !b.active } : b));
  };

  const deleteBanner = (bannerId: string) => {
    setBanners(prev => prev.filter(b => b.id !== bannerId));
  };

  const updateMarqueeNotice = (text: string) => {
    setSettings(prev => ({ ...prev, marqueeNotice: text }));
    setNotices(prev => prev.map(n => ({ ...n, text })));
  };

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      adminName: 'Super Admin',
      action,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        activeCategory,
        setActiveCategory,
        depositSuccessToast,
        setDepositSuccessToast,
        games,
        banners,
        notices,
        users,
        transactions,
        kycRequests,
        settings,
        auditLogs,
        betHistory,
        adminNotifications,
        activeAlertToast,
        soundAlertEnabled,
        setSoundAlertEnabled,
        highValueThreshold,
        setHighValueThreshold,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        dismissActiveAlertToast,
        simulateHighValueDeposit,
        playChimeSound,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isDepositModalOpen,
        setIsDepositModalOpen,
        isWithdrawModalOpen,
        setIsWithdrawModalOpen,
        isSideDrawerOpen,
        setIsSideDrawerOpen,
        isAvatarModalOpen,
        setIsAvatarModalOpen,
        isGameLockModalOpen,
        setIsGameLockModalOpen,
        lockedGame,
        setLockedGame,
        user: currentUser,
        setUser: setCurrentUser,
        addBetRecord,
        updateUserBalanceDelta,
        activeGameToPlay,
        setActiveGameToPlay,
        activePlayerTab,
        setActivePlayerTab,
        placeBet,
        submitDeposit,
        submitWithdrawal,
        toggleFavoriteGame,
        approveTransaction,
        rejectTransaction,
        updateUserBalance,
        updateUserStatus,
        updateUserVip,
        approveKYC,
        rejectKYC,
        updateSettings,
        addBanner,
        toggleBannerActive,
        deleteBanner,
        updateMarqueeNotice,
        addAuditLog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
