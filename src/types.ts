export type GameCategory = 
  | 'hot'
  | 'slots'
  | 'casino'
  | 'sports'
  | 'virtual'
  | 'poker'
  | 'fish'
  | 'lottery'
  | 'esports'
  | 'vip'
  | 'favorites';

export type GameProvider = 
  | 'JILI'
  | 'PG Soft'
  | 'FAST SPIN'
  | 'FastSpin'
  | 'Spribe'
  | 'Pragmatic Play'
  | 'Microgaming'
  | 'FC'
  | 'JDB'
  | 'EVO'
  | 'Sexy Gaming';

export type PlayType = 'aviator' | 'slot' | 'fastspin' | 'roulette' | 'sports' | 'sports_live' | 'vr' | 'standard';

export interface AvatarOption {
  id: string;
  name: string;
  icon: string;
  badge: string;
}

export interface LiveOddsMatch {
  id: string;
  sport: 'cricket' | 'football' | 'tennis' | 'virtual';
  tournament: string;
  team1: string;
  team2: string;
  flag1?: string;
  flag2?: string;
  score?: string;
  status: 'LIVE' | 'UPCOMING' | 'VR SIMULATION';
  oddsTeam1: number;
  oddsDraw?: number;
  oddsTeam2: number;
  hotMatch?: boolean;
}

export interface Game {
  id: string;
  name: string;
  category: GameCategory;
  provider: GameProvider;
  image: string;
  badge?: string;
  hot?: boolean;
  isFavorite?: boolean;
  playType: PlayType;
  minBet: number;
  rtp: string;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'bet_win' | 'bet_loss' | 'bonus' | 'rebate';
export type TransactionStatus = 'pending' | 'approved' | 'rejected';
export type PaymentMethod = 'bKash' | 'Nagad' | 'Rocket' | 'Upay' | 'Bank Card' | 'Crypto' | 'System';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  type: TransactionType;
  amount: number;
  paymentMethod: PaymentMethod;
  accountNumber?: string;
  transactionId?: string;
  status: TransactionStatus;
  timestamp: string;
  note?: string;
}

export interface User {
  id: string;
  phone: string;
  nickname: string;
  balance: number;
  vipLevel: number; // 0, 1, 2, 3...
  isKycVerified: boolean;
  kycStatus: 'none' | 'pending' | 'approved' | 'rejected';
  status: 'active' | 'suspended' | 'frozen';
  joinedDate: string;
  avatar: string;
  totalDeposit: number;
  totalWithdraw: number;
  totalBets: number;
  refCode: string;
}

export interface KYCRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  nidNumber: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
  active: boolean;
}

export interface Notice {
  id: string;
  text: string;
  active: boolean;
  date: string;
}

export interface AdminSettings {
  siteName: string;
  bkashAgentNumber: string;
  nagadAgentNumber: string;
  rocketAgentNumber: string;
  upayAgentNumber: string;
  minDeposit: number;
  maxDeposit: number;
  minWithdraw: number;
  maxWithdraw: number;
  depositBonusPercent: number;
  maintenanceMode: boolean;
  marqueeNotice: string;
  supportPhone: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface AdminNotification {
  id: string;
  type: 'high_value_deposit' | 'deposit' | 'withdrawal' | 'system';
  title: string;
  message: string;
  amount: number;
  userPhone: string;
  userName: string;
  txnId: string;
  paymentMethod: PaymentMethod;
  timestamp: string;
  read: boolean;
  isHighValue: boolean;
}

export interface BetRecord {
  id: string;
  gameName: string;
  betAmount: number;
  payout: number;
  result: 'win' | 'loss';
  timestamp: string;
}

export interface DepositSuccessToastData {
  amount: number;
  method: PaymentMethod;
  txnId: string;
  senderAccount: string;
  bonusAmount: number;
  timestamp: string;
}
