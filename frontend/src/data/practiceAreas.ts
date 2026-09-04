export type HandlingStep = {
  stepNumber: string;
  title: string;
  description: string;
};

export type PracticeArea = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  services: string[];
  keyMatters: string[];
  approach: string;
  caseHandlingStrategy: string;
  handlingMethodology: HandlingStep[];
  strategicTactics: string[];
  faqs: { question: string; answer: string }[];
};

export const practiceAreas: PracticeArea[] = [
  {
    id: 'banking-finance',
    slug: 'banking-finance',
    title: 'Banking & Finance',
    shortDescription: 'Comprehensive legal counsel for banking sector disputes, recovery strategies, facility enforcement, and regulatory compliance.',
    description: 'Our Banking & Finance practice offers robust legal counsel across complex lending arrangements, security enforcement, and high-stakes financial disputes. We regularly represent scheduled commercial banks, financial institutions, NBFCs, and corporate borrowers across loan documentation, regulatory compliance, and multi-crore recovery proceedings.',
    icon: 'Landmark',
    image: '/images/practice/banking-finance.jpg',
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
      'Representing premier banks (HDFC, Axis, SBI, ICICI, Kotak) in multi-crore loan recovery suits.',
      'Enforcing secured mortgages and asset possession under the SARFAESI framework across diverse jurisdictions.',
      'Drafting and evaluating syndicated credit facilities and consortium inter-creditor pacts.',
      'Defending borrowers against premature NPA classifications and high-handed institutional measures.'
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
    shortDescription: 'Strategic advice on restructuring stressed assets, one-time settlements (OTS), and sustainable debt realignment.',
    description: 'We provide specialized legal services for the resolution of stressed assets and corporate debt restructuring. Our practice encompasses negotiating restructuring master agreements, formulating one-time settlement (OTS) proposals, facilitating consortium buy-outs, and advising on inter-creditor dynamics to revive distressed businesses while safeguarding creditor returns.',
    icon: 'Briefcase',
    image: '/images/practice/debt-restructuring.jpg',
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
      'Formulating strategy for multi-lender stressed infrastructure exposure involving approximately ₹85 crore in debt.',
      'Negotiating and executing binding One-Time Settlement agreements with scheduled commercial banks.',
      'Advising promoter groups on protecting personal guarantees through structured equity dilution and debt amortization.',
      'Structuring asset sales and bridge financing to avoid insolvency admission.'
    ],
    approach: 'Our approach focuses on preserving the core enterprise value of the business while achieving sustainable financial resolution. We balance aggressive legal positions with pragmatic commercial negotiations to deliver win-win outcomes.',
    caseHandlingStrategy: `My handling of debt restructuring cases begins with an objective assessment of the debtor's cash-flow viability versus the legal leverage held by the lending consortium. 

In my experience, restructuring succeeds only when legal defensibility is paired with financial credibility. When representing lenders, I scrutinize proposed resolution plans to guarantee that security margins remain intact, personal guarantees are fortified, and escrow/cash-flow waterfall arrangements are enforceable.

When representing corporate clients or promoters seeking relief, I conduct an immediate review of sanction letters, interest calculations, and bank actions to identify procedural vulnerabilities that can be leveraged during negotiation. I then prepare comprehensive, commercially feasible One-Time Settlement (OTS) proposals backed by transparent valuation reports and verifiable capital injection timelines.

Throughout the process, I maintain an active line of communication with consortium lead banks, drafting customized Inter-Creditor Agreements (ICAs) and tripartite covenants that provide complete legal immunity against future litigation upon compliance with agreed settlement parameters.`,
    handlingMethodology: [
      {
        stepNumber: '01',
        title: 'Viability & Legal Exposure Audit',
        description: 'Comprehensive analysis of existing loan covenants, debt servicing records, encumbered collateral values, and potential guarantor exposures.'
      },
      {
        stepNumber: '02',
        title: 'Consortium & Inter-Creditor Alignment',
        description: 'Reviewing inter-creditor pacts and consensus thresholds among consortium members under RBI guidelines to ensure unified decision-making.'
      },
      {
        stepNumber: '03',
        title: 'Structuring Pragmatic OTS / Restructuring Plans',
        description: 'Formulating structured OTS terms featuring milestone payments, debt-to-equity conversions, or asset carve-outs with airtight non-revocation clauses.'
      },
      {
        stepNumber: '04',
        title: 'Bilateral & Multi-Lender Negotiation',
        description: 'Direct representation before bank management committees, presenting legal safeguards, risk allocations, and mutually beneficial settlement terms.'
      },
      {
        stepNumber: '05',
        title: 'Execution of Binding Settlement Documents',
        description: 'Drafting conclusive Settlement Deeds, No Dues Certificates (NDC), satisfaction of charges before RoC/CERSAI, and retrieval of original title deeds.'
      }
    ],
    strategicTactics: [
      'Establishing clear milestone escrow mechanisms to instill creditor confidence during phased repayments.',
      'Preventing premature SARFAESI or IBC action through formal standstill pacts while negotiations are underway.',
      'Securing complete release and discharge of personal guarantees upon fulfillment of agreed settlement thresholds.'
    ],
    faqs: [
      {
        question: 'What makes a One-Time Settlement (OTS) proposal acceptable to banks?',
        answer: 'Banks require an upfront earnest money deposit, a credible source of funds, independent asset valuation, and proof that the proposed settlement yields higher and faster recovery than prolonged DRT/IBC liquidation.'
      },
      {
        question: 'Can a bank revoke an approved OTS?',
        answer: 'Yes, if the borrower defaults on agreed payment schedules or commits material misrepresentation. We draft robust covenants specifying grace periods and cure notices to safeguard the settlement from arbitrary cancellation.'
      }
    ]
  },
  {
    id: 'arbitration-dispute-resolution',
    slug: 'arbitration-dispute-resolution',
    title: 'Arbitration & Dispute Resolution',
    shortDescription: 'Focused representation in commercial arbitration, emergency interim reliefs, and post-award enforcement strategies.',
    description: 'Our Arbitration & Dispute Resolution practice is a core pillar of the chambers. We handle high-stakes domestic and international commercial arbitrations across construction, energy, cross-border commerce, and financial claims. From invoking arbitration and securing urgent Section 9 interim reliefs to arbitral hearings and enforcing awards under Section 36, we deliver decisive results.',
    icon: 'Scale',
    image: '/images/practice/arbitration.jpg',
    services: [
      'Domestic & international commercial arbitration',
      'Emergency interim relief (Section 9 & Section 17)',
      'Arbitrator appointments & jurisdiction challenges (Section 11 & Section 16)',
      'Airtight drafting of statements of claim & defense',
      'Cross-examination of financial & technical expert witnesses',
      'Post-award challenges (Section 34) & execution proceedings (Section 36)',
      'Enforcement of foreign arbitral awards under the New York Convention'
    ],
    keyMatters: [
      'Formulated litigation and arbitration strategy in multiple portfolio disputes encompassing ₹100-130 crore in commercial claims.',
      'Drafted and processed comprehensive cross-border demand notices and international arbitration claims exceeding USD 1 million.',
      'Obtained critical ex-parte interim protections under Section 9, preventing the unlawful encashment of bank guarantees.',
      'Successfully prosecuted and defended Section 34 petitions before High Courts maintaining award sanctity.'
    ],
    approach: 'We believe in a highly structured, evidence-backed approach to arbitration. By focusing on meticulous record reconstruction, evidentiary discipline, and persuasive oral advocacy, we resolve disputes decisively while eliminating procedural waste.',
    caseHandlingStrategy: `Arbitration is won or lost during the evidentiary groundwork. When entrusted with an arbitration matter, I do not wait for the arbitral tribunal to be constituted before establishing strategic dominance.

Immediately upon receiving a dispute, I assemble a chronological master dossier cross-linking every email, contractual milestone, variation order, and payment voucher. This allows me to establish an unassailable factual narrative from day one.

Where client assets or contractual rights are under imminent peril, I promptly move the competent High Court or Commercial Court under Section 9 of the Arbitration and Conciliation Act to secure emergency injunctions, asset freezing, or orders restraining bank guarantee invocation.

In the arbitral proceedings, my pleadings are structured with surgical precision—pinpointing breach triggers, contractual indemnities, and quantified damages backed by certified forensic accounting. During the evidentiary stage, I conduct rigorous cross-examination aimed at dismantling opposing witness credibility on contemporaneous records.

Following the pronouncement of the arbitral award, I immediately initiate execution proceedings under Section 36 or construct ironclad defenses against Section 34 set-aside petitions, ensuring the arbitral victory translates into actual financial realization.`,
    handlingMethodology: [
      {
        stepNumber: '01',
        title: 'Arbitration Clause Audit & Master Chronology',
        description: 'Analyzing dispute resolution clauses, seat versus venue nuances, governing law, and preparing a contemporaneous factual matrix.'
      },
      {
        stepNumber: '02',
        title: 'Emergency Injunctions & Section 9 Interim Relief',
        description: 'Securing urgent High Court/Commercial Court protection against asset dissipation, wrongful contract termination, or encashment of guarantees.'
      },
      {
        stepNumber: '03',
        title: 'Tribunal Constitution & Procedural Hearings',
        description: 'Filing Section 11 petitions where necessary, establishing procedural timetables, and framing precise, focused issues under Section 19.'
      },
      {
        stepNumber: '04',
        title: 'Pleadings & Forensic Evidentiary Cross-Examination',
        description: 'Submitting exhaustive statements of claim/defense, managing technical delay reports, and leading incisive witness cross-examination.'
      },
      {
        stepNumber: '05',
        title: 'Award Defense (Sec 34) & Enforcement (Sec 36)',
        description: 'Defending awards against frivolous public policy challenges and initiating prompt asset attachment proceedings for decree realization.'
      }
    ],
    strategicTactics: [
      'Drafting precise Section 21 invocation notices that strictly adhere to limitation periods and define the full scope of claim damages.',
      'Deploying Section 17 applications before the tribunal for security deposits or inspection of contested project machinery.',
      'Aggressive enforcement of foreign arbitral awards under Part II of the Arbitration Act across Indian jurisdictions.'
    ],
    faqs: [
      {
        question: 'How quickly can I secure interim protection before arbitration begins?',
        answer: 'Under Section 9 of the Arbitration Act, urgent interim applications can be listed and heard before the High Court or Commercial Court within 24 to 72 hours in cases of imminent harm such as bank guarantee encashment or asset disposal.'
      },
      {
        question: 'What grounds are permitted to challenge an arbitral award under Indian law?',
        answer: 'Following the 2015 and 2019 amendments, grounds for challenging domestic awards under Section 34 are strictly limited to patent illegality on the face of the award, fundamental policy of Indian law, lack of jurisdiction, or breach of natural justice.'
      },
      {
        question: 'Can foreign arbitral awards be enforced against assets in India?',
        answer: 'Yes. Awards issued in reciprocating territories under the New York Convention are directly enforceable in Indian High Courts as deemed court decrees under Section 47 to 49 of the Act.'
      }
    ]
  },
  {
    id: 'project-infrastructure-disputes',
    slug: 'project-infrastructure-disputes',
    title: 'Project & Infrastructure Disputes',
    shortDescription: 'Specialized counsel for construction delays, EPC contracts, concession terminations, and infrastructure conflicts.',
    description: 'Infrastructure and major engineering projects involve substantial capital exposure and intricate multi-layered contracts. We represent developers, concessionaires, EPC contractors, and institutional lenders in complex disputes involving delay claims, force majeure, liquidated damages, design variations, and wrongful contract terminations.',
    icon: 'Building2',
    image: '/images/practice/infrastructure-disputes.jpg',
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
    shortDescription: 'Strategic resolution of contractual breaches, corporate disputes, shareholder oppression, and high-value claims.',
    description: 'We navigate complex commercial disputes for corporations, directors, investors, and high-net-worth individuals. Our practice covers contract breaches, joint venture breakdowns, director disputes, summary suits, and corporate litigation across Commercial Courts, High Courts, and specialized tribunals across India.',
    icon: 'Handshake',
    image: '/images/practice/commercial-disputes.jpg',
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
    shortDescription: 'Navigating the IBC framework for creditors and debtors facing insolvency, CIRP, and corporate liquidation.',
    description: 'We provide specialized legal counsel under the Insolvency and Bankruptcy Code (IBC). We represent financial creditors, operational creditors, and corporate debtors across Corporate Insolvency Resolution Processes (CIRP), liquidation proceedings, and pre-packaged insolvency regimes before NCLT and NCLAT.',
    icon: 'ShieldAlert',
    image: '/images/practice/insolvency.jpg',
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
  }
];
