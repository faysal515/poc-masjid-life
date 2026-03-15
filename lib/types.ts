export type Lang = 'bn' | 'en';

export interface BilingualString {
  bn: string;
  en: string;
}

export interface StatData {
  branches: number;
  districtsCovered: number;
  donors: number;
  totalDonation: number;
  totalLoanIssued: number;
  loanRecovery: number;
  outstandingLoan: number;
  overdueLoan: number;
  overduePercent: number;
  borrowerCount: number;
  disabledPeopleHelped: number;
  nonMuslimBorrowers: number;
  dataAsOf: string;
}

export interface ProjectLoan {
  name: BilingualString;
  issued: number;
  amount: number;
  collected: number;
}

export interface FundRow {
  id: number;
  label: BilingualString;
  amount: number;
  highlight?: boolean;
  note?: string;
}

export interface BankAccount {
  id: number;
  accountName: string;
  accountNumber: string;
  bank: string;
  branch: string;
  swift?: string;
  branchCode?: string;
  routing: string;
  signatories: string[];
  country: string;
}

export interface DonationChannel {
  type: 'bank' | 'bkash' | 'nagad';
  label: string;
  accountNumber?: string;
  accountName?: string;
  routing?: string;
  swift?: string;
  number?: string;
  holder?: string;
  note: BilingualString;
}

export interface DownloadDocument {
  id: number;
  title: BilingualString;
  hasPdf: boolean;
  hasDoc: boolean;
}

export interface Program {
  slug: string;
  icon: string;
  color: string;
  title: BilingualString;
  desc: BilingualString;
  beneficiaryCount?: number;
  totalIssued?: number;
  totalRecovered?: number;
  eligibility?: BilingualString[];
  steps?: BilingualString[];
}

export interface Testimonial {
  name: string;
  profession: BilingualString;
  text: BilingualString;
  timeAgo: BilingualString;
}

export interface Spokesman {
  name: string;
  phone: string;
}

export interface Branch {
  id: string;
  name: string;
  district: string;
  thana: string;
  loansIssued: number;
  activeLoans: number;
}

export interface Borrower {
  id: string;
  name: string;
  branch: string;
  district: string;
  loanType: string;
  disbursed: number;
  recovered: number;
  balance: number;
  religion: string;
}

export interface NavItem {
  key: string;
  href: string;
  label: BilingualString;
}
