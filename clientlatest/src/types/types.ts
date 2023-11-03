export type FetchResult<T> = {
  data: T;
  status: number;
  message: string | undefined;
};

export enum PhoneInputError {
  INVALID_BUT_POSSIBLE = 'Invalid. Try adding the country code.',
  TOO_LONG = 'Too long.',
}

export enum GameType {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}

export type User = {
  _id: string;
  createdAt: Date;
  guid: string;
  username: string;
  isAnonymous: boolean;
  isDisabled: boolean;
  deletedAt?: Date;
  appVersion: string;
  appPlatform: string;
  appPlatformVersion: string;
};

export type Player = {
  userId?: string;
  username?: string;
  avatar?: string | undefined;
  phoneNumber?: string;
  portfolio?: Portfolio;
  balance?: number;
};

export type Position = {
  assetId: string;
  openPrice: number;
  quantity: number;
};

export type Portfolio = {
  _id: string;
  createdAt: Date;
  userId?: string;
  userPhoneNumber: string;
  gameId: string;
  isTradingHalted: boolean;
  positions: Position[];
};

export type Game = {
  _id?: string;
  startAt?: Date;
  endAt?: Date;
  isEnabled?: boolean;
  duration?: string;
  name?: string;
  players: Player[];
  type: GameType;
};

export type ChartBar = {
  Close: number;
  Currency: string;
  EndDateTime: string;
  High: number;
  Low: number;
  Open: number;
  Session: string;
  StartDateTime: string;
  TWAP: number;
  Trades: number;
  UTCOffset: number;
  VWAP: number;
  Volume: number;
};

export type Quote = {
  sourceApi: string;
  instrumentType: string;
  name: string;
  identifier: string;
  identifierType: string;
  market: string;
  marketIdentificationCode: string;
  dateTime: string;
  utcOffset: number;
  currency: string;
  open: number;
  high: number;
  low: number;
  last: number;
  lastSize: number;
  volume: number;
  volumeDate: string;
  previousClose: number;
  previousCloseDate: string;
  change: number;
  percentChange: number;
  extendedHoursType: string;
  extendedHoursDateTime: string;
  extendedHoursPrice: number;
  extendedHoursChange: number;
  extendedHoursPercentChange: number;
  bid: number;
  bidSize: number;
  bidDateTime: string;
  ask: number;
  askSize: number;
  askDateTime: string;
  tradingHalted: boolean;
  outcome: string;
  message: string;
  identity: string;
  delay: number;
};
