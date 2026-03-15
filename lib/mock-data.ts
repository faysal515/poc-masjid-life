import type { StatData, ProjectLoan, FundRow, BankAccount, DonationChannel, DownloadDocument, Program, Testimonial, Spokesman, Branch, Borrower } from './types';

export const siteStats: StatData = {
  branches: 340,
  districtsCovered: 50,
  donors: 1700,
  totalDonation: 13075530,
  totalLoanIssued: 75743030,
  loanRecovery: 62540920,
  outstandingLoan: 13202120,
  overdueLoan: 2522334,
  overduePercent: 19,
  borrowerCount: 8255,
  disabledPeopleHelped: 538,
  nonMuslimBorrowers: 124,
  dataAsOf: '২০২৬ সালের ১৬ই মার্চ',
};

export const projectLoans: ProjectLoan[] = [
  { name: { bn: 'গরু ঋণ', en: 'Cow Loan' }, issued: 73, amount: 3300000, collected: 2052000 },
  { name: { bn: 'শিক্ষা ঋণ', en: 'Education Loan' }, issued: 32, amount: 60000, collected: 0 },
  { name: { bn: 'মসজিদ মেরামত ঋণ', en: 'Masjid Repair Loan' }, issued: 5, amount: 500000, collected: 200000 },
  { name: { bn: 'প্রতিবন্ধী সহায়তা ঋণ', en: 'Disabled Support Loan' }, issued: 18, amount: 180000, collected: 95000 },
  { name: { bn: 'নলকূপ ঋণ', en: 'Tubewell Loan' }, issued: 12, amount: 240000, collected: 160000 },
];

export const fundSummaryA: FundRow[] = [
  { id: 1, label: { bn: 'মোট ফান্ড (২+৩)', en: 'Total Fund (2+3)' }, amount: 15683640 },
  { id: 2, label: { bn: 'অনুদান', en: 'Donation' }, amount: 13078060 },
  { id: 3, label: { bn: 'লেন্ডারদের অবদান', en: 'Lenders Contribution' }, amount: 2605588 },
  { id: 4, label: { bn: 'শাখায় প্রেরিত ফান্ড', en: 'Fund to Branches' }, amount: 15315550 },
  { id: 5, label: { bn: 'ব্যাংক চার্জ', en: 'Bank Charge' }, amount: 28227 },
  { id: 6, label: { bn: 'ব্যাংক থেকে আয়', en: 'Income from Bank' }, amount: 2242 },
  { id: 7, label: { bn: 'পাওয়ার যোগ্য ফান্ড (১-৪-৫+৬)', en: 'Available Fund' }, amount: 342108, highlight: true },
];

export const fundSummaryB: FundRow[] = [
  { id: 8,  label: { bn: 'মোট ঋণ বিতরণ', en: 'Loan Issued' }, amount: 75750030 },
  { id: 9,  label: { bn: 'ঋণ ফেরত', en: 'Loan Recovery' }, amount: 62551720 },
  { id: 10, label: { bn: 'বকেয়া ঋণ (৮-৯)', en: 'Outstanding Loan' }, amount: 13198320 },
  { id: 11, label: { bn: 'অতিরিক্ত বকেয়া', en: 'Overdue Loan' }, amount: 2512834, note: '19%' },
  { id: 12, label: { bn: 'অবিতরণকৃত ফান্ড', en: 'Undistributed Fund' }, amount: 2117234 },
  { id: 15, label: { bn: 'শাখায় পাওয়ার যোগ্য ফান্ড', en: 'Available Fund to Branches' }, amount: 2087904, highlight: true },
];

