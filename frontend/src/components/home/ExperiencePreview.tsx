import Link from 'next/link'
import { experienceItems } from '@/data/experience'

export function ExperiencePreview() {
  const previewItems = experienceItems.slice(0, 5)

  return (
    <section className="bg-navy-900 text-white py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl mb-6 text-white">Selected Experience</h2>
            <div className="w-12 h-0.5 bg-gold-500"></div>
          </div>
          <Link 
            href="/experience"
            className="inline-flex items-center text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
          >
            View Our Experience <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="border-t border-navy-700">
          {previewItems.map((item, index) => (
            <div 
              key={item.id || index}
              className="py-8 border-b border-navy-700 md:grid md:grid-cols-4 md:gap-8 items-start hover:bg-navy-800/50 transition-colors px-4 -mx-4 rounded-sm"
            >
              <div className="mb-4 md:mb-0 col-span-1">
                <span className="text-xs font-semibold tracking-wider text-gold-500 uppercase">
                  {item.category}
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-ivory-200 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
