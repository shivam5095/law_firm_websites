export type FAQ = {
  question: string;
  answer: string;
  category: string;
};

export const faqs: FAQ[] = [
  {
    question: 'What areas of law does the firm specialize in?',
    answer: 'We primarily focus on Banking & Finance, Debt Restructuring, Arbitration & Dispute Resolution, Project & Infrastructure Disputes, Commercial Disputes, and Insolvency & Financial Distress matters.',
    category: 'Practice Areas'
  },
  {
    question: 'Do you represent clients outside of your primary location?',
    answer: 'Yes, we handle matters across various jurisdictions in India, appearing before tribunals, commercial courts, High Courts, and the Supreme Court, as well as handling domestic and international arbitrations.',
    category: 'General'
  },
  {
    question: 'How do I schedule a preliminary consultation?',
    answer: 'You can schedule a consultation by contacting us via phone, email, or through the contact form on our website. We will assess the nature of your inquiry and arrange a meeting or virtual call at the earliest convenience.',
    category: 'Consultation'
  },
  {
    question: 'What should I bring to the first consultation?',
    answer: 'Please bring copies of any relevant contracts, notices, pleadings, or communications related to your dispute. A brief timeline of events and key facts can also help us assess your matter efficiently.',
    category: 'Consultation'
  },
  {
    question: 'How are your legal fees structured?',
    answer: 'Our fee structures are transparent and depend on the complexity and scope of the matter. We offer hourly rates, stage-wise fixed fees for litigation/arbitration, or retainer models for ongoing advisory, which we discuss during the initial engagement phase.',
    category: 'Engagement'
  },
  {
    question: 'Can you assist in resolving disputes without going to court?',
    answer: 'Absolutely. We actively advise on pre-litigation strategy, negotiations, one-time settlements, and mediation to achieve favorable outcomes without the time and expense of prolonged litigation.',
    category: 'Practice Areas'
  },
  {
    question: 'What is the standard timeline for resolving commercial disputes?',
    answer: 'Timelines vary significantly based on the complexity, forum, and nature of the dispute. While arbitrations and commercial courts are generally more time-bound, we aim to strategically expedite matters wherever procedurally possible.',
    category: 'General'
  },
  {
    question: 'Do you advise on international or cross-border disputes?',
    answer: 'Yes, we assist in international commercial arbitrations, enforcement of foreign arbitral awards, and advise on cross-border insolvency matters.',
    category: 'Practice Areas'
  },
  {
    question: 'How do you keep clients updated on the progress of their case?',
    answer: 'We believe in proactive communication. Clients receive regular updates at every procedural stage, along with copies of all filings and strategic briefs prior to any major hearings.',
    category: 'Engagement'
  },
  {
    question: 'What is your approach to handling insolvent or distressed companies?',
    answer: 'We approach insolvency pragmatically, advising either on robust debt restructuring to salvage the company or guiding stakeholders through the Corporate Insolvency Resolution Process (CIRP) under the IBC to maximize value recovery.',
    category: 'Practice Areas'
  },
  {
    question: 'Are initial consultations confidential?',
    answer: 'Yes, all communications with our firm, including initial consultations before formal engagement, are treated with strict confidentiality under attorney-client privilege.',
    category: 'Consultation'
  },
  {
    question: 'Do you work with other law firms or senior counsels?',
    answer: 'Yes, we frequently brief designated Senior Advocates for complex appellate matters and collaborate with specialized local counsels across different jurisdictions when required by the case strategy.',
    category: 'Engagement'
  }
];