export const bankAccounts: BankAccount[] = [
  {
    id: 1,
    accountName: 'Masjid.Life',
    accountNumber: '20506030200065311',
    bank: 'Islami Bank Bangladesh Ltd.',
    branch: 'Hospital Moor Sub Branch, Feni',
    swift: 'IBBLBDDH',
    branchCode: '603',
    routing: '125300348',
    signatories: ['Harunur Rashid', 'Md. Salauddin', 'Khaled Saifullah'],
    country: 'Bangladesh',
  },
  {
    id: 2,
    accountName: 'Kamal Uddin Ahmed & Harunur Rashid',
    accountNumber: '20506030200030404',
    bank: 'Islami Bank Bangladesh Ltd.',
    branch: 'Hospital Moor Sub Branch, Feni',
    swift: 'IBBLBDDH',
    branchCode: '603',
    routing: '125300348',
    signatories: ['Kamal Uddin Ahmed', 'Harunur Rashid'],
    country: 'Bangladesh',
  },
  {
    id: 3,
    accountName: 'Kamal Uddin Ahmed & Harunur Rosid',
    accountNumber: '002612100032731',
    bank: 'Southeast Bank Limited',
    branch: 'Feni Branch, Feni',
    routing: '205300521',
    signatories: ['Kamal Uddin Ahmed', 'Harunur Rosid'],
    country: 'Bangladesh',
  },
];

export const donationChannels: DonationChannel[] = [
  {
    type: 'bank',
    label: 'Islami Bank (IBBL)',
    accountNumber: '20506030200065311',
    accountName: 'Masjid.Life',
    routing: '125300348',
    swift: 'IBBLBDDH',
    note: { bn: 'বিদেশ থেকে পাঠানোর জন্য SWIFT ব্যবহার করুন', en: 'Use SWIFT for international transfers' },
  },
  {
    type: 'bank',
    label: 'Southeast Bank',
    accountNumber: '002612100032731',
    accountName: 'Kamal Uddin Ahmed & Harunur Rosid',
    routing: '205300521',
    note: { bn: 'দেশীয় ট্রান্সফারের জন্য', en: 'For domestic transfers' },
  },
  {
    type: 'bkash',
    label: 'bKash',
    number: '01727506595',
    holder: 'Kamal Ahmed (Founder)',
    note: { bn: 'ব্যক্তিগত অ্যাকাউন্ট — ফাউন্ডারের নিজের', en: 'Personal account — belongs to the Founder' },
  },
  {
    type: 'nagad',
    label: 'Nagad',
    number: '01727506595',
    holder: 'Kamal Ahmed (Founder)',
    note: { bn: 'ব্যক্তিগত অ্যাকাউন্ট — ফাউন্ডারের নিজের', en: 'Personal account — belongs to the Founder' },
  },
];

export const downloadDocuments: DownloadDocument[] = [
  { id: 1, title: { bn: 'শাখা ব্যবস্থাপনা টিমের অনুমতি ও অনুমোদন', en: 'Branch Management Team Permission & Approval' }, hasPdf: true, hasDoc: true },
  { id: 2, title: { bn: 'শপথপত্র — টিম সদস্য', en: 'Oath — Team Members' }, hasPdf: true, hasDoc: true },
  { id: 3, title: { bn: 'ব্যাংক অ্যাকাউন্ট খোলার রেজোলিউশন', en: 'Bank Account Opening Resolution' }, hasPdf: true, hasDoc: false },
  { id: 4, title: { bn: 'ঋণ বিতরণ রেজোলিউশন', en: 'Loan Issuing Resolution' }, hasPdf: true, hasDoc: false },
  { id: 5, title: { bn: 'রেজোলিউশন ফর্ম মডেল', en: 'Resolution Form Model' }, hasPdf: true, hasDoc: false },
  { id: 6, title: { bn: 'মানি রিসিপ্ট', en: 'Money Receipt' }, hasPdf: true, hasDoc: false },
  { id: 7, title: { bn: 'ব্রিজিং', en: 'Bridging' }, hasPdf: true, hasDoc: false },
  { id: 8, title: { bn: 'সুবিধাবঞ্চিত শিক্ষা সেবা', en: 'Underprivileged Education Service' }, hasPdf: true, hasDoc: false },
  { id: 9, title: { bn: 'গরু প্রজেক্ট ঋণ', en: 'Cow Project Loan' }, hasPdf: true, hasDoc: false },
];

