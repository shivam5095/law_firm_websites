import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { firm } from '@/data/firm';

export const metadata: Metadata = {
  title: 'About Us | Premium Indian Law Firm',
  description: 'Learn about our philosophy, areas of practice, professional approach, and our team of legal experts.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory-50">
      <PageHero
        title="About the Firm"
        description="A premier legal practice dedicated to excellence, integrity, and achieving exceptional outcomes for our clients."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading text-3xl text-navy-900 mb-6">Firm Overview</h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">{firm.name}</p>
            <p className="font-heading text-lg italic text-navy-800 mb-6">{firm.tagline}</p>
            <div className="w-8 h-[2px] bg-gold-500 mb-6" />
            <p className="text-charcoal-700 leading-relaxed mb-6">
              Our firm is a leading Indian legal practice recognized for its depth of knowledge,
              strategic thinking, and unwavering commitment to client success. We represent a diverse
              range of clients, including domestic and international corporations, financial institutions,
              and high-net-worth individuals across complex legal matters.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              With a focus on corporate law, dispute resolution, intellectual property, and real estate,
              we combine rigorous legal analysis with commercial acumen to deliver pragmatic solutions.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl text-navy-900 mb-6">Our Philosophy</h2>
            <div className="w-8 h-[2px] bg-gold-500 mb-6" />
            <p className="text-charcoal-700 leading-relaxed mb-6">
              We believe that effective legal counsel requires more than just a mastery of the law;
              it demands a deep understanding of our clients' business objectives and industry dynamics.
              Our philosophy is rooted in proactive risk management, ethical practice, and relentless advocacy.
            </p>
            <ul className="space-y-4 text-charcoal-700">
              <li className="flex items-start">
                <span className="text-gold-500 mr-3 mt-1">✦</span>
                <span><strong>Excellence:</strong> Delivering the highest quality of legal service.</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-500 mr-3 mt-1">✦</span>
                <span><strong>Integrity:</strong> Upholding the highest ethical standards in all our dealings.</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-500 mr-3 mt-1">✦</span>
                <span><strong>Innovation:</strong> Crafting creative solutions to novel legal challenges.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}
