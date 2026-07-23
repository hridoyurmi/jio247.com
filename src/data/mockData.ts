import { Game, Banner, Notice, User, Transaction, KYCRequest, AdminSettings, AuditLog, AdminNotification, BetRecord, AvatarOption, LiveOddsMatch } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'super-ace',
    name: 'Super Ace',
    category: 'slots',
    provider: 'JILI',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    badge: 'HOT',
    hot: true,
    playType: 'slot',
    minBet: 10,
    rtp: '97.2%'
  },
  {
    id: 'pg-mahjong-ways-2',
    name: 'Mahjong Ways 2 (PG Soft)',
    category: 'slots',
    provider: 'PG Soft',
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80',
    badge: 'PG JACKPOT',
    hot: true,
    playType: 'slot',
    minBet: 20,
    rtp: '97.8%'
  },
  {
    id: 'fastspin-gold-rush',
    name: 'FastSpin Gold Rush Mega Jackpot',
    category: 'slots',
    provider: 'FAST SPIN',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80',
    badge: 'FAST SPIN 5000X',
    hot: true,
    playType: 'fastspin',
    minBet: 25,
    rtp: '98.1%'
  },
  {
    id: 'fastspin-speed-dragon',
    name: 'FastSpin Speed Dragon Multiplier',
    category: 'slots',
    provider: 'FAST SPIN',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    badge: 'FAST SPIN',
    hot: true,
    playType: 'fastspin',
    minBet: 15,
    rtp: '97.5%'
  },
  {
    id: 'pg-fortune-ox',
    name: 'Fortune Ox (PG Soft)',
    category: 'slots',
    provider: 'PG Soft',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    badge: 'SUPER WIN',
    hot: true,
    playType: 'slot',
    minBet: 10,
    rtp: '96.75%'
  },
  {
    id: 'flyx',
    name: 'FlyX Crash Game',
    category: 'hot',
    provider: 'Microgaming',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    hot: true,
    playType: 'aviator',
    minBet: 50,
    rtp: '98.5%'
  },
  {
    id: 'aviator',
    name: 'Aviator Real Crash',
    category: 'hot',
    provider: 'Spribe',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
    badge: 'CRASH',
    hot: true,
    playType: 'aviator',
    minBet: 20,
    rtp: '97.0%'
  },
  {
    id: 'vr-cricket-stadium',
    name: 'Virtual Reality 3D Cricket League',
    category: 'virtual',
    provider: 'Spribe',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
    badge: 'VR 3D SIM',
    hot: true,
    playType: 'vr',
    minBet: 50,
    rtp: '98.0%'
  },
  {
    id: 'vr-football-world-cup',
    name: 'VR Virtual Football Championship',
    category: 'virtual',
    provider: 'EVO',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    badge: 'VR REALITY',
    hot: true,
    playType: 'vr',
    minBet: 100,
    rtp: '97.8%'
  },
  {
    id: 'sports-cricket-live',
    name: 'Live Odds Cricket - Bangladesh vs India T20',
    category: 'sports',
    provider: 'Spribe',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
    badge: 'LIVE ODDS',
    hot: true,
    playType: 'sports_live',
    minBet: 100,
    rtp: '96.0%'
  },
  {
    id: 'sports-football-live',
    name: 'Live Odds Football - Real Madrid vs Barcelona',
    category: 'sports',
    provider: 'Spribe',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    badge: 'EL CLASICO',
    hot: true,
    playType: 'sports_live',
    minBet: 100,
    rtp: '96.5%'
  },
  {
    id: 'sports-tennis-live',
    name: 'Live Odds Tennis - Wimbledon Finals 2026',
    category: 'sports',
    provider: 'EVO',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=600&q=80',
    badge: 'GRAND SLAM',
    hot: true,
    playType: 'sports_live',
    minBet: 50,
    rtp: '96.2%'
  },
  {
    id: 'wild-bounty',
    name: 'Wild Bounty Showdown (PG Soft)',
    category: 'slots',
    provider: 'PG Soft',
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80',
    badge: 'PG TOP',
    hot: true,
    playType: 'slot',
    minBet: 15,
    rtp: '96.5%'
  },
  {
    id: 'live-roulette',
    name: 'European VIP Roulette 24/7',
    category: 'casino',
    provider: 'EVO',
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80',
    badge: 'LIVE HD',
    hot: true,
    playType: 'roulette',
    minBet: 50,
    rtp: '97.3%'
  }
];

