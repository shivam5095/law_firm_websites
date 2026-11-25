export type Insight = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string[];
  author: string;
  source: string;
  date: string;
  category?: string;
};

export const insights: Insight[] = [
  {
    id: 'taj-nadesar-us-delegation-2026',
    slug: 'an-evening-with-a-us-delegation-at-taj-nadesar-palace-varanasi',
    title: 'An Evening with a US Delegation at Taj Nadesar Palace, Varanasi',
    summary: 'Our founder joined a visiting delegation from the United States for an evening of conversation at Taj Nadesar Palace, Varanasi.',
    body: [
      'In October 2026, Anand Kumar Maurya, Founder and Principal Advocate of Maurya & Co., spent an evening with a visiting delegation from the United States at Taj Nadesar Palace in Varanasi.',
      'The conversation turned to India as a place to invest and do business, and to the practical questions that decide whether a deal here succeeds. These included the ease of doing business, how commercial deals are structured and documented, and how disputes between Indian and foreign parties are resolved through arbitration and the courts. The discussion also covered the tax considerations that shape cross-border investment and the government regulation that governs foreign capital, banking and trade. Exchanges like these show what a foreign party is really asking when it looks at India, and that understanding feeds directly into the firm\'s cross-border work.',
      'For a practice that acts for clients in India and in the United States, these conversations are part of the work. They are also a reminder of what Varanasi has always been, a city where people from far away come to talk and to listen.',
    ],
    author: 'Anand Kumar Maurya',
    source: 'Maurya & Co.',
    date: 'October 2026',
  },
];
