export type Publication = {
  id: string;
  title: string;
  publication: string;
  dateLabel: string;
  sortDate: string;
  url: string;
  excerpt?: string;
  /** Compatibility fields for the existing insights and profile views. */
  date?: string;
  coAuthor?: string;
  category?: string;
  slug?: string;
  externalUrl?: string;
};

export const publications: Publication[] = [
  { id: 'pub-1', title: 'Markets Are Falling but IPOs Are Booming. Who Is Really Getting the Money?', publication: 'The Bar Bulletin', dateLabel: 'October 2026', sortDate: '2026-10-01', url: 'https://thebarbulletin.com/indian-ipo-boom-shareholder-exits-market-decline/' },
  { id: 'pub-2', title: 'What the Subhash Chandra Order Actually Costs Indian Banking', publication: 'The Bar Bulletin', dateLabel: 'September 2026', sortDate: '2026-09-01', url: 'https://thebarbulletin.com/subhash-chandra-insolvency-repayment-plan-dispute/' },
  { id: 'pub-3', title: "Rs 48,021 Crore in Bank Fraud, What RBI's 2026 Directions on Customer Liability Actually Change", publication: 'The Bar Bulletin', dateLabel: 'August 2026', sortDate: '2026-08-01', url: 'https://thebarbulletin.com/rbi-2026-directions-customer-liability-bank-fraud/' },
  { id: 'pub-4', title: 'Emirates NBD and RBL Bank, Majority Foreign Ownership under Indian Banking Law', publication: 'The Bar Bulletin', dateLabel: 'July 2026', sortDate: '2026-07-01', url: 'https://thebarbulletin.com/emirates-nbd-rbl-deal-indian-banking-law-majority-ownership/' },
  { id: 'pub-5', title: "The Capital Stack in Distress, How Structured, Acquisition and Mezzanine Finance Shape India's Largest Deals and Their Resolution", publication: 'The Bar Bulletin', dateLabel: 'June 2026', sortDate: '2026-06-01', url: 'https://thebarbulletin.com/structured-acquisition-mezzanine-finance-capital-stack-india/' },
  { id: 'pub-6', title: "Cross-Border Insolvency under the IBC Amendment 2026, India's Long-Awaited Entry into Global Restructuring Jurisprudence", publication: 'The Bar Bulletin', dateLabel: 'May 2026', sortDate: '2026-05-01', url: 'https://thebarbulletin.com/cross-border-insolvency-ibc-amendment-2026-section-240c/', excerpt: 'An in-depth analysis of the anticipated cross-border insolvency frameworks under the recent IBC amendments, exploring its implications for multinational corporate debtors and foreign creditors.' },
  { id: 'pub-7', title: "Judicial Minimalism in Arbitration, the Supreme Court's Doctrinal Shift under Sections 34 and 37 of the Arbitration and Conciliation Act, 1996", publication: 'All India Commercial Law Review', dateLabel: 'March 2026', sortDate: '2026-03-01', url: 'https://www.aiclr.in/post/judicial-minimalism-in-arbitration-the-supreme-court-s-doctrinal-shift-under-sections-34-and-37-of', excerpt: 'Examining the evolving trend of minimal judicial interference in arbitral proceedings and awards in India, and how it aligns with international best practices for commercial dispute resolution.' },
  { id: 'pub-8', title: 'Annotating the Res Judicata Principle on the Basis of Sections 9 and 17 of the Arbitration and Conciliation Act, 1996', publication: 'All India Commercial Law Review', dateLabel: 'May 2025', sortDate: '2025-05-01', url: 'https://www.aiclr.in/post/annotating-the-res-judicata-principle-on-the-basis-of-section-9-17-of-the-arbitration-conciliat', excerpt: 'A comprehensive review of the application of the Res Judicata principle in complex, multi-forum commercial litigation and arbitration.' },
  { id: 'pub-9', title: 'Navigating the Interplay between Arbitration and Insolvency in International Disputes', publication: 'International Arbitration and Mediation Centre, Hyderabad', dateLabel: 'April 2024', sortDate: '2024-04-01', url: 'https://iamch.org.in/navigating-the-interplay-between-arbitration-and-insolvency-in-international-disputes' },
  { id: 'pub-10', title: 'Arbitrating Construction Disputes in India', publication: 'Journal of Alternative Dispute Resolution', dateLabel: 'October 2023', sortDate: '2023-10-01', url: 'https://journal.thelawbrigade.com/jadr/article/view/961' },
  { id: 'pub-11', title: 'India Arbitration as a Cure for Pharmaceutical Disputes (co-authored)', publication: 'Mondaq, Luthra & Luthra Law Offices', dateLabel: 'September 2023', sortDate: '2023-09-01', url: 'https://www.mondaq.com/india/arbitration-dispute-resolution/1365328/arbitration-as-a-cure-for-pharmaceutical-disputes' },
  { id: 'pub-12', title: 'Arbitration, a Preferred Mode of Dispute Resolution in the Metaverse (co-authored)', publication: 'LiveLaw Expert Columns, IAMC', dateLabel: 'August 2022', sortDate: '2022-08-01', url: 'https://www.livelaw.in/columns/arbitration-a-preferred-mode-of-dispute-resolution-mechanism-in-metaverse-207171' },
  { id: 'pub-13', title: 'Privacy Rights during a Pandemic, a Comparative Study', publication: 'Psychology and Education (Scopus indexed)', dateLabel: '2021', sortDate: '2021-01-01', url: '' },
  { id: 'pub-14', title: 'Unreasonableness in the Name of Reasonable Restriction (book chapter)', publication: 'Constitutionalism and Changing Dimensions of Fundamental Rights in India (Amazon bestselling book)', dateLabel: '2021', sortDate: '2021-01-01', url: 'https://www.amazon.in/Constitutionalism-Changing-Dimensions-Fundamental-Rights/dp/9391260055' },
  { id: 'pub-15', title: 'Legal Defences in Financial Distress in the Banking Sector in India', publication: 'Supremo Amicus', dateLabel: 'July 2020', sortDate: '2020-07-01', url: 'https://supremoamicus.org/wp-content/uploads/2020/06/A1v18-12v18.pdf' },
  { id: 'pub-16', title: 'Aatmanirbhar, Migrant Labour During the Crisis in India', publication: 'Alochana Chakra Journal (UGC-CARE Group I)', dateLabel: 'June 2020', sortDate: '2020-06-01', url: '' },
  { id: 'pub-17', title: 'From Peace to Trouble, State of Afghanistan', publication: 'Journal of Xidian University (Scopus indexed)', dateLabel: 'May 2020', sortDate: '2020-05-01', url: 'https://xadzkjdx.cn/index.php/volume-14-issue-4-apr-20-page-2/' },
  { id: 'pub-18', title: 'Impact of COVID-19 on World Economy, International Monetary Fund, World Bank, World Health Organisation (book chapter)', publication: 'Impact of COVID-19 & Pandemic Lockdown in India, Repercussion in Business and Economy (Amazon best-selling book)', dateLabel: '2020', sortDate: '2020-01-01', url: 'https://www.amazon.in/Impact-COVID-19-Pandemic-Lockdown-India/dp/8194623375' },
];

export function getLatestPublications(n: number): Publication[] {
  return [...publications]
    .sort((a, b) => Date.parse(b.sortDate) - Date.parse(a.sortDate))
    .slice(0, n);
}