export const INITIAL_AVATARS: AvatarOption[] = [
  { id: 'tiger', name: 'রাজকীয় বাঘ (Tiger King)', icon: '🐯', badge: 'ROYAL VIP' },
  { id: 'dragon', name: 'গোল্ডেন ড্রাগন (Golden Dragon)', icon: '🐲', badge: 'JACKPOT' },
  { id: 'queen', name: 'রয়্যাল কুইন (Royal Queen)', icon: '👑', badge: 'DIAMOND' },
  { id: 'highroller', name: 'ভিআইপি গেমিং বস (VIP High Roller)', icon: '💎', badge: 'HIGH ROLLER' },
  { id: 'cricket', name: 'ক্রিকেট সুপারস্টার (Cricket Legend)', icon: '🏏', badge: 'SPORTS HERO' },
  { id: 'aviator', name: 'এভিয়েটর পাইলট (Aviator Ace)', icon: '✈️', badge: 'CRASH ACE' }
];

export const INITIAL_LIVE_ODDS: LiveOddsMatch[] = [
  {
    id: 'm1',
    sport: 'cricket',
    tournament: 'T20 International Championship',
    team1: '🇧🇩 Bangladesh',
    team2: '🇮🇳 India',
    score: 'BAN 178/4 (18.2 OV)',
    status: 'LIVE',
    oddsTeam1: 2.15,
    oddsTeam2: 1.72,
    hotMatch: true
  },
  {
    id: 'm2',
    sport: 'cricket',
    tournament: 'Bangladesh Premier League (BPL)',
    team1: 'Dhaka Dominators',
    team2: 'Comilla Victorians',
    score: 'COM 142/2 (15.0 OV)',
    status: 'LIVE',
    oddsTeam1: 1.90,
    oddsTeam2: 1.90,
    hotMatch: true
  },
  {
    id: 'm3',
    sport: 'football',
    tournament: 'UEFA Champions League Finals',
    team1: 'Real Madrid',
    team2: 'FC Barcelona',
    score: '2 - 1 (68 min)',
    status: 'LIVE',
    oddsTeam1: 1.85,
    oddsDraw: 3.40,
    oddsTeam2: 3.90,
    hotMatch: true
  },
  {
    id: 'm4',
    sport: 'football',
    tournament: 'English Premier League',
    team1: 'Manchester City',
    team2: 'Arsenal FC',
    score: '0 - 0 (32 min)',
    status: 'LIVE',
    oddsTeam1: 1.65,
    oddsDraw: 3.80,
    oddsTeam2: 4.50,
    hotMatch: false
  },
  {
    id: 'm5',
    sport: 'tennis',
    tournament: 'Wimbledon Grand Slam 2026',
    team1: 'Novak Djokovic',
    team2: 'Carlos Alcaraz',
    score: 'Set 2 (6-4, 3-2)',
    status: 'LIVE',
    oddsTeam1: 1.95,
    oddsTeam2: 1.85,
    hotMatch: true
  },
  {
    id: 'm6',
    sport: 'virtual',
    tournament: 'VR 3D Virtual World Cup',
    team1: 'VR Argentina 3D',
    team2: 'VR Brazil 3D',
    score: '1 - 1 (VR SIM 80")',
    status: 'VR SIMULATION',
    oddsTeam1: 2.10,
    oddsDraw: 3.20,
    oddsTeam2: 2.25,
    hotMatch: true
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'Jio247 নতুন সদস্য সংবর্ধনা',
    subtitle: '১০০% স্বাগতম বোনাস পান আপনার প্রথম ডিপোজিটে! বিকাশ ও নগদে দ্রুত ডিপোজিট।',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    tag: 'WELCOME BONUS',
    active: true
  },
  {
    id: 'b2',
    title: 'বিশ্বকাপ ফুটবল মেগা বেটিং স্পেশাল',
    subtitle: 'আর্জেন্টিনা ও আন্তর্জাতিক সব লিগে সর্বোচ্চ ওডস ও ১৫% ডিপোজিট বোনাস!',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    tag: 'SPORTS PROMO',
    active: true
  },
  {
    id: 'b3',
    title: 'bKash & Nagad ১০% ক্যাশব্যাক',
    subtitle: 'প্রতিটি ডিপোজিটে পান ইনস্ট্যান্ট ১০% অতিরিক্ত বোনাস ব্যালেন্স!',
    imageUrl: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=1200&q=80',
    tag: 'DEPOSIT OFFER',
    active: true
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    text: 'স্বাগতম CV666.COM-এ! বিকাশ, নগদ ও রকেটের মাধ্যমে মাত্র ১ মিনিটে ডিপোজিট ও ১০ মিনিটে উত্তোলন করুন। ২৪/৭ কাস্টমার সার্ভিস চালু আছে।',
    active: true,
    date: '2026-07-23'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u-101',
    phone: '01627359683',
    nickname: '01627359683',
    balance: 12500.00,
    vipLevel: 1,
    isKycVerified: true,
    kycStatus: 'approved',
    status: 'active',
    joinedDate: '2026-06-28',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    totalDeposit: 25000,
    totalWithdraw: 12500,
    totalBets: 89000,
    refCode: 'CV666-88'
  },
  {
    id: 'u-102',
    phone: '01711223344',
    nickname: 'ProGambler99',
    balance: 45000.00,
    vipLevel: 3,
    isKycVerified: true,
    kycStatus: 'approved',
    status: 'active',
    joinedDate: '2026-05-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    totalDeposit: 100000,
    totalWithdraw: 55000,
    totalBets: 420000,
    refCode: 'CV666-99'
  },
  {
    id: 'u-103',
    phone: '01899887766',
    nickname: 'RahimKhan',
    balance: 850.00,
    vipLevel: 0,
    isKycVerified: false,
    kycStatus: 'pending',
    status: 'active',
    joinedDate: '2026-07-20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    totalDeposit: 1000,
    totalWithdraw: 150,
    totalBets: 4500,
    refCode: 'CV666-12'
  },
  {
    id: 'u-104',
    phone: '01912345678',
    nickname: 'LuckyStar',
    balance: 0.00,
    vipLevel: 0,
    isKycVerified: false,
    kycStatus: 'none',
    status: 'suspended',
    joinedDate: '2026-07-22',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    totalDeposit: 0,
    totalWithdraw: 0,
    totalBets: 0,
    refCode: 'CV666-03'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-8801',
    userId: 'u-101',
    userName: '01627359683',
    userPhone: '01627359683',
    type: 'deposit',
    amount: 5000,
    paymentMethod: 'bKash',
    accountNumber: '01627359683',
    transactionId: 'BK9X8229A1',
    status: 'approved',
    timestamp: '2026-07-23 08:15:00',
    note: 'Instant Agent Cash In'
  },
  {
    id: 'TXN-8802',
    userId: 'u-102',
    userName: 'ProGambler99',
    userPhone: '01711223344',
    type: 'deposit',
    amount: 10000,
    paymentMethod: 'Nagad',
    accountNumber: '01711223344',
    transactionId: 'NG772183C9',
    status: 'approved',
    timestamp: '2026-07-23 07:40:12',
    note: 'Auto Verified'
  },
  {
    id: 'TXN-8803',
    userId: 'u-103',
    userName: 'RahimKhan',
    userPhone: '01899887766',
    type: 'deposit',
    amount: 1000,
    paymentMethod: 'bKash',
    accountNumber: '01899887766',
    transactionId: 'BK339218Z2',
    status: 'pending',
    timestamp: '2026-07-23 08:25:10',
    note: 'Pending Admin Cash Check'
  },
  {
    id: 'TXN-8804',
    userId: 'u-101',
    userName: '01627359683',
    userPhone: '01627359683',
    type: 'withdrawal',
    amount: 2000,
    paymentMethod: 'bKash',
    accountNumber: '01627359683',
    transactionId: 'WD-09921',
    status: 'pending',
    timestamp: '2026-07-23 08:30:00',
    note: 'Payout to Personal bKash Personal'
  }
];