export const programs: Program[] = [
  {
    slug: 'interest-free-loan',
    icon: '🤝',
    color: 'brand',
    title: { bn: 'সুদমুক্ত ঋণ', en: 'Interest-Free Loan' },
    desc: { bn: 'ব্যবসা, চিকিৎসা, ঘর মেরামত সহ বিভিন্ন প্রয়োজনে সুদমুক্ত ঋণ দেওয়া হয়।', en: 'Interest-free loans for business, medical treatment, house repair, and more.' },
    beneficiaryCount: 8255,
    totalIssued: 75743030,
    totalRecovered: 62540920,
    eligibility: [
      { bn: 'বাংলাদেশের যেকোনো নাগরিক', en: 'Any citizen of Bangladesh' },
      { bn: 'স্থানীয় শাখার সুপারিশপ্রাপ্ত', en: 'Recommended by local branch' },
      { bn: 'পূর্ববর্তী ঋণ পরিশোধিত থাকতে হবে', en: 'Previous loans must be repaid' },
    ],
    steps: [
      { bn: 'নিকটবর্তী শাখায় যোগাযোগ করুন', en: 'Contact your nearest branch' },
      { bn: 'আবেদন ফর্ম পূরণ করুন', en: 'Fill out the application form' },
      { bn: 'শাখা কমিটি অনুমোদন দেবে', en: 'Branch committee will approve' },
      { bn: 'ঋণ বিতরণ করা হবে', en: 'Loan will be disbursed' },
    ],
  },
  {
    slug: 'cow-loan',
    icon: '🐄',
    color: 'green',
    title: { bn: 'গরু ঋণ', en: 'Cow Loan' },
    desc: { bn: 'গরু কিনে জীবিকা উন্নয়নের জন্য প্রজেক্ট ঋণ। সফলভাবে পুনরুদ্ধারযোগ্য।', en: 'Project loan for purchasing cattle to improve livelihood. Successfully recoverable.' },
    beneficiaryCount: 73,
    totalIssued: 3300000,
    totalRecovered: 2052000,
    eligibility: [
      { bn: 'গ্রামীণ পরিবার যারা গরু পালন করতে পারবেন', en: 'Rural families who can rear cattle' },
      { bn: 'প্রশিক্ষণপ্রাপ্ত বা অভিজ্ঞতাসম্পন্ন', en: 'Trained or experienced in cattle rearing' },
    ],
    steps: [
      { bn: 'শাখায় যোগাযোগ করুন', en: 'Contact the branch' },
      { bn: 'গরু পালনের পরিকল্পনা জমা দিন', en: 'Submit cattle rearing plan' },
      { bn: 'অনুমোদনের পর ঋণ পাবেন', en: 'Loan disbursed after approval' },
    ],
  },
  {
    slug: 'education-loan',
    icon: '📚',
    color: 'blue',
    title: { bn: 'শিক্ষা ঋণ', en: 'Education Loan' },
    desc: { bn: 'সন্তানের পড়াশোনা চালিয়ে যাওয়ার জন্য সুদমুক্ত শিক্ষা ঋণ।', en: 'Interest-free education loan for continuing children\'s education.' },
    beneficiaryCount: 32,
    totalIssued: 60000,
    totalRecovered: 0,
    eligibility: [
      { bn: 'আর্থিকভাবে অসচ্ছল পরিবার', en: 'Financially disadvantaged families' },
      { bn: 'মেধাবী ছাত্রছাত্রী', en: 'Meritorious students' },
    ],
    steps: [
      { bn: 'শিক্ষা প্রতিষ্ঠানের সার্টিফিকেট সংগ্রহ করুন', en: 'Collect certificate from educational institution' },
      { bn: 'শাখায় আবেদন করুন', en: 'Apply at the branch' },
    ],
  },
  {
    slug: 'masjid-repair',
    icon: '🕌',
    color: 'amber',
    title: { bn: 'মসজিদ মেরামত ঋণ', en: 'Masjid Repair Loan' },
    desc: { bn: 'স্থানীয় মসজিদ মেরামত ও উন্নয়নের জন্য সুদমুক্ত ঋণ।', en: 'Interest-free loan for local mosque repair and improvement.' },
    beneficiaryCount: 5,
    totalIssued: 500000,
    totalRecovered: 200000,
    eligibility: [
      { bn: 'নিবন্ধিত মসজিদ কমিটি', en: 'Registered mosque committee' },
      { bn: 'মেরামতের প্রয়োজনীয়তার প্রমাণ', en: 'Proof of repair necessity' },
    ],
    steps: [
      { bn: 'মসজিদ কমিটির রেজোলিউশন জমা দিন', en: 'Submit mosque committee resolution' },
      { bn: 'মেরামতের বাজেট প্রস্তুত করুন', en: 'Prepare repair budget' },
      { bn: 'শাখার মাধ্যমে আবেদন করুন', en: 'Apply through the branch' },
    ],
  },
  {
    slug: 'help-disabled',
    icon: '♿',
    color: 'purple',
    title: { bn: 'প্রতিবন্ধী সহায়তা', en: 'Help Disabled' },
    desc: { bn: 'প্রতিবন্ধী মানুষদের সরাসরি অনুদান সহায়তা — ঋণ নয়, সরাসরি দান।', en: 'Direct grant support for disabled individuals — not a loan, a direct grant.' },
    beneficiaryCount: 538,
    totalIssued: 0,
    totalRecovered: 0,
  },
  {
    slug: 'tubewell',
    icon: '💧',
    color: 'cyan',
    title: { bn: 'নলকূপ স্থাপন', en: 'Tubewell' },
    desc: { bn: 'বিশুদ্ধ পানির জন্য নলকূপ স্থাপনে সহায়তা।', en: 'Support for installing tubewells for clean water access.' },
    beneficiaryCount: 12,
    totalIssued: 240000,
    totalRecovered: 160000,
  },
  {
    slug: 'education-unprivileged',
    icon: '🎓',
    color: 'teal',
    title: { bn: 'সুবিধাবঞ্চিত শিক্ষা', en: 'Underprivileged Education' },
    desc: { bn: 'মাদ্রাসা ছাত্রদের স্পনসরশিপ ও সহায়তা।', en: 'Sponsorship and support for madrasa students.' },
    beneficiaryCount: 45,
    totalIssued: 0,
    totalRecovered: 0,
  },
  {
    slug: 'bridging',
    icon: '🌉',
    color: 'indigo',
    title: { bn: 'ব্রিজিং', en: 'Bridging' },
    desc: { bn: 'দক্ষতা ও কর্মসংস্থান সংযোগ সেবা — দক্ষ মানুষকে কাজের সাথে যুক্ত করা।', en: 'Skill and employment connection service — connecting skilled people to work.' },
    beneficiaryCount: 30,
    totalIssued: 0,
    totalRecovered: 0,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'মোঃ শহীদুল ইসলাম',
    profession: { bn: 'চাকরিজীবী', en: 'Professional' },
    text: { bn: 'Good jobs — আলহামদুলিল্লাহ, অসাধারণ উদ্যোগ। এই প্রতিষ্ঠান সত্যিকারের মানুষের পাশে দাঁড়ায়।', en: 'Good jobs — Alhamdulillah, an extraordinary initiative. This organization truly stands by the people.' },
    timeAgo: { bn: '৪৭ দিন আগে', en: '47 days ago' },
  },
  {
    name: 'Mahabub Hossain Sakib',
    profession: { bn: 'ছাত্র', en: 'Student' },
    text: { bn: 'আমি একজন ছাত্র ও পার্টটাইম টিউটর। এই সেবা থেকে উপকৃত হয়েছি। সুদমুক্ত ঋণ আমার পড়াশোনা চালিয়ে যেতে সাহায্য করেছে।', en: 'I am a student and part-time tutor. I have benefited from this service. The interest-free loan helped me continue my studies.' },
    timeAgo: { bn: '১১৩ দিন আগে', en: '113 days ago' },
  },
  {
    name: 'Hafez Atikur Rahman Atik',
    profession: { bn: 'স্পোকসম্যান', en: 'Spokesman' },
    text: { bn: 'এই প্রতিষ্ঠানে কোনো লেনদেনের প্রতিশ্রুতি দেওয়া হয় না। শুধু সত্য তথ্য। স্বচ্ছতাই আমাদের শক্তি।', en: 'No transaction promises are made here. Only truthful information. Transparency is our strength.' },
    timeAgo: { bn: 'সম্প্রতি', en: 'Recently' },
  },
];

