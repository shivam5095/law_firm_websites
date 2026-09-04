import Image from 'next/image'
import Link from 'next/link'
import { lawyers } from '@/data/lawyers'

export function TeamPreview() {
  const lawyer = lawyers.find(l => l.name.includes("Anand")) || lawyers[0]
  
  if (!lawyer) return null

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-navy-900 mb-6">Our Team</h2>
          <div className="w-12 h-0.5 bg-gold-500"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-20 items-center">
          <div className="col-span-1 md:col-span-2 relative aspect-[3/4] w-full max-w-md mx-auto md:max-w-none">
            <Image
              src={lawyer.image || "/images/team/placeholder.jpg"}
              alt={lawyer.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          
          <div className="col-span-1 md:col-span-3">
            <h3 className="font-heading text-3xl text-navy-900 mb-2">{lawyer.name}</h3>
            <p className="text-gold-600 font-medium tracking-wide uppercase text-sm mb-6">
              {lawyer.designation}
            </p>
            <div className="prose prose-slate text-charcoal-600 mb-8 max-w-none">
              <p>{lawyer.shortBio}</p>
            </div>
            
            <Link 
              href={`/team/${lawyer.slug || 'anand-kumar-maurya'}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-colors duration-300"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