export const INITIAL_KYC: KYCRequest[] = [
  {
    id: 'KYC-01',
    userId: 'u-103',
    userName: 'RahimKhan',
    userPhone: '01899887766',
    nidNumber: '1998273849102',
    submittedAt: '2026-07-23 06:12:00',
    status: 'pending'
  }
];

export const INITIAL_SETTINGS: AdminSettings = {
  siteName: 'Jio247.com',
  bkashAgentNumber: '01700000000',
  nagadAgentNumber: '01800000000',
  rocketAgentNumber: '01900000000',
  upayAgentNumber: '01600000000',
  minDeposit: 100,
  maxDeposit: 50000,
  minWithdraw: 500,
  maxWithdraw: 100000,
  depositBonusPercent: 10,
  maintenanceMode: false,
  marqueeNotice: 'স্বাগতম Jio247.com-এ! বিকাশ, নগদ ও রকেটের মাধ্যমে মাত্র ১ মিনিটে ডিপোজিট ও ১০ মিনিটে উত্তোলন করুন।',
  supportPhone: '01700000000'
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-1',
    adminName: 'Super Admin',
    action: 'Approved Deposit',
    details: 'Approved ৳5,000 bKash Deposit for 01627359683',
    timestamp: '2026-07-23 08:15:05'
  },
  {
    id: 'LOG-2',
    adminName: 'Super Admin',
    action: 'Updated Settings',
    details: 'Changed bKash agent number to 01700000000',
    timestamp: '2026-07-23 07:00:10'
  }
];