export const spokesmen: Spokesman[] = [
  { name: 'Hafez Atikur Rahman Atik', phone: '01819881587' },
  { name: 'Md. Mominul Islam', phone: '01784096493' },
];

export const branches: Branch[] = [
  { id: '1001', name: 'Feni Islamic Centre', district: 'Feni', thana: 'Feni Sadar', loansIssued: 245, activeLoans: 38 },
  { id: '1002', name: 'Khondokar Bari Jame Masjid', district: 'Feni', thana: 'Feni Sadar', loansIssued: 89, activeLoans: 12 },
  { id: '1003', name: 'Chan Shah Fakir Jame Masjid', district: 'Feni', thana: 'Sonagazi', loansIssued: 56, activeLoans: 8 },
  { id: '1004', name: 'Daganbhuiyan Central Masjid', district: 'Feni', thana: 'Daganbhuiyan', loansIssued: 43, activeLoans: 6 },
  { id: '1005', name: 'Parshuram Jame Masjid', district: 'Feni', thana: 'Parshuram', loansIssued: 38, activeLoans: 5 },
  { id: '2001', name: 'Chittagong Central Mosque', district: 'Chittagong', thana: 'Kotwali', loansIssued: 312, activeLoans: 44 },
  { id: '2002', name: 'Agrabad Jame Masjid', district: 'Chittagong', thana: 'Double Mooring', loansIssued: 178, activeLoans: 23 },
  { id: '2003', name: 'Hathazari Main Branch', district: 'Chittagong', thana: 'Hathazari', loansIssued: 95, activeLoans: 15 },
  { id: '3001', name: 'Dhaka North Branch', district: 'Dhaka', thana: 'Gulshan', loansIssued: 198, activeLoans: 29 },
  { id: '3002', name: 'Mirpur Jame Masjid', district: 'Dhaka', thana: 'Mirpur', loansIssued: 145, activeLoans: 21 },
  { id: '3003', name: 'Dhanmondi Islamic Centre', district: 'Dhaka', thana: 'Dhanmondi', loansIssued: 112, activeLoans: 18 },
  { id: '4001', name: 'Comilla Central Branch', district: 'Comilla', thana: 'Kotwali', loansIssued: 167, activeLoans: 24 },
  { id: '4002', name: 'Brahmanpara Masjid', district: 'Comilla', thana: 'Brahmanpara', loansIssued: 78, activeLoans: 11 },
  { id: '5001', name: 'Noakhali Main Branch', district: 'Noakhali', thana: 'Noakhali Sadar', loansIssued: 143, activeLoans: 20 },
  { id: '5002', name: 'Companiganj Jame Masjid', district: 'Noakhali', thana: 'Companiganj', loansIssued: 67, activeLoans: 10 },
  { id: '6001', name: 'Sylhet Central Mosque', district: 'Sylhet', thana: 'Kotwali', loansIssued: 189, activeLoans: 27 },
  { id: '6002', name: 'Biswanath Branch', district: 'Sylhet', thana: 'Biswanath', loansIssued: 76, activeLoans: 12 },
  { id: '7001', name: 'Barisal Main Branch', district: 'Barisal', thana: 'Kotwali', loansIssued: 134, activeLoans: 19 },
  { id: '7002', name: 'Wazirpur Masjid', district: 'Barisal', thana: 'Wazirpur', loansIssued: 56, activeLoans: 8 },
  { id: '8001', name: 'Rajshahi Central Branch', district: 'Rajshahi', thana: 'Boalia', loansIssued: 121, activeLoans: 17 },
  { id: '9001', name: 'Khulna Main Branch', district: 'Khulna', thana: 'Kotwali', loansIssued: 109, activeLoans: 16 },
  { id: '10001', name: 'Mymensingh Central Branch', district: 'Mymensingh', thana: 'Kotwali', loansIssued: 98, activeLoans: 14 },
  { id: '11001', name: 'Rangpur Main Branch', district: 'Rangpur', thana: 'Kotwali', loansIssued: 87, activeLoans: 13 },
  { id: '12001', name: 'Bogra Central Masjid', district: 'Bogra', thana: 'Shahjahanpur', loansIssued: 76, activeLoans: 11 },
  { id: '13001', name: 'Jessore Main Branch', district: 'Jessore', thana: 'Kotwali', loansIssued: 65, activeLoans: 9 },
  { id: '14001', name: 'Cox\'s Bazar Branch', district: 'Cox\'s Bazar', thana: 'Cox\'s Bazar Sadar', loansIssued: 54, activeLoans: 8 },
  { id: '15001', name: 'Gazipur North Branch', district: 'Gazipur', thana: 'Gazipur Sadar', loansIssued: 89, activeLoans: 13 },
  { id: '16001', name: 'Narayanganj Main Branch', district: 'Narayanganj', thana: 'Fatullah', loansIssued: 103, activeLoans: 15 },
];

