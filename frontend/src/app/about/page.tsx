import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import Link from 'next/link';
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

      <section className="py-20 bg-white border-y border-charcoal-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 mb-4">Areas of Practice</h2>
            <div className="w-12 h-1 bg-gold-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Corporate Law', 'Dispute Resolution', 'Intellectual Property', 'Real Estate', 'Tax Law', 'Employment Law'].map((area, idx) => (
              <div key={idx} className="p-8 border border-charcoal-100 hover:border-gold-300 transition-colors group">
                <h3 className="font-heading text-xl text-navy-800 mb-3 group-hover:text-gold-600 transition-colors">{area}</h3>
                <p className="text-sm text-charcoal-600 mb-6">Comprehensive legal services covering all aspects of {area.toLowerCase()} to protect and advance our clients' interests.</p>
                <Link href="/practice-areas" className="text-sm font-medium text-navy-600 uppercase tracking-wider group-hover:text-gold-600 transition-colors flex items-center">
                  Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 mb-6">Our Team</h2>
            <div className="w-8 h-[2px] bg-gold-500 mb-6" />
            <p className="text-charcoal-700 leading-relaxed mb-8">
              Led by distinguished practitioners, our team brings together decades of experience across 
              diverse sectors. Our lawyers are recognized for their academic brilliance, courtroom tenacity, 
              and boardroom savvy.
            </p>
            <div className="bg-ivory-100 p-6 border-l-4 border-gold-500">
              <h3 className="font-heading text-xl text-navy-900 mb-2">Anand Kumar Maurya</h3>
              <p className="text-sm text-charcoal-600 mb-4">Managing Partner & Principal Founder</p>
              <Link href="/team/anand-kumar-maurya" className="text-navy-600 font-medium hover:text-gold-600 transition-colors">
                View Profile &rarr;
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="p-6 bg-white shadow-sm border border-charcoal-100">
                <h4 className="font-heading text-lg text-navy-800 mb-3">Academic & Institutional Engagement</h4>
                <p className="text-sm text-charcoal-600">Our members serve as arbitrators, guest lecturers, and legal experts at premier institutions.</p>
             </div>
             <div className="p-6 bg-white shadow-sm border border-charcoal-100">
                <h4 className="font-heading text-lg text-navy-800 mb-3">Publications</h4>
                <p className="text-sm text-charcoal-600 mb-4">Contributing to legal scholarship through extensively researched articles and journals.</p>
                <Link href="/publications" className="text-xs font-medium text-navy-600 uppercase tracking-wider hover:text-gold-600">
                  Read Publications &rarr;
                </Link>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
