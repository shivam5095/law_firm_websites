export type HandlingStep = {
  stepNumber: string;
  title: string;
  description: string;
};

export type PracticeArea = {
  id: string;
  slug: string;
  title: string;
  /** Short uppercase label shown beneath the practice area artwork. */
  caption: string;
  /** Controls whether the area is published in the home page slider. */
  published: boolean;
  shortDescription: string;
  description: string;
  representativeScale?: string | null;
  icon: string;
  image: string;
  services: string[];
  keyMatters: string[];
  approach: string;
  caseHandlingStrategy: string;
  handlingMethodology: HandlingStep[];
  strategicTactics: string[];
  faqs: { question: string; answer: string }[];
  legalFramework?: string[];
  whatWeDo?: string[];
  perspective?: [string, string, string] | string;
  pullQuote?: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    id: 'banking-finance',
    slug: 'banking-finance',
    title: 'Banking & Finance',
    caption: 'BANKING & FINANCE',
    published: true,
    shortDescription: 'Where credit, security and regulation meet.',
    description: `Credit sits at the centre of almost every business in India and of many households, yet the documents that govern it are among the least read. Facility agreements, security documents, guarantees and sanction terms are signed in a few hours and then decide outcomes for years. Our Banking & Finance practice works across that entire life cycle. We advise on how credit is structured and secured, and we act when the relationship comes under strain, whether through a demand, a classification, an enforcement or a dispute.

We advise promoters, businesses, property groups, investors and lenders on lending and security arrangements, including structured, acquisition and mezzanine finance and real estate financing. We also act for borrowers, guarantors, homeowners and MSMEs in their dealings with banks, housing finance companies and NBFCs, from the reconciliation of a disputed account to the defence of enforcement action before the Debt Recovery Tribunal. A borrower with a single account and a group raising capital across several lenders receive the same close reading of their documents and the same candour about where they stand.

Because the same practice structures facilities and handles the disputes that follow, our advice runs in both directions. When we help design a financing, we know from experience where such arrangements tend to break. When we defend an enforcement, we know how the arrangement was meant to work and where the lender’s own process fell short.`,
    legalFramework: [
      'Our work in this area rests on the Banking Regulation Act, 1949 and the Reserve Bank of India Act, 1934, which together govern how banks are licensed, supervised and directed. It also rests on the RBI directions issued under them, including the prudential norms on income recognition and asset classification, the Fair Practices Code for lenders and the rules on outsourcing and recovery agents.',
      'Enforcement of security is governed by the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002 and the Security Interest (Enforcement) Rules, 2002. Recovery of debts is governed by the Recovery of Debts and Bankruptcy Act, 1993, which established the Debt Recovery Tribunals. The creation and priority of security turns on the Transfer of Property Act, 1882, the Registration Act, 1908, the Indian Stamp Act, 1899 and State stamp laws, and the charge registration provisions of the Companies Act, 2013. Guarantees are governed by the Indian Contract Act, 1872. We also work regularly with the Negotiable Instruments Act, 1881, the Credit Information Companies (Regulation) Act, 2005 and the Limitation Act, 1963.'
    ],
    whatWeDo: [
      'On the advisory side, we review and negotiate facility and security documentation, structure financing for commercial real estate and growing businesses, and advise on how debt, mezzanine capital and equity should be sequenced so that each layer is protected.',
      'On the disputes side, we examine whether a demand notice, an NPA classification or a possession notice complies with the law. We represent borrowers and guarantors before the Debt Recovery Tribunal, negotiate one time settlements, and secure the release of security and no-dues documentation once a matter is closed. Where a lender’s conduct falls short of what RBI requires, we pursue the matter through the grievance framework the regulator has put in place.'
    ],
    perspective: [
      'Banking regulation in India is being rewritten faster than at any time in recent memory. Our founder’s analysis of RBI’s 2026 directions on customer liability in bank fraud, published in The Bar Bulletin as ',
      'Rs 48,021 Crore in Bank Fraud, What RBI’s 2026 Directions on Customer Liability Actually Change',
      ', examined what those rules mean for customers and banks and where the resulting disputes will be fought. Following the rulebook as it changes is part of the advice every client receives.'
    ],
    icon: 'Landmark',
    image: '/images/practice/banking-finance.jpeg',
    services: [
      'Debt Recovery Tribunal (DRT & DRAT) litigation',
      'SARFAESI Act security enforcement & Section 13/14 actions',
      'Syndicated facility agreement & mortgage verification',
      'Personal & corporate guarantee enforcement',
      'Negotiable Instruments Act (Section 138) proceedings',
      'Pre-litigation recovery strategy & OTS agreements',
      'Inter-bank consortium dispute resolution'
    ],
    keyMatters: [
      `Building the financing for a ₹200 crore commercial property portfolio\n\nA commercial property group held assets in Ahmedabad and Goa valued at over ₹200 crore. It needed one financing structure that would carry those properties from acquisition all the way to bank funding. The challenge was not finding capital but deciding the order in which different kinds of capital could safely enter, because senior bank debt, mezzanine money and fund investment each demand protections that can collide with one another. We designed the complete financial architecture, covering structured finance, mezzanine capital, fund structuring and the sequencing of debt and equity. Each class of funder knew exactly where it stood, and the structure remained bankable at every stage.`,
      `Turning a possession notice into a negotiation\n\nA homeowner at Bibinagar, in the fast-growing corridor around the new AIIMS campus outside Hyderabad, faced loan recall and possession action by a housing finance company. On paper, the lender appeared to hold every advantage. A close reading of the record changed that. It revealed defects in the statutory notices under Sections 13(2) and 13(4) of the SARFAESI Act, errors in the amount demanded, and a prior encumbrance on the property that had never been disclosed. Each of these went to the legality of the enforcement itself rather than its fairness. Together they moved the lender away from taking possession and towards a resolution, and the family kept its home in one of the region’s most valuable growth corridors.`,
      `Lending disputes where the security did not hold\n\nAcross secured and unsecured lending disputes ranging from ₹10 lakh to ₹25 crore per matter, involving institutions such as State Bank of India, HDFC Bank, Axis Bank, Standard Chartered and American Express, our review of the security documents repeatedly found gaps in how charges had been created or registered. Under the Companies Act, 2013, a charge that has not been registered cannot be relied upon against a liquidator or other creditors. A lender that believes itself fully secured may therefore rank far lower in law than it does on paper. These matters went on to include NPA classification challenges, SARFAESI proceedings, arbitration and the enforcement of awards. Identifying the weakness early is what reshaped each negotiation, for the lender and the borrower alike.`
    ],
    approach: 'We adopt an aggressive, commercially viable approach to banking disputes, ensuring our clients\' financial exposure is mitigated while navigating the stringent regulatory oversight of the Reserve Bank of India and Indian courts.',
    caseHandlingStrategy: `When handling banking and financial litigation, my primary objective is to maximize financial recovery speed while neutralizing procedural bottlenecks. 

First, every matter commences with an exhaustive forensic audit of the loan agreements, hypothecation deeds, mortgage registers, and sanction letters to verify the precision of the debt ledger and legal enforceability of covenants.

Second, I assess the optimal forum based on asset liquidity and debtor profiles. Rather than relying on boilerplate statutory notices, I issue meticulously drafted, hard-hitting demand notices under Section 13(2) of the SARFAESI Act or Section 434/433 of relevant statutes, detailing exact collateral liabilities and establishing personal guarantor accountability.

Third, in contested matters before the Debt Recovery Tribunal (DRT) or Commercial Courts, I take proactive measures to obtain ex-parte interim injunctions, attachment of bank accounts, and restraining orders against the dissipation of secured and unencumbered assets.

Fourth, during hearings, I maintain rigorous focus on procedural precision, dismantling frivolous debtor objections regarding compound interest calculations, account classifications, or notice technicalities. Where beneficial to the lender or corporate client, I simultaneously leverage parallel conciliation to secure binding One-Time Settlement (OTS) terms backed by upfront cash deposits or post-dated securities.`,
    handlingMethodology: [
      {
        stepNumber: '01',
        title: 'Forensic Facility & Collateral Audit',
        description: 'Exhaustive examination of loan sanctions, promissory notes, guarantees, and CERSAI/charge filings to ensure zero evidentiary vulnerabilities before entering court.'
      },
      {
        stepNumber: '02',
        title: 'Precision Pre-Litigation Demands',
        description: 'Drafting structured statutory demand notices under SARFAESI Section 13(2) and NI Act Section 138, holding corporate debtors and personal guarantors jointly accountable.'
      },
      {
        stepNumber: '03',
        title: 'Urgent Asset Injunctions & Attachment',
        description: 'Moving expeditiously before DRT, Commercial Courts, or High Courts for interim freezing orders, appointment of receivers, and restraint on alienation of mortgaged properties.'
      },
      {
        stepNumber: '04',
        title: 'Tribunal Advocacy & Counter-Claim Neutralization',
        description: 'Forceful oral advocacy countering frivolous Securitisation Applications (SA), ensuring DM/CMM orders for physical possession under Section 14 are executed without delay.'
      },
      {
        stepNumber: '05',
        title: 'Settlement Structuring or Realization',
        description: 'Facilitating legally binding One-Time Settlement (OTS) consent terms or supervising transparent public auctions to achieve full financial closure.'
      }
    ],
    strategicTactics: [
      'Dual-track proceedings: Parallel DRT recovery alongside Section 138 criminal complaints for maximum settlement leverage.',
      'Immediate piercing of corporate veil to hold active promoter-guarantors personally liable for borrowed capital.',
      'Continuous coordination with court-appointed receivers and District Magistrates for physical asset takeover.'
    ],
    faqs: [
      {
        question: 'What is the advantage of SARFAESI actions over conventional civil suits?',
        answer: 'SARFAESI allows secured creditors (banks and recognized NBFCs) to enforce security interests without court intervention, granting powers to take possession of collateral and auction assets directly, drastically shortening recovery timelines.'
      },
      {
        question: 'How do you handle personal guarantees executed by promoters?',
        answer: 'We proceed simultaneously against the principal borrower and personal guarantors before the DRT or under the IBC framework, preventing guarantors from shielding personal assets behind the corporate entity.'
      },
      {
        question: 'Can you assist borrowers facing unlawful bank asset attachment?',
        answer: 'Yes. We represent borrowers before DRT under Section 17 of SARFAESI where banks have violated mandatory notice procedures, committed accounting errors, or initiated disproportionate recovery actions.'
      }
    ]
  },
  {
    id: 'debt-restructuring',
    slug: 'debt-restructuring',
    title: 'Debt Restructuring',
    caption: 'DEBT RESTRUCTURING',
    published: true,
    shortDescription: 'Turning financial pressure into a workable plan.',
    description: `Financial distress rarely comes from one lender or one event. It builds across term loans, working capital lines, credit cards and personal guarantees, each with its own deadline and each lender acting on its own track. A borrower who responds to them one at a time usually ends up negotiating with the strongest creditor first and the weakest last, which is the wrong way round. Our Debt Restructuring practice brings every exposure into one strategy, so that each negotiation supports the next.

We act for MSMEs, family businesses, promoters, salaried professionals and personal guarantors facing banks, NBFCs and digital lenders, and we advise lenders and investors on workable outcomes for stressed accounts. The scale varies widely, from a handful of personal accounts to stressed portfolios worth over ₹100 crore, but the questions remain the same. What can the client genuinely afford, what is each lender’s real position, and which settlement will close the exposure for good rather than merely postpone it.

Restructuring is negotiation conducted under legal pressure, and the law is often what restores the balance. Lenders are bound by RBI’s framework on settlements, by fair practice and recovery rules, and by the procedural requirements of every forum they invoke. Where those obligations have not been met, they become the borrower’s strongest leverage.`,
    pullQuote: '“Distress is a deadline, not a verdict.”',
    legalFramework: [
      'Restructuring in India is shaped by RBI’s prudential framework for the resolution of stressed assets and its framework for compromise settlements and technical write-offs, both issued under the Banking Regulation Act, 1949 and the Reserve Bank of India Act, 1934. For smaller businesses, these sit alongside the RBI framework for the revival and rehabilitation of MSMEs and the Micro, Small and Medium Enterprises Development Act, 2006.',
      'A lender’s recovery options run through the SARFAESI Act, 2002 and the Recovery of Debts and Bankruptcy Act, 1993. For larger defaults they also run through the Insolvency and Bankruptcy Code, 2016, including its pre-packaged insolvency process for MSMEs. A restructuring rarely takes place in a single forum. Lenders frequently pursue arbitration under the Arbitration and Conciliation Act, 1996 or settlement before Lok Adalats constituted under the Legal Services Authorities Act, 1987. Others file cheque dishonour cases under the Negotiable Instruments Act, 1881 or criminal complaints framed under the Bharatiya Nyaya Sanhita, 2023 and the Bharatiya Nagarik Suraksha Sanhita, 2023, often in parallel. The terms of any settlement, and the way it is reported, are governed by the Indian Contract Act, 1872 and the Credit Information Companies (Regulation) Act, 2005.'
    ],
    whatWeDo: [
      'We begin by mapping every facility, security, guarantee and pending proceeding, because a restructuring that ignores one lender usually collapses because of it. We then assess each lender’s position, including weaknesses in its documentation, its process or its conduct, and sequence the negotiations accordingly.',
      'We negotiate restructurings, refinancing and one time settlements. We defend parallel arbitration, Lok Adalat and criminal proceedings, challenge improper arbitrator appointments, and escalate regulatory non-compliance where it exists. Every settlement we conclude is documented to close the account completely, with release of security and accurate reporting to the credit bureaus.'
    ],
    perspective: 'A settlement is only as good as the document that records it. We have seen accounts reopened, guarantees revived and credit records left uncorrected because the closing paperwork was treated as a formality. We treat it as the most important page of the entire negotiation.',
    icon: 'Briefcase',
    image: '/images/practice/debt-restructuring.jpeg',
    services: [
      'One-Time Settlement (OTS) drafting and negotiation',
      'Inter-Creditor Agreement (ICA) evaluation',
      'Prudential Framework for Resolution of Stressed Assets',
      'Debt-to-equity conversion documentation',
      'Consortium & multi-lender restructuring',
      'Refinancing & structured debt instruments',
      'Pre-insolvency corporate debt workouts'
    ],
    keyMatters: [
      `Nine lenders, four forums, one strategy\n\nAn apparel business in Gujarat found itself facing 9 credit facilities at once, held by banks, leading NBFCs, a card issuer and a fintech lender. Each lender was moving through its own forum, across arbitration, Lok Adalat, criminal complaints and conciliation, and each assumed it was negotiating alone. We brought every proceeding under one strategy. We challenged arbitrator appointments that lenders had made unilaterally, which Indian law does not permit, and escalated lender non-compliance to the RBI Ombudsman. Once the lenders saw that their arbitration track was legally vulnerable, their calculus changed. Settlements followed at about 30% of principal, and the business that had been fighting on four fronts was able to return to running itself.`,
      `Making ₹100 crore to ₹130 crore of stressed exposure resolvable\n\nAcross stressed asset and credit portfolios aggregating ₹100 crore to ₹130 crore, we worked on restructuring, consolidation, refinancing and one time settlements. The decisive insight in this work was that a settlement figure means little on its own. What matters is whether the structure around it, meaning the security, the repayment schedule and the source of funds, makes the resolution commercially viable for both sides. Bringing structured, acquisition and mezzanine finance thinking into the negotiation is what turned several of these portfolios from unrecoverable into resolvable.`,
      `Closing accounts for good\n\nFor individual borrowers in several States, we have negotiated settlements with lenders including ICICI Bank, HDFC Bank, Axis Bank, Yes Bank, Poonawalla Fincorp, InCred and Fibe. We have then pursued the paperwork lenders most often delay, the settlement letter, the no-dues certificate and the correction of credit records. Where recovery conduct crossed the limits RBI sets for lenders and their agents, we held the lender to account. For an individual, that final certificate is often worth as much as the settlement itself, because it decides whether they can ever borrow again.`
    ],
    approach: 'Our approach focuses on preserving the core enterprise value of the business while achieving sustainable financial resolution. We balance aggressive legal positions with pragmatic commercial negotiations to deliver win-win outcomes.',
    caseHandlingStrategy: '',
    handlingMethodology: [],
    strategicTactics: [],
    faqs: []
  },
  {
    id: 'project-infrastructure-disputes',
    slug: 'project-infrastructure-disputes',
    title: 'Project & Infrastructure Disputes',
    caption: 'PROJECT & INFRASTRUCTURE DISPUTES',
    published: true,
    shortDescription: 'Specialized counsel for construction delays, EPC contracts, concession terminations, and infrastructure conflicts.',
    description: 'Infrastructure and major engineering projects involve substantial capital exposure and intricate multi-layered contracts. We represent developers, concessionaires, EPC contractors, and institutional lenders in complex disputes involving delay claims, force majeure, liquidated damages, design variations, and wrongful contract terminations.',
    icon: 'Building2',
    image: '/images/practice/infrastructure-project-finance.jpeg',
    services: [
      'EPC, FIDIC & concession contract dispute resolution',
      'Delay, disruption & prolongation claims quantification',
      'Injunctions against unlawful encashment of Bank Guarantees',
      'Force majeure & price escalation dispute advisory',
      'Wrongful termination & debarment litigation',
      'Dispute Adjudication Board (DAB) proceedings',
      'Project financing dispute representation'
    ],
    keyMatters: [
      'Advised contractors on multi-crore delay claims and force majeure invocations in large-scale road and highway projects.',
      'Obtained stay orders restraining project authorities from encashing advance and performance bank guarantees.',
      'Litigated dispute resolution clauses in standard FIDIC Yellow and Silver Book concessions.',
      'Represented infrastructure developers in arbitration against state government bodies and public sector undertakings.'
    ],
    approach: 'Our approach integrates deep legal insight with rigorous technical comprehension. We work closely with delay analysts, quantity surveyors, and project engineers to build airtight, calculation-backed claims that withstand judicial and arbitral scrutiny.',
    caseHandlingStrategy: `Infrastructure disputes are heavily technical and won on contemporaneous project records. My methodology focuses on dissecting the critical path rather than engaging in rhetorical arguments.

When handling a project dispute, the first step is reconstructing the project timeline using daily progress reports, site obstruction logs, RFI submissions, and engineer correspondence. This establishes whether delays were attributable to owner-side defaults (such as delayed right-of-way handover or design approvals) rather than contractor execution.

If the employer or government authority threatens wrongful contract termination or blacklisting, I immediately move the competent Commercial Court or High Court to obtain injunctive relief, protecting both contractor reputation and active project assets.

For bank guarantee protection, I construct focused pleadings satisfying the stringent exceptions established by the Supreme Court—demonstrating egregious fraud or irretrievable injustice—to prevent wrongful encashment.

During arbitration, I lead specialized technical expert evidence using standard delay methodologies (such as Time Impact Analysis or As-Planned vs. As-Built), ensuring claims for idle machinery, head office overheads, and lost profits are comprehensively substantiated with verifiable data.`,
    handlingMethodology: [
      {
        stepNumber: '01',
        title: 'Project Records & Critical Path Dissection',
        description: 'Gathering contemporaneous site logs, measurement sheets, extension of time (EOT) requests, and correspondence to map delays to employer defaults.'
      },
      {
        stepNumber: '02',
        title: 'Bank Guarantee Injunctions & Status Quo Relief',
        description: 'Filing emergency Section 9 applications to stay invocation of performance and financial bank guarantees by project authorities.'
      },
      {
        stepNumber: '03',
        title: 'Quantification of Delay, Idle Machinery & Overheads',
        description: 'Collaborating with technical experts to quantify prolongation costs, Hudson/Emden formula claims, and escalation adjustments.'
      },
      {
        stepNumber: '04',
        title: 'Technical Dispute Board & Arbitral Advocacy',
        description: 'Conducting intensive cross-examination of independent engineers, project directors, and government technical committees.'
      },
      {
        stepNumber: '05',
        title: 'Enforcement Against Statutory & State Bodies',
        description: 'Executing monetary arbitral awards and recovering escalation dues from public sector undertakings and concessionaires.'
      }
    ],
    strategicTactics: [
      'Documenting contemporaneous protest letters whenever site possession is delayed to preserve future EOT and prolongation claims.',
      'Formulating rigorous defenses against liquidated damages deductions where time was rendered at large due to employer variations.',
      'Deploying statutory conciliation mechanisms prior to formal arbitration to unlock undisputed running bills and escrow funds.'
    ],
    faqs: [
      {
        question: 'Can the court stop a government department from encashing an unconditional bank guarantee?',
        answer: 'While courts are generally cautious, injunctions are granted where we demonstrate established fraud, irretrievable injustice, or where the invocation violates express contractual conditions precedent.'
      },
      {
        question: 'How do you prove prolongation costs in construction arbitration?',
        answer: 'We utilize recognized delay methodologies (e.g. As-Planned vs. As-Built Analysis) supported by audited payroll records, machinery hire bills, site overhead logs, and expert witness testimonies.'
      }
    ]
  },
  {
    id: 'commercial-disputes',
    slug: 'commercial-disputes',
    title: 'Commercial Disputes',
    caption: 'COMMERCIAL DISPUTES',
    published: true,
    shortDescription: 'Strategic resolution of contractual breaches, corporate disputes, shareholder oppression, and high-value claims.',
    description: 'We navigate complex commercial disputes for corporations, directors, investors, and high-net-worth individuals. Our practice covers contract breaches, joint venture breakdowns, director disputes, summary suits, and corporate litigation across Commercial Courts, High Courts, and specialized tribunals across India.',
    icon: 'Handshake',
    image: '/images/practice/dispute-resolution.jpeg',
    services: [
      'Commercial suits & summary suits (Order 37 CPC)',
      'Breach of contract & specific performance claims',
      'Shareholder agreements & joint venture disputes',
      'Oppression & mismanagement petitions before NCLT',
      'Enforcement of corporate indemnities & guarantees',
      'Pre-litigation commercial mediation & negotiation',
      'Cross-border trade dispute resolution'
    ],
    keyMatters: [
      'Formulated litigation strategy in complex portfolio claims encompassing ₹100-130 crore in commercial assets.',
      'Represented corporate clients in contractual breaches involving multi-crore supply chain and service agreements.',
      'Secured urgent pre-suit interim injunctions protecting proprietary corporate assets and trade secrets.',
      'Litigated contentious oppression and mismanagement petitions before NCLT principal benches.'
    ],
    approach: 'We align our litigation tactics with our clients\' broader commercial objectives. While we pursue claims aggressively in court, we constantly evaluate windows for advantageous, structured settlements that save executive time and resources.',
    caseHandlingStrategy: `Commercial litigation requires an astute blend of legal technicality and business pragmatism. When a client approaches me with a commercial dispute, my first priority is identifying where the commercial leverage lies.

I begin by reviewing the complete transactional documentation—service agreements, master service pacts, shareholder covenants, purchase orders, and communications—to determine unambiguous liability triggers.

Under the Commercial Courts Act, pre-institution mediation is mandatory in eligible suits. I treat this stage not as a bureaucratic delay, but as a strategic offensive—submitting a devastating legal brief detailing our factual evidence, damages quantum, and cost exposure, which frequently induces early, favorable settlements.

Where litigation is unavoidable, I file meticulously crafted commercial plaints or summary suits under Order 37 of the CPC, moving immediately for interim injunctions, attachment before judgment (Order 38 Rule 5), or deposit of disputed sums into court.

Throughout trial, my advocacy centers on precision witness examination and documentary corroboration, cutting through corporate obfuscation to establish clear breach and liability.`,
    handlingMethodology: [
      {
        stepNumber: '01',
        title: 'Contractual & Transactional Vulnerability Audit',
        description: 'Scrutinizing contracts, representations, warranties, indemnity thresholds, and limitation timelines to establish clear breach triggers.'
      },
      {
        stepNumber: '02',
        title: 'Pre-Institution Mediation & Settlement Strategy',
        description: 'Leveraging mandatory Commercial Courts pre-institution mediation with detailed claims dossiers to force advantageous early settlements.'
      },
      {
        stepNumber: '03',
        title: 'Urgent Pre-Suit Orders & Asset Attachment',
        description: 'Filing Order 38 Rule 5 applications to attach debtor assets before judgment, preventing fraudulent asset transfer.'
      },
      {
        stepNumber: '04',
        title: 'Commercial Court & Appellate Advocacy',
        description: 'Forceful representation before designated Commercial Divisions and High Courts, upholding contractual rights under the Specific Relief Act.'
      },
      {
        stepNumber: '05',
        title: 'Decree Execution & Financial Recovery',
        description: 'Expediting execution proceedings under Order 21 CPC through bank account attachments, garnishee orders, and property auctions.'
      }
    ],
    strategicTactics: [
      'Deploying Order 37 summary procedure for liquidated debts to prevent defendant from obtaining unconditional leave to defend.',
      'Filing simultaneous Section 9 or Section 11 applications where contracts feature overlapping arbitration clauses.',
      'Using garnishee proceedings against third-party debtors of the opposing party to secure swift debt satisfaction.'
    ],
    faqs: [
      {
        question: 'What is the Commercial Courts Act timeline advantage?',
        answer: 'The Commercial Courts Act mandates strict case management hearings, mandatory filing of all documents with the plaint, and tighter deadlines for written statements, drastically reducing litigation delays compared to standard civil suits.'
      },
      {
        question: 'Can you stop a counter-party from siphoning funds during active litigation?',
        answer: 'Yes. We file applications for Attachment Before Judgment under Order 38 Rule 5 or seek interim injunctions under Order 39 to restrain the alienation of assets or mandate court deposits.'
      }
    ]
  },
  {
    id: 'insolvency-financial-distress',
    slug: 'insolvency-financial-distress',
    title: 'Insolvency & Financial Distress',
    caption: 'INSOLVENCY & FINANCIAL DISTRESS',
    published: true,
    shortDescription: 'Navigating the IBC framework for creditors and debtors facing insolvency, CIRP, and corporate liquidation.',
    description: 'We provide specialized legal counsel under the Insolvency and Bankruptcy Code (IBC). We represent financial creditors, operational creditors, and corporate debtors across Corporate Insolvency Resolution Processes (CIRP), liquidation proceedings, and pre-packaged insolvency regimes before NCLT and NCLAT.',
    icon: 'ShieldAlert',
    image: '/images/practice/insolvency.jpeg',
    services: [
      'Initiation of CIRP by Financial Creditors (Section 7 IBC)',
      'Operational Creditor petitions & Section 8 demand notices (Section 9 IBC)',
      'Corporate Debtor self-initiation & defense strategies (Section 10 IBC)',
      'Representation before National Company Law Tribunal (NCLT & NCLAT)',
      'Advising Committee of Creditors (CoC) & Resolution Professionals',
      'Resolution plan evaluation & compliance vetting',
      'Avoidance application litigation (PUFE transactions under Section 43-66)'
    ],
    keyMatters: [
      'Experience includes initiating and defending CIRP applications for major financial institutions and high-value operational creditors.',
      'Successfully defended corporate debtors against frivolous and time-barred Section 9 IBC petitions.',
      'Advised resolution applicants on structured resolution plans for stressed mid-market manufacturing enterprises.',
      'Litigated complex priority-of-claim and preferential transaction matters before NCLAT.'
    ],
    approach: 'Our approach in insolvency matters is highly time-sensitive and strategic, aiming to leverage the stringent timelines and statutory shields of the IBC to protect stakeholder value and resolve financial distress decisively.',
    caseHandlingStrategy: `The Insolvency and Bankruptcy Code is an exceptional forum of immense commercial leverage where procedural missteps can prove catastrophic. My case handling strategy under the IBC is driven by speed, statutory compliance, and commercial realism.

For Financial Creditors (Banks and NBFCs), I formulate airtight Section 7 petitions supported by verifiable Record of Default (RoD) from the Information Utility (NeSL), loan sanctions, and statement of accounts, eliminating any scope for corporate debtor dispute.

For Operational Creditors, I draft and serve legally immaculate Section 8 statutory demand notices. I meticulously pre-empt and refute any 'pre-existing dispute' defenses by compiling complete correspondence histories, acceptance of goods, and undisputed invoices.

When defending Corporate Debtors, my strategy focuses on demonstrating pre-existing disputes, bar by limitation, defect in demand notices, or abuse of the insolvency process for debt recovery rather than resolution. Simultaneously, I work with promoters to explore Section 12A withdrawal avenues through structured settlement before the Committee of Creditors is formed.

Throughout the CIRP, I actively represent stakeholders before the NCLT and NCLAT, safeguarding voting rights, contesting undervalued or fraudulent transactions (PUFE), and ensuring resolution plans strictly adhere to Section 30(2) requirements.`,
    handlingMethodology: [
      {
        stepNumber: '01',
        title: 'Default Verification & NeSL Documentation Audit',
        description: 'Verifying default thresholds (₹1 crore minimum), authentication of debt through NeSL filings, and checking limitation applicability.'
      },
      {
        stepNumber: '02',
        title: 'Statutory Section 8 Demand & Notice Management',
        description: 'Drafting structured demand notices for operational debts and establishing the absence of any bona fide pre-existing dispute.'
      },
      {
        stepNumber: '03',
        title: 'NCLT Petition Filing & Admission Advocacy',
        description: 'Filing Section 7, 9, or 10 petitions before NCLT benches and presenting rigorous oral arguments on debt existence and default occurrence.'
      },
      {
        stepNumber: '04',
        title: 'Moratorium Management & CoC Representation',
        description: 'Advising on Section 14 moratorium protections, voting thresholds in Committee of Creditors meetings, and Resolution Plan scrutiny.'
      },
      {
        stepNumber: '05',
        title: 'Section 12A Settlement or NCLAT Appellate Appeals',
        description: 'Facilitating withdrawal of insolvency through 90% CoC settlement votes or prosecuting urgent appeals before NCLAT against admission orders.'
      }
    ],
    strategicTactics: [
      'Serving statutory notices that leave no window for the corporate debtor to manufacture frivolous pre-existing disputes.',
      'Using Section 12A mechanisms to negotiate full commercial settlements without losing company management to an IRP.',
      'Filing urgent caveats before NCLAT to prevent ex-parte stays on favorable admission orders.'
    ],
    faqs: [
      {
        question: 'What is the minimum threshold for filing an insolvency petition under IBC?',
        answer: 'The minimum default threshold is ₹1 Crore (under Section 4 of the IBC) for both financial and operational creditors.'
      },
      {
        question: 'What happens immediately once an insolvency petition is admitted?',
        answer: 'Upon admission, the NCLT imposes a statutory Moratorium under Section 14 pausing all court and recovery proceedings against the corporate debtor, and appoints an Interim Resolution Professional (IRP) who takes over management.'
      },
      {
        question: 'Can a matter be settled after an IBC petition is admitted by the NCLT?',
        answer: 'Yes. Under Section 12A of the IBC and Regulation 30A, an application can be withdrawn with the approval of 90% voting share of the Committee of Creditors (CoC) or through settlement with the applicant creditor before CoC constitution.'
      }
    ]
  },
  {
    id: 'capital-markets',
    slug: 'capital-markets',
    title: 'Capital Markets',
    caption: 'CAPITAL MARKETS',
    published: false,
    shortDescription: 'Placeholder: description to be provided.',
    description: 'Placeholder: practice description to be provided.',
    representativeScale: null,
    icon: 'Landmark',
    image: '/images/practice/capital.jpeg',
    services: ['Placeholder: services to be provided.'],
    keyMatters: ['Placeholder: representative matters to be provided.'],
    approach: 'Placeholder: approach to be provided.',
    caseHandlingStrategy: 'Placeholder: case-handling strategy to be provided.',
    handlingMethodology: [
      {
        stepNumber: '01',
        title: 'Placeholder',
        description: 'Placeholder: handling methodology to be provided.'
      }
    ],
    strategicTactics: ['Placeholder: strategic tactics to be provided.'],
    faqs: [
      {
        question: 'Placeholder: question to be provided.',
        answer: 'Placeholder: answer to be provided.'
      }
    ]
  },
  {
    id: 'financial-regulatory',
    slug: 'financial-regulatory',
    title: 'Financial & Regulatory',
    caption: 'FINANCIAL & REGULATORY',
    published: false,
    shortDescription: 'Placeholder: description to be provided.',
    description: 'Placeholder: practice description to be provided.',
    representativeScale: null,
    icon: 'Scale',
    image: '/images/practice/financial-regulatory.jpeg',
    services: ['Placeholder: services to be provided.'],
    keyMatters: ['Placeholder: representative matters to be provided.'],
    approach: 'Placeholder: approach to be provided.',
    caseHandlingStrategy: 'Placeholder: case-handling strategy to be provided.',
    handlingMethodology: [
      {
        stepNumber: '01',
        title: 'Placeholder',
        description: 'Placeholder: handling methodology to be provided.'
      }
    ],
    strategicTactics: ['Placeholder: strategic tactics to be provided.'],
    faqs: [
      {
        question: 'Placeholder: question to be provided.',
        answer: 'Placeholder: answer to be provided.'
      }
    ]
  }
];