export const districtCounts: Record<string, number> = {
  'Feni': 28, 'Chittagong': 22, 'Dhaka': 18, 'Comilla': 15,
  'Noakhali': 14, 'Sylhet': 12, 'Barisal': 10, 'Rajshahi': 9,
  'Khulna': 8, 'Mymensingh': 8, 'Rangpur': 7, 'Bogra': 7,
  'Jessore': 6, 'Cox\'s Bazar': 5, 'Gazipur': 5, 'Narayanganj': 5,
  'Tangail': 4, 'Kishoreganj': 4, 'Narsingdi': 4, 'Munshiganj': 3,
  'Manikganj': 3, 'Faridpur': 3, 'Gopalganj': 3, 'Madaripur': 2,
  'Shariatpur': 2, 'Rajbari': 2, 'Brahmanbaria': 4, 'Chandpur': 3,
  'Lakshmipur': 3, 'Habiganj': 3, 'Moulvibazar': 3, 'Sunamganj': 3,
  'Patuakhali': 2, 'Bhola': 2, 'Barguna': 2, 'Jhalokati': 2,
  'Pirojpur': 2, 'Natore': 2, 'Sirajganj': 3, 'Pabna': 3,
  'Chapai Nawabganj': 2, 'Naogaon': 2, 'Joypurhat': 2, 'Dinajpur': 3,
  'Gaibandha': 2, 'Nilphamari': 2, 'Lalmonirhat': 2, 'Kurigram': 2,
  'Thakurgaon': 2, 'Panchagarh': 1,
};

