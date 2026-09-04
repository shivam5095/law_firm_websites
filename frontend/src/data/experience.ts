export type ExperienceItem = {
  id: string;
  category: string;
  description: string;
  scale?: string;
  practiceAreas: string[];
};

const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    category: 'Debt Restructuring',
    description: 'Advised and formulated strategy for multi-lender stressed infrastructure exposure involving complex security enforcement.',
    scale: 'approximately ₹85 crore',
    practiceAreas: ['debt-restructuring', 'banking-finance', 'project-infrastructure-disputes']
  },
  {
    id: 'exp-2',
    category: 'Commercial Disputes',
    description: 'Represented clients and formulated litigation strategy in multiple complex portfolio matters encompassing varied commercial claims.',
    scale: 'approximately ₹100-130 crore',
    practiceAreas: ['commercial-disputes', 'arbitration-dispute-resolution']
  },
  {
    id: 'exp-3',
    category: 'International Arbitration',
    description: 'Drafted and processed comprehensive cross-border demand notices for international commercial disputes.',
    scale: 'USD 1 million',
    practiceAreas: ['arbitration-dispute-resolution', 'commercial-disputes']
  },
  {
    id: 'exp-4',
    category: 'Banking & Finance',
    description: 'Managed numerous financial disputes and recovery proceedings before commercial courts and tribunals.',
    scale: 'approximately ₹10 lakh to ₹25 crore',
    practiceAreas: ['banking-finance', 'commercial-disputes']
  },
  {
    id: 'exp-5',
    category: 'Insolvency & Bankruptcy',
    description: 'Experience includes initiating and defending Corporate Insolvency Resolution Processes (CIRP) for financial and operational creditors.',
    practiceAreas: ['insolvency-financial-distress', 'debt-restructuring']
  },
  {
    id: 'exp-6',
    category: 'Project Disputes',
    description: 'Worked on matters relating to substantial delay claims, force majeure invocations, and liquidated damages in large-scale construction projects.',
    practiceAreas: ['project-infrastructure-disputes']
  },
  {
    id: 'exp-7',
    category: 'Commercial Arbitration',
    description: 'Assisted in drafting detailed statements of claim, defense, and section 9 applications for interim relief in domestic arbitrations.',
    practiceAreas: ['arbitration-dispute-resolution', 'commercial-disputes']
  },
  {
    id: 'exp-8',
    category: 'Banking & Finance',
    description: 'Conducted rigorous review of syndicated loan agreements and security documents to advise on enforcement viability.',
    practiceAreas: ['banking-finance']
  },
  {
    id: 'exp-9',
    category: 'Corporate Restructuring',
    description: 'Experience includes structuring pragmatic one-time settlement (OTS) proposals for distressed corporate entities to avoid liquidation.',
    practiceAreas: ['debt-restructuring', 'insolvency-financial-distress']
  },
  {
    id: 'exp-10',
    category: 'Commercial Litigation',
    description: 'Advised on contractual disputes involving breach of representations, warranties, and specific performance of commercial contracts.',
    practiceAreas: ['commercial-disputes']
  },
  {
    id: 'exp-11',
    category: 'Infrastructure Disputes',
    description: 'Experience includes advising contractors on wrongful termination of infrastructure concession agreements and encashment of bank guarantees.',
    practiceAreas: ['project-infrastructure-disputes']
  },
  {
    id: 'exp-12',
    category: 'Arbitration',
    description: 'Worked on matters relating to the challenge and enforcement of arbitral awards under the Arbitration and Conciliation Act.',
    practiceAreas: ['arbitration-dispute-resolution']
  }
];

export { experienceData, experienceData as experienceItems };
