export type Lawyer = {
  id: string;
  slug: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  image: string;
  shortBio: string;
  fullBio: string;
  education: {
    degree: string;
    institution: string;
    location?: string;
    period: string;
    details?: string;
  }[];
  experience: {
    role: string;
    organization: string;
    location: string;
    period: string;
    description?: string;
    highlights?: string[];
  }[];
  priorExposure: {
    organization: string;
    location: string;
    period: string;
    description?: string;
  }[];
  academicEngagement: {
    role: string;
    organization: string;
    period: string;
    description: string;
  }[];
  recognition: {
    title: string;
    description: string;
  }[];
  mootCourts: {
    name: string;
    institution: string;
    year: string;
  }[];
  practiceAreaSlugs: string[];
};

export const lawyers: Lawyer[] = [
  {
    id: 'anand-kumar-maurya',
    slug: 'anand-kumar-maurya',
    name: 'Anand Kumar Maurya',
    designation: 'Advocate',
    email: 'anandkrmaurya13@gmail.com',
    phone: '+917985933594',
    image: '/images/team/anand-kumar-maurya.jpg',
    shortBio: 'Anand Kumar Maurya is a specialized Advocate focusing on complex commercial arbitration, restructuring, and banking & finance disputes. He brings robust strategic insight and a detail-oriented approach to high-stakes legal matters.',
    fullBio: 'Anand Kumar Maurya represents clients in complex commercial litigation, arbitration, and banking and finance matters. As an Advocate, his practice is distinguished by a proactive, strategic approach to dispute resolution and corporate restructuring. With substantial experience spanning critical areas such as insolvency proceedings, project disputes, and structured debt resolution, Anand consistently delivers pragmatic legal counsel tailored to his clients\' commercial objectives.\n\nHe has built a strong foundation in commercial law, augmenting his extensive legal knowledge with practical insights gained from prestigious domestic and international legal engagements. He regularly advises on complex facility documentation, multi-lender restructuring scenarios, and intricate arbitration proceedings, offering precise, results-oriented legal solutions.',
    education: [
      {
        degree: 'B.B.A. LL.B. (Corporate Law Hons.)',
        institution: 'Chandigarh University',
        period: '2019-2024',
        details: 'Graduated with 8.43/10 CGPA'
      },
      {
        degree: 'Advanced Diploma in ADR',
        institution: 'NALSAR University of Law',
        period: '2022-2023'
      },
      {
        degree: 'International Law',
        institution: 'Leiden University',
        period: '2021'
      }
    ],
    experience: [
      {
        role: 'Advocate / Consultant',
        organization: 'Eresolution Consultancy',
        location: 'India',
        period: 'Aug 2024 - Feb 2026',
        description: 'Handling complex corporate disputes, arbitration, and specialized financial restructuring matters.',
      }
    ],
    priorExposure: [
      {
        organization: 'Baker McKenzie',
        location: 'Virtual / Global',
        period: 'Jan 2024'
      },
      {
        organization: 'Luthra & Luthra',
        location: 'India',
        period: 'Aug 2023'
      },
      {
        organization: 'Legacy Law Offices',
        location: 'India',
        period: 'Dec 2022 - Jan 2023'
      },
      {
        organization: 'Centre for Trade and Investment Law',
        location: 'India',
        period: 'Mar & Jun 2022'
      },
      {
        organization: 'Chartered Institute of Arbitrators (CIArb)',
        location: 'Global',
        period: 'Feb 2022'
      },
      {
        organization: 'Delhi International Arbitration Centre (DIAC)',
        location: 'New Delhi, India',
        period: 'Dec 2021 - Jan 2022'
      },
      {
        organization: 'Allahabad High Court Mediation Centre',
        location: 'Prayagraj, India',
        period: 'Nov 2021'
      },
      {
        organization: 'Citi Bank Australia',
        location: 'Remote',
        period: 'May-Jun 2020'
      }
    ],
    academicEngagement: [
      {
        role: 'Arbitrator',
        organization: 'Asia Pacific Vis Pre-Moot',
        period: 'Feb 2026',
        description: 'Served as an arbitrator evaluating complex international commercial arbitration pleadings.'
      },
      {
        role: 'Special Invitee, Board of Studies (BoS)',
        organization: 'UILS, Chandigarh University',
        period: 'Feb 2026',
        description: 'Contributed to the development and enhancement of the academic legal curriculum.'
      },
      {
        role: 'Guest Speaker',
        organization: 'UILS, Chandigarh University',
        period: 'Feb 2025, Jul 2025',
        description: 'Delivered lectures on advanced topics in commercial law and dispute resolution.'
      }
    ],
    recognition: [
      {
        title: 'A World of Opportunity Foundation Scholarship',
        description: 'Awarded for exceptional academic and overall merit.'
      },
      {
        title: 'Certificate of Excellence',
        description: 'Awarded by the Vice-Chancellor of Chandigarh University.'
      }
    ],
    mootCourts: [
      {
        name: '5th National Moot Court Competition',
        institution: 'Dehradun',
        year: '2021'
      },
      {
        name: 'National Virtual Moot Court',
        institution: 'NMIMS Bangalore',
        year: '2021'
      }
    ],
    practiceAreaSlugs: [
      'banking-finance',
      'debt-restructuring',
      'arbitration-dispute-resolution',
      'project-infrastructure-disputes',
      'commercial-disputes',
      'insolvency-financial-distress'
    ]
  }
];