export const borrowers: Borrower[] = [
  { id: 'B001', name: 'মোঃ রহিম উদ্দিন', branch: 'Feni Islamic Centre', district: 'Feni', loanType: 'সুদমুক্ত ঋণ', disbursed: 50000, recovered: 50000, balance: 0, religion: 'Islam' },
  { id: 'B002', name: 'নূরজাহান বেগম', branch: 'Feni Islamic Centre', district: 'Feni', loanType: 'গরু ঋণ', disbursed: 80000, recovered: 60000, balance: 20000, religion: 'Islam' },
  { id: 'B003', name: 'Suresh Kumar Das', branch: 'Chittagong Central Mosque', district: 'Chittagong', loanType: 'সুদমুক্ত ঋণ', disbursed: 30000, recovered: 30000, balance: 0, religion: 'Hinduism' },
  { id: 'B004', name: 'মোঃ করিম', branch: 'Dhaka North Branch', district: 'Dhaka', loanType: 'শিক্ষা ঋণ', disbursed: 15000, recovered: 0, balance: 15000, religion: 'Islam' },
  { id: 'B005', name: 'Rashida Khanam', branch: 'Comilla Central Branch', district: 'Comilla', loanType: 'সুদমুক্ত ঋণ', disbursed: 25000, recovered: 20000, balance: 5000, religion: 'Islam' },
  { id: 'B006', name: 'আবুল হোসেন', branch: 'Noakhali Main Branch', district: 'Noakhali', loanType: 'গরু ঋণ', disbursed: 60000, recovered: 45000, balance: 15000, religion: 'Islam' },
  { id: 'B007', name: 'Fatema Begum', branch: 'Sylhet Central Mosque', district: 'Sylhet', loanType: 'সুদমুক্ত ঋণ', disbursed: 20000, recovered: 20000, balance: 0, religion: 'Islam' },
  { id: 'B008', name: 'James Rodrigues', branch: 'Chittagong Central Mosque', district: 'Chittagong', loanType: 'সুদমুক্ত ঋণ', disbursed: 35000, recovered: 25000, balance: 10000, religion: 'Christianity' },
];

