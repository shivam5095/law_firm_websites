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
  selectedAnalysis?: { title: string; text: string | [string, string, string] }[];
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
    shortDescription: 'Where the construction contract meets the loan agreement.',
    description: `India is in the middle of one of the largest infrastructure build-outs in its history, across roads, real estate, urban works and industrial projects. Every one of these projects rests on two sets of documents that are rarely read together, the contract that governs the work and the finance that pays for it. When a project slips, the consequences travel from one to the other. A delay on site becomes a claim, an unpaid claim becomes a cash flow gap, and the gap becomes a default under the loan.

Our practice works at that junction. We advise contractors, sub-contractors, developers, project companies and lenders on the disputes that most often derail a project. These include delay and disruption, force majeure and change in law, termination, and liquidated damages. In each case we advise on how the dispute affects debt servicing, lender rights and the enforceability of security. We act for established project companies with multi-lender exposure, and equally for smaller contractors whose entire working capital may depend on a single unpaid claim.

Most infrastructure disputes are decided in arbitration, and most arbitrations are decided on the record. We build that record from the first notice, with one eye on the tribunal and the other on the lenders who will read the outcome.`,
    pullQuote: '“Projects are built on concrete. Their disputes are built on paper.”',
    legalFramework: [
      'Infrastructure disputes are governed principally by the Arbitration and Conciliation Act, 1996, as amended in 2015, 2019 and 2021, and by the Indian Contract Act, 1872, whose provisions on frustration, damages and penalty clauses decide most claims for delay and liquidated damages. The Specific Relief Act, 1963, as amended in 2018, restricts injunctions that would impede or delay infrastructure projects and provides for special courts to hear infrastructure contract disputes. Commercial claims proceed under the Commercial Courts Act, 2015.',
      'The particular project often brings its own legislation into play. Highway works are shaped by the National Highways Act, 1956 and the National Highways Authority of India Act, 1988. Projects that depend on acquired land are shaped by the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, and real estate developments by the Real Estate (Regulation and Development) Act, 2016. On the financing side, lender rights are enforced through the SARFAESI Act, 2002, the Recovery of Debts and Bankruptcy Act, 1993 and the Insolvency and Bankruptcy Code, 2016.'
    ],
    whatWeDo: [
      'We reconstruct what actually happened on a project from its milestones, correspondence, approvals and site records, because the party with the better chronology usually has the better claim. We draft and defend claims for delay, disruption, extension of time and termination, advise on force majeure and change in law, and analyse how each claim interacts with the project’s financing documents.',
      'For lenders and borrowers, we assess default triggers, acceleration rights and the enforceability of security and guarantees across lender groups. Throughout, we keep a commercial settlement open wherever it would serve the client better than an award.'
    ],
    perspective: [
      'The 2018 amendments to the Specific Relief Act made it far harder to halt an infrastructure project by injunction. In practice, this has moved the weight of every project dispute towards damages and arbitration, and the parties who build their record from the first day of a delay are the ones who recover. Our founder examined these questions in ',
      'Arbitrating Construction Disputes in India',
      ', published in the Journal of Alternative Dispute Resolution.'
    ],
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
      `Untangling an ₹85 crore infrastructure exposure across a lender group\n\nA stressed infrastructure borrower faced a group of banks and NBFCs, each holding its own facility, security and remedies. In consortium lending, a default under one facility rarely stays there, because cross-default and acceleration clauses can bring every lender to the table at once and turn a recoverable problem into a collapse. We tested which default triggers had genuinely been met, which acceleration rights were actually enforceable, and how far each lender’s security and guarantees could withstand scrutiny. The restructuring and recovery strategy was built around those answers, and the result was a plan grounded in what each lender could really enforce, rather than what each lender assumed it could.`,
      `Construction claims worth ₹20 crore to ₹25 crore\n\nThese project finance and construction disputes turned on delay, force majeure, termination and liquidated damages. The approach that resolved them was to treat each claim not only as a contract question but as a financing one. The effect of a claim on debt servicing and lender rights often decided what each party could realistically accept, and once that was understood, the negotiation could move. These matters were resolved through arbitration-led commercial settlement, without the years of uncertainty a contested award would have brought to the project and its lenders.`,
      `Securing the ground before the project begins\n\nIn infrastructure and real estate, land is the first risk and often the last to be resolved. Our work on land acquisition, title review and property transactions across Telangana, Andhra Pradesh, Haryana and Bihar gives project clients a clear picture of title, encumbrances and acquisition risk before capital is committed. A defect found at this stage costs a fraction of what it costs once construction has begun.`
    ],
    approach: 'Our approach integrates deep legal insight with rigorous technical comprehension. We work closely with delay analysts, quantity surveyors, and project engineers to build airtight, calculation-backed claims that withstand judicial and arbitral scrutiny.',
    caseHandlingStrategy: '',
    handlingMethodology: [],
    strategicTactics: [],
    faqs: []
  },
  {
    id: 'commercial-disputes',
    slug: 'commercial-disputes',
    title: 'Commercial Disputes',
    caption: 'COMMERCIAL DISPUTES',
    published: true,
    shortDescription: 'Resolution by the route that serves the client.',
    description: `Every commercial dispute begins as a relationship that stopped working, between partners, between a business and its distributors, between a buyer and a supplier, or between parties in different countries. By the time it reaches a lawyer, positions have hardened and costs have started to rise. The first question we ask is not which forum to file in, but what a good outcome looks like for the client’s business.

We act in arbitration, before commercial courts and in mediation, and we negotiate settlements wherever that serves the client better than a contested hearing. We represent established businesses, MSMEs, partners and investors in contract and recovery disputes. We also act for Non-Resident Indian clients in cross-border matters, including the enforcement of foreign settlements against property in India and expert evidence on Indian law before foreign courts.

Arbitration sits at the centre of the practice. Our founder trained in alternative dispute resolution at NALSAR University of Law, studied international arbitration with Leiden University and trained with the Chartered Institute of Arbitrators, London. He has sat as an arbitrator for the Asia Pacific Vis Pre-Moot 2026, judging rounds of one of the world’s leading international commercial arbitration competitions. His published work includes analysis of the Supreme Court’s approach under Sections 34 and 37 and of res judicata under Sections 9 and 17 of the Arbitration and Conciliation Act, 1996.`,
    pullQuote: '“Most disputes are won in the documents, long before they are argued.”',
    legalFramework: [
      'The procedure of commercial dispute resolution in India is set by the Arbitration and Conciliation Act, 1996, the Commercial Courts Act, 2015 and the Mediation Act, 2023. The Commercial Courts Act requires pre-institution mediation in commercial suits that do not seek urgent interim relief. The Code of Civil Procedure, 1908 also governs these disputes, including its provisions for summary suits and for the execution of foreign decrees.',
      'The substantive rights in these disputes are drawn from the Indian Contract Act, 1872, the Specific Relief Act, 1963 as amended in 2018, the Sale of Goods Act, 1930, the Indian Partnership Act, 1932 and the Limited Liability Partnership Act, 2008. Evidence is now governed by the Bharatiya Sakshya Adhiniyam, 2023, limitation by the Limitation Act, 1963, and settlements before Lok Adalats by the Legal Services Authorities Act, 1987.'
    ],
    whatWeDo: [
      'We prepare every dispute as if it will reach a final hearing, because that preparation is also what produces the best settlements. Our work runs the full course of a dispute, from sending or answering the notice that invokes arbitration and securing interim protection, through drafting pleadings and evidence and objecting to improper arbitrator appointments, to the challenge or enforcement of the final award.',
      'We conduct commercial recovery against partners, distributors and buyers, including where a counterparty is moving towards winding up. For clients abroad, we work alongside foreign counsel so that a judgment or settlement obtained overseas can actually be enforced against assets in India.'
    ],
    perspective: [
      'Indian courts have steadily narrowed the grounds on which an arbitral award can be set aside. A party’s best chance now lies in getting the arbitration right, not in challenging the result afterwards. Our founder’s analysis of this shift, ',
      'Judicial Minimalism in Arbitration',
      ', was published in the All India Commercial Law Review in March 2026.'
    ],
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
      `Giving evidence on Indian law before a United States court\n\nIn a cross-border property dispute worth about ₹15 crore, our founder appeared by video from New Delhi as an independent expert on Indian law before a Superior Court in the State of Georgia, USA. His evidence covered title, transfer, documentation and the enforceability of rights over property situated in India. The central point was one that foreign courts and counsel often underestimate. A settlement concluded abroad does not by itself transfer title to land in India. It must be given effect under Indian law, through registered conveyances, lender consents and, where necessary, Indian proceedings. The firm is now enforcing that settlement against a residential apartment, a commercial space and agricultural land in and around Hyderabad. It is also structuring the release of a co-borrower from a bank home loan, so that each asset can be sold or retained with clean title.`,
      `Arbitrations that ended in settlement\n\nAcross a body of commercial arbitrations in which we drafted notices and pleadings under Sections 21 and 30 of the Arbitration and Conciliation Act, 1996, between 40% and 50% of matters closed in commercial settlement. That figure reflects a deliberate method rather than chance. A well-prepared claim gives the other side a clear view of its own risk, and a clear view of risk is what brings parties to terms long before an award is needed.`,
      `Recovering value from a broken distribution chain\n\nFor a Mumbai apparel business, we are pursuing recovery on several fronts at once. The claims run against a former partner, against dealers and agents holding unpaid dues, and against a buyer moving towards winding up. Each counterparty calls for a different forum and a different timetable. The buyer in particular has to be pursued before its assets are frozen in a formal process. We are coordinating every track so that a gain against one counterparty is never undone by delay against another.`
    ],
    approach: 'We align our litigation tactics with our clients\' broader commercial objectives. While we pursue claims aggressively in court, we constantly evaluate windows for advantageous, structured settlements that save executive time and resources.',
    caseHandlingStrategy: '',
    handlingMethodology: [],
    strategicTactics: [],
    faqs: []
  },
  {
    id: 'insolvency-financial-distress',
    slug: 'insolvency-financial-distress',
    title: 'Insolvency & Financial Distress',
    caption: 'INSOLVENCY & FINANCIAL DISTRESS',
    published: true,
    shortDescription: 'Acting before the process acts.',
    description: `The Insolvency and Bankruptcy Code, 2016 changed the balance of power between borrowers and creditors in India. Once a company defaults beyond the statutory threshold, its management can be displaced, its creditors take control of its future, and its promoters and personal guarantors can face proceedings of their own. The decisions taken in the weeks before and after that point usually decide what is recovered, what is preserved and who bears the loss.

We advise financial and operational creditors on whether and when to invoke the Code, and promoters, directors and personal guarantors on their exposure and their options. For many clients, especially MSMEs and family businesses, the most valuable advice is how to avoid formal insolvency altogether through a timely restructuring or settlement, and we say so when it is true. For others, a well-run process under the Code is the best route to value, and we help them use it well.

Insolvency rarely stands alone. It interacts with recovery proceedings, arbitration and security enforcement, and increasingly with assets and creditors abroad. Our insolvency advice draws on our banking, restructuring and commercial disputes practices, so that a client’s position in one forum is never weakened by a step taken in another.`,
    pullQuote: '“Insolvency is not the end of a business. It is the moment its value is decided.”',
    legalFramework: [
      'The core of this practice is the Insolvency and Bankruptcy Code, 2016, read with the regulations of the Insolvency and Bankruptcy Board of India and the rules governing the insolvency of personal guarantors to corporate debtors. The Insolvency and Bankruptcy Code (Amendment) Act, 2026 has reshaped this landscape further. It introduces a creditor-initiated insolvency process and lays the legislative foundation for group insolvency and for cross-border insolvency, although several of these provisions are not yet in force.',
      'Insolvency never operates in isolation from the rest of commercial law. It interacts closely with the Companies Act, 2013, particularly its provisions on schemes of arrangement and winding up, with the enforcement and recovery regimes under the SARFAESI Act, 2002 and the Recovery of Debts and Bankruptcy Act, 1993, and with RBI’s prudential framework for the resolution of stressed assets issued under the Banking Regulation Act, 1949.'
    ],
    whatWeDo: [
      'We assess a client’s position under the Code at the earliest stage, including whether a default has occurred, whether the threshold is met and what the other side is likely to do next. For creditors, this means advice on applications, on the filing of claims and on how those claims will be treated in the resolution process. For promoters and guarantors, it means a clear account of their exposure, of the protection the moratorium does and does not offer them, and of the terms on which a repayment plan may be proposed.',
      'Where a negotiated outcome would preserve more value, we pursue it before the Code is invoked. Where a process has begun, we make sure every claim, objection and reply is filed within the time the Code allows.'
    ],
    perspective: 'Promoters once treated personal guarantees as a formality. Under the Code, they are among the most consequential documents a promoter will ever sign, because the moratorium that protects the company does not, by itself, protect its guarantors.',
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
      `Keeping a nine-lender business out of formal insolvency\n\nWhen an apparel business in Gujarat faced 9 credit facilities in default, each lender held its own route to coercive recovery, and the pressure from every side was pushing the business towards collapse. The question was whether value could be preserved without a formal process. We brought every lender into one strategy, exposed the legal weaknesses in their arbitration track, and secured settlements at about 30% of principal. The business continued operating, its promoters kept control, and no lender had to wait years for an uncertain recovery.`,
      `Weighing restructuring against the Code in an ₹85 crore exposure\n\nFor a stressed infrastructure borrower facing a lender group, the cross-default and acceleration rights in the consortium documents meant that a formal process was a real possibility. We assessed which lenders could genuinely enforce, how far their security and guarantees would hold, and what each side stood to recover in a negotiated restructuring compared with a formal insolvency. That analysis shaped a restructuring and recovery strategy built on the realistic value of the business rather than on its distressed sale value.`,
      `Resolving ₹100 crore to ₹130 crore of stress outside the tribunal\n\nAcross stressed portfolios aggregating ₹100 crore to ₹130 crore, our restructuring, consolidation, refinancing and settlement work resolved exposure that could otherwise have ended before the National Company Law Tribunal. In most of these matters, a negotiated outcome recovered more and recovered it sooner than a formal process would have done.`
    ],
    selectedAnalysis: [
      {
        title: 'What the Subhash Chandra order costs Indian banking',
        text: [
          'Our founder’s analysis of the repayment plan proceedings in ',
          'Indiabulls Housing Finance v. Dr. Subhash Chandra',
          ', a personal guarantor insolvency, was published in The Bar Bulletin in September 2026. It examined what such outcomes mean for banks that lend against personal guarantees, for regulators, and for promoters who stand behind corporate debt.'
        ]
      },
      {
        title: 'India’s cross-border insolvency gap',
        text: 'The 2026 amendment gives the Central Government power to frame rules for cross-border insolvency. Until those rules are notified, Indian tribunals continue to rely on case-by-case protocols when a debtor’s assets or creditors sit abroad. Our founder’s analysis of the framework was published in The Bar Bulletin in May 2026.'
      },
      {
        title: 'Where arbitration meets insolvency',
        text: [
          '',
          'Navigating the Interplay between Arbitration and Insolvency in International Disputes',
          ', published by the International Arbitration and Mediation Centre, Hyderabad, examined what happens to an arbitration when one party enters insolvency.'
        ]
      }
    ],
    approach: 'Our approach in insolvency matters is highly time-sensitive and strategic, aiming to leverage the stringent timelines and statutory shields of the IBC to protect stakeholder value and resolve financial distress decisively.',
    caseHandlingStrategy: '',
    handlingMethodology: [],
    strategicTactics: [],
    faqs: []
  },
  {
    id: 'capital-markets',
    slug: 'capital-markets',
    title: 'Capital Markets',
    caption: 'CAPITAL MARKETS',
    published: false,
    shortDescription: 'Capital raised on terms that hold.',
    description: `India’s capital markets now reach far beyond the stock exchanges. Founders raise early capital from angels and funds, family businesses bring in private investors, property groups combine bank debt with mezzanine and fund money, and companies continue to list even when markets fall. In every case, the terms agreed at the point of investment decide who controls the business, who is paid first when things go wrong, and what each party can do about it.

Our Capital Markets practice advises founders, early-stage companies, promoters, family businesses and investors on how capital is raised, structured and documented, and on the SEBI framework that governs it. The work is closely tied to our structured and mezzanine finance practice, where equity, debt and hybrid instruments must sit together inside one financing structure without undermining each other.

We read investor documents the way we read loan documents, for the day they will be tested. Control rights, liquidation preferences, anti-dilution protection, exit rights and information rights are easy to accept when a deal is being celebrated and very hard to change once the relationship is under strain.`,
    pullQuote: '“Capital moves on trust. Our work is to make that trust enforceable.”',
    legalFramework: [
      'This practice operates within the statutory architecture of the Securities and Exchange Board of India Act, 1992, the Securities Contracts (Regulation) Act, 1956 and the Depositories Act, 1996, together with the Companies Act, 2013 and its provisions on private placement and the further issue of capital.',
      'Beneath these statutes sits the body of SEBI regulation that governs how capital is actually raised and held. The SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018 govern public issues. The SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015 govern listed companies. Investment funds are regulated by the SEBI (Alternative Investment Funds) Regulations, 2012, and changes in control by the SEBI (Substantial Acquisition of Shares and Takeovers) Regulations, 2011. The SEBI (Prohibition of Insider Trading) Regulations, 2015 govern dealings on price-sensitive information, and the SEBI (Issue and Listing of Non-Convertible Securities) Regulations, 2021 govern debt securities. Foreign investment is governed by the Foreign Exchange Management Act, 1999 and the Foreign Exchange Management (Non-Debt Instruments) Rules, 2019.'
    ],
    whatWeDo: [
      'We advise founders and early-stage companies on funding structures, term sheets and investor documentation, and investors on the protections they need. We structure mezzanine, hybrid and fund capital for real estate and growing businesses, advise on the SEBI framework for alternative investment funds and capital raising, and help clients understand their rights and obligations as promoters and shareholders, including when the business is under financial stress.'
    ],
    icon: 'Landmark',
    image: '/images/practice/capital.jpeg',
    services: [],
    keyMatters: [
      `Fund and mezzanine capital in a ₹200 crore financing\n\nIn structuring the financing of a commercial property portfolio in Ahmedabad and Goa valued at over ₹200 crore, the defining question was how fund and mezzanine investors could enter alongside senior bank debt. They had to do so without compromising the lender’s security or their own expected returns. The answer lay in the sequencing of each layer of capital and in the documents that define its rights, priorities and exits. The result was a capital stack in which every investor understood its position before a single rupee was committed.`,
      `Putting stressed capital back to work\n\nAcross stressed portfolios aggregating ₹100 crore to ₹130 crore, resolution often depended on fresh capital entering a distressed structure. We advised on how structured, acquisition and mezzanine finance could be used to make each resolution commercially viable. The new capital had to come in on terms that protected the incoming investor without stripping existing stakeholders of value.`,
      `Preparing founders for institutional capital\n\nFor founders and early-stage companies, we advise on structuring, funding rounds, investor documentation and regulatory compliance. Most founders negotiate their first institutional round only once, and the terms they accept at that stage shape control of the company for years. Our role is to make sure they understand every one of those terms before they sign.`
    ],
    selectedAnalysis: [
      {
        title: 'Who really receives the money in an IPO boom',
        text: [
          'Our founder’s column ',
          'Markets Are Falling but IPOs Are Booming. Who Is Really Getting the Money?',
          ', published in The Bar Bulletin in October 2026, examined how much of the capital raised in recent public issues went to existing shareholders selling their stakes rather than into the businesses themselves.'
        ]
      },
      {
        title: 'Majority foreign ownership of an Indian bank',
        text: [
          'His analysis ',
          'Emirates NBD and RBL Bank, Majority Foreign Ownership under Indian Banking Law',
          ', published in The Bar Bulletin in July 2026, examined the legal path for a foreign bank to take majority control of an Indian private bank under the Banking Regulation Act, 1949 and RBI’s ownership framework.'
        ]
      }
    ],
    approach: '',
    caseHandlingStrategy: '',
    handlingMethodology: [],
    strategicTactics: [],
    faqs: []
  },
  {
    id: 'financial-regulatory',
    slug: 'financial-regulatory',
    title: 'Financial & Regulatory',
    caption: 'FINANCIAL & REGULATORY',
    published: false,
    shortDescription: 'Knowing the rule before it is tested.',
    description: `Few areas of Indian law change as often as financial regulation. RBI directions decide how banks lend, classify accounts, recover dues and compensate customers for fraud. SEBI rules shape how capital is raised and managed. Foreign exchange and trade law decide how money, property and goods move across borders. A client who knows the rule that applies, in its current form, stands in a far stronger position than one who discovers it in the middle of a dispute.

Our Financial & Regulatory practice advises businesses, exporters, investors and Non-Resident Indian families on the regulatory frameworks that govern their transactions. It also acts for customers when a regulated institution has not met its obligations. That includes complaints under the Reserve Bank Integrated Ombudsman Scheme, 2021, claims arising from fraudulent transactions, and cases where recovery conduct has crossed the limits RBI sets for lenders and their agents.

Our founder writes regularly on Indian banking regulation, including RBI’s 2026 directions on customer liability in fraud, the acquisition finance framework and the rules on bank ownership. Following regulation closely as it changes is part of the advice every client receives.`,
    pullQuote: '“Compliance always costs less than correction.”',
    legalFramework: [
      'The banking side of this practice rests on the Reserve Bank of India Act, 1934, the Banking Regulation Act, 1949, the Payment and Settlement Systems Act, 2007 and the Credit Information Companies (Regulation) Act, 2005. It also rests on the directions RBI issues under them, among them the Reserve Bank Integrated Ombudsman Scheme, 2021, the Fair Practices Code and the directions on customer liability in fraudulent transactions. Securities regulation follows the Securities and Exchange Board of India Act, 1992 and the regulations made under it.',
      'Cross-border work is governed by the Foreign Exchange Management Act, 1999 and its rules on non-debt instruments, which regulate the acquisition and transfer of immovable property. Trade work is governed by the Foreign Trade (Development and Regulation) Act, 1992, the Foreign Trade Policy and the Customs Act, 1962, read with the trade agreements India has concluded, including the India Japan Comprehensive Economic Partnership Agreement. Customers of banks and financial institutions may, in addition, have remedies under the Consumer Protection Act, 2019.'
    ],
    whatWeDo: [
      'We give clients a clear position on the regulation that applies to them and the steps that follow from it. For businesses and exporters, that means compliance advice, licensing and registrations, and access to the preferential terms that trade agreements offer. For Non-Resident Indians, it means structuring the acquisition, transfer and sale of Indian property in line with foreign exchange law. For customers of banks and NBFCs, it means pursuing grievances through the bank, the RBI Ombudsman or the consumer commission, whichever is most likely to produce a result.'
    ],
    icon: 'Scale',
    image: '/images/practice/financial-regulatory.jpeg',
    services: [],
    keyMatters: [
      `Taking Bhadohi carpets to Japan\n\nBhadohi in Uttar Pradesh is India’s leading hand-knotted carpet hub, and Japan is among the most demanding import markets in the world. We advised a carpet manufacturer and exporter from Bhadohi on the entire route from loom to buyer. This covered export licensing and registrations, preferential access under the India Japan Comprehensive Economic Partnership Agreement, Japanese import and product labelling requirements, warehousing, and the contracts for distribution and sale. Preferential tariff treatment under a trade agreement is available only when the rules of origin are satisfied and documented correctly. That makes the paperwork at the Indian end as decisive as the buyer at the Japanese end. A traditional Indian craft business was given the regulatory footing to compete in one of Asia’s most premium markets.`,
      `Clean title for a Non-Resident Indian family\n\nFor a Non-Resident Indian client based in the United States, we are structuring the transfer of title to a residential apartment, a commercial space and agricultural land in and around Hyderabad. This includes the release of a co-borrower from a bank home loan, so that each asset can be sold or retained with clean title. In matters like this, foreign exchange rules, lender consent and Indian property law must all align before a single transfer can be registered. For agricultural land in particular, the restrictions foreign exchange law places on Non-Resident Indians shape every option available.`,
      `Holding lenders to the rulebook\n\nFor borrowers dealing with several banks and NBFCs at once, we escalated non-compliance with RBI’s fair practice, outsourcing and recovery rules through the regulator’s grievance framework, including the RBI Ombudsman. Regulatory escalation is no substitute for negotiation. But a documented breach of the rules often changes how a lender chooses to negotiate, and in these matters it opened the way to settlement on terms the borrowers could meet.`
    ],
    approach: '',
    caseHandlingStrategy: '',
    handlingMethodology: [],
    strategicTactics: [],
    faqs: []
  }
];