export const INITIAL_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'NOTIF-101',
    type: 'high_value_deposit',
    title: '🚨 নতুন হাই-ভ্যালু ডিপোজিট অনুরোধ!',
    message: 'ProGambler99 (01711223344) নগদ থেকে ৳15,000 জমা দেওয়ার অনুরোধ করেছে।',
    amount: 15000,
    userPhone: '01711223344',
    userName: 'ProGambler99',
    txnId: 'NG772183C9',
    paymentMethod: 'Nagad',
    timestamp: '2026-07-23 08:35:10',
    read: false,
    isHighValue: true
  },
  {
    id: 'NOTIF-102',
    type: 'high_value_deposit',
    title: '🔥 হাই-ভ্যালু ডিপোজিট অ্যালার্ট!',
    message: 'VIP1 ইউজার (01627359683) বিকাশ থেকে ৳8,500 জমার আবেদন জানিয়েছে।',
    amount: 8500,
    userPhone: '01627359683',
    userName: '01627359683',
    txnId: 'BK9X99201A',
    paymentMethod: 'bKash',
    timestamp: '2026-07-23 08:40:00',
    read: false,
    isHighValue: true
  }
];

export const INITIAL_BET_HISTORY: BetRecord[] = [
  { id: 'BET-101', gameName: 'Aviator', betAmount: 200, payout: 480, result: 'win', timestamp: '2026-07-23 09:12:00' },
  { id: 'BET-102', gameName: 'Super Ace', betAmount: 100, payout: 0, result: 'loss', timestamp: '2026-07-23 08:30:15' },
  { id: 'BET-103', gameName: 'Fortune Ace', betAmount: 150, payout: 320, result: 'win', timestamp: '2026-07-22 21:45:10' },
  { id: 'BET-104', gameName: 'Wild Bounty Showdown', betAmount: 300, payout: 0, result: 'loss', timestamp: '2026-07-22 18:20:00' },
  { id: 'BET-105', gameName: 'Aviator', betAmount: 500, payout: 1250, result: 'win', timestamp: '2026-07-21 15:10:00' },
  { id: 'BET-106', gameName: 'World Football Live', betAmount: 400, payout: 880, result: 'win', timestamp: '2026-07-20 22:00:00' },
  { id: 'BET-107', gameName: 'Super Ace', betAmount: 250, payout: 0, result: 'loss', timestamp: '2026-07-20 14:12:30' },
  { id: 'BET-108', gameName: 'Aviator', betAmount: 300, payout: 750, result: 'win', timestamp: '2026-07-19 19:05:00' },
  { id: 'BET-109', gameName: 'Mighty Mania', betAmount: 150, payout: 0, result: 'loss', timestamp: '2026-07-18 11:30:00' },
  { id: 'BET-110', gameName: 'FlyX', betAmount: 200, payout: 420, result: 'win', timestamp: '2026-07-17 16:40:00' },
  { id: 'BET-111', gameName: 'Fortune Ace', betAmount: 500, payout: 0, result: 'loss', timestamp: '2026-07-16 20:15:00' },
  { id: 'BET-112', gameName: 'Super Ace', betAmount: 1000, payout: 2400, result: 'win', timestamp: '2026-07-15 13:22:00' },
  { id: 'BET-113', gameName: 'Aviator', betAmount: 350, payout: 0, result: 'loss', timestamp: '2026-07-14 17:00:00' },
  { id: 'BET-114', gameName: 'Wild Bounty Showdown', betAmount: 200, payout: 450, result: 'win', timestamp: '2026-07-13 10:15:00' },
  { id: 'BET-115', gameName: 'Mighty Mania', betAmount: 150, payout: 380, result: 'win', timestamp: '2026-07-12 21:00:00' },
  { id: 'BET-116', gameName: 'Super Ace', betAmount: 400, payout: 0, result: 'loss', timestamp: '2026-07-11 14:45:00' },
  { id: 'BET-117', gameName: 'Aviator', betAmount: 600, payout: 1500, result: 'win', timestamp: '2026-07-10 18:30:00' },
  { id: 'BET-118', gameName: 'Fortune Ace', betAmount: 250, payout: 0, result: 'loss', timestamp: '2026-07-09 12:10:00' },
  { id: 'BET-119', gameName: 'FlyX', betAmount: 300, payout: 690, result: 'win', timestamp: '2026-07-08 19:50:00' },
  { id: 'BET-120', gameName: 'World Football Live', betAmount: 500, payout: 1100, result: 'win', timestamp: '2026-07-07 16:15:00' },
  { id: 'BET-121', gameName: 'Super Ace', betAmount: 200, payout: 0, result: 'loss', timestamp: '2026-07-06 22:30:00' },
  { id: 'BET-122', gameName: 'Aviator', betAmount: 400, payout: 920, result: 'win', timestamp: '2026-07-05 15:40:00' },
  { id: 'BET-123', gameName: 'Wild Bounty Showdown', betAmount: 300, payout: 0, result: 'loss', timestamp: '2026-07-04 11:25:00' },
  { id: 'BET-124', gameName: 'Fortune Ace', betAmount: 150, payout: 330, result: 'win', timestamp: '2026-07-03 20:05:00' },
  { id: 'BET-125', gameName: 'Mighty Mania', betAmount: 250, payout: 0, result: 'loss', timestamp: '2026-07-02 17:15:00' },
  { id: 'BET-126', gameName: 'Aviator', betAmount: 500, payout: 1350, result: 'win', timestamp: '2026-07-01 13:00:00' },
  { id: 'BET-127', gameName: 'Super Ace', betAmount: 200, payout: 420, result: 'win', timestamp: '2026-06-30 21:30:00' },
  { id: 'BET-128', gameName: 'FlyX', betAmount: 350, payout: 0, result: 'loss', timestamp: '2026-06-29 16:45:00' },
  { id: 'BET-129', gameName: 'World Football Live', betAmount: 600, payout: 1320, result: 'win', timestamp: '2026-06-28 19:10:00' },
  { id: 'BET-130', gameName: 'Fortune Ace', betAmount: 100, payout: 0, result: 'loss', timestamp: '2026-06-27 12:00:00' }
];
