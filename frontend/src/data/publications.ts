export type Publication = {
  id: string;
  title: string;
  publication: string;
  date: string;
  coAuthor?: string;
  category: string;
  slug: string;
  excerpt: string;
};

export const publications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Cross-Border Insolvency Under the IBC Amendment 2026',
    publication: 'The Bar Bulletin',
    date: 'May 2026',
    category: 'Insolvency',
    slug: 'cross-border-insolvency-ibc-amendment-2026',
    excerpt: 'An in-depth analysis of the anticipated cross-border insolvency frameworks under the recent IBC amendments, exploring its implications for multinational corporate debtors and foreign creditors.'
  },
  {
    id: 'pub-2',
    title: 'Judicial Minimalism in Arbitration',
    publication: 'All India Commercial Law Review',
    date: 'March 2026',
    category: 'Arbitration',
    slug: 'judicial-minimalism-in-arbitration',
    excerpt: 'Examining the evolving trend of minimal judicial interference in arbitral proceedings and awards in India, and how it aligns with international best practices for commercial dispute resolution.'
  },
  {
    id: 'pub-3',
    title: 'Annotating the Res Judicata Principle',
    publication: 'All India Commercial Law Review',
    date: 'May 2025',
    category: 'Commercial Law',
    slug: 'annotating-res-judicata-principle',
    excerpt: 'A comprehensive review of the application of the Res Judicata principle in complex, multi-forum commercial litigation and arbitration.'
  },
  {
    id: 'pub-4',
    title: 'Navigating the Interplay between Arbitration & Insolvency',
    publication: 'IAMC Hyderabad',
    date: 'April 2024',
    category: 'Arbitration & Insolvency',
    slug: 'interplay-between-arbitration-and-insolvency',
    excerpt: 'Exploring the jurisdictional friction and procedural overlaps when parallel proceedings are initiated under the Arbitration Act and the Insolvency and Bankruptcy Code.'
  },
  {
    id: 'pub-5',
    title: 'Arbitrating Construction Disputes in India',
    publication: 'Journal of ADR',
    date: 'October 2023',
    category: 'Project Disputes',
    slug: 'arbitrating-construction-disputes-india',
    excerpt: 'A critical look at the nuances of construction arbitrations, focusing on evidence management for delay claims and quantifying disruption damages.'
  },
  {
    id: 'pub-6',
    title: 'India Arbitration as a Cure for Pharmaceutical Disputes',
    publication: 'LL Partners / Mondaq by Luthra & Luthra',
    date: 'September 2023',
    coAuthor: 'Adv. Astha Ojha',
    category: 'Arbitration',
    slug: 'india-arbitration-pharmaceutical-disputes',
    excerpt: 'Discussing the viability and advantages of utilizing arbitration for resolving high-stakes intellectual property and commercial disputes within the pharmaceutical sector.'
  },
  {
    id: 'pub-7',
    title: 'Arbitration: A Preferred Mode of DR in Metaverse',
    publication: 'IAMC / LiveLaw',
    date: 'August 2022',
    coAuthor: 'Adv. Tariq Khan',
    category: 'Technology & Law',
    slug: 'arbitration-preferred-mode-dr-metaverse',
    excerpt: 'Analyzing the potential of arbitration as the most adaptable and globally enforceable mechanism for resolving disputes arising within the Metaverse and Web3 ecosystems.'
  },
  {
    id: 'pub-8',
    title: 'Privacy Rights during a Pandemic',
    publication: 'Psychology and Education',
    date: '2021',
    category: 'Constitutional Law',
    slug: 'privacy-rights-during-pandemic',
    excerpt: 'A study on the balancing act between state-mandated public health measures and the fundamental right to privacy during global health emergencies.'
  },
  {
    id: 'pub-9',
    title: 'Legal Defences in Financial Distress in Banking Sector in India',
    publication: 'Supremo Amicus',
    date: '18 July 2020',
    category: 'Banking & Finance',
    slug: 'legal-defences-financial-distress-banking-sector',
    excerpt: 'An overview of the statutory and contractual defenses available to borrowers and guarantors facing financial distress and recovery actions from Indian financial institutions.'
  }
];