export const bangladeshDivisions = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'
];

export const divisionDistricts: Record<string, string[]> = {
  'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Narsingdi', 'Munshiganj', 'Manikganj', 'Tangail', 'Kishoreganj', 'Faridpur', 'Gopalganj', 'Madaripur', 'Shariatpur', 'Rajbari'],
  'Chittagong': ['Chittagong', 'Cox\'s Bazar', 'Feni', 'Comilla', 'Noakhali', 'Lakshmipur', 'Chandpur', 'Brahmanbaria'],
  'Rajshahi': ['Rajshahi', 'Bogra', 'Naogaon', 'Natore', 'Sirajganj', 'Pabna', 'Joypurhat', 'Chapai Nawabganj'],
  'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Narail', 'Magura', 'Jhenaidah', 'Kushtia', 'Chuadanga', 'Meherpur'],
  'Barisal': ['Barisal', 'Patuakhali', 'Bhola', 'Barguna', 'Jhalokati', 'Pirojpur'],
  'Sylhet': ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj'],
  'Rangpur': ['Rangpur', 'Dinajpur', 'Gaibandha', 'Nilphamari', 'Lalmonirhat', 'Kurigram', 'Thakurgaon', 'Panchagarh'],
  'Mymensingh': ['Mymensingh', 'Netrokona', 'Jamalpur', 'Sherpur'],
};

export const districtThanas: Record<string, string[]> = {
  'Dhaka': ['Kotwali', 'Gulshan', 'Mirpur', 'Dhanmondi', 'Mohammadpur', 'Tejgaon', 'Uttara', 'Badda'],
  'Feni': ['Feni Sadar', 'Sonagazi', 'Daganbhuiyan', 'Parshuram', 'Fulgazi', 'Chhagalnaiya'],
  'Chittagong': ['Kotwali', 'Double Mooring', 'Hathazari', 'Sitakunda', 'Mirsarai', 'Sandwip'],
  'Comilla': ['Kotwali', 'Brahmanpara', 'Chandina', 'Homna', 'Meghna', 'Muradnagar'],
  'Noakhali': ['Noakhali Sadar', 'Companiganj', 'Begumganj', 'Subarnachar', 'Hatiya'],
  'Sylhet': ['Kotwali', 'Biswanath', 'Beanibazar', 'Golapganj', 'Jaintiapur'],
  'Barisal': ['Kotwali', 'Wazirpur', 'Agailjhara', 'Babuganj', 'Bakerganj'],
  'Rajshahi': ['Boalia', 'Motihar', 'Paba', 'Shah Makhdum', 'Godagari'],
};
